import { createContext, useState, useEffect } from "react";
import app from "../Firebase/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";





export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  

  const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const API_URL = import.meta.env.VITE_Api_link;

  // Check if user exists in backend
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`${API_URL}/users/${email}`);
      if (response.status === 404) return false;
      if (!response.ok) throw new Error('Failed to check user existence');
      return true;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };

  // Create user with email/password
  const createUser = async (email, password, name) => {
    setLoading(true);
    try {
      // 1. First check if user exists in backend
      const userExists = await checkUserExists(email);
      if (userExists) {
        throw new Error('User already exists');
      }

      // 2. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 3. Update Firebase profile with display name
      await updateProfile(auth.currentUser, { displayName: name });

      // 4. Prepare user data for backend
      const userData = {
        email,
        name,
        firebaseUID: userCredential.user.uid,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // 5. Send user data to backend
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user in database');
      }

      // 6. Get the complete user data from backend
      const createdUser = await response.json();
      setUser({ ...userCredential.user, ...createdUser });
      return createdUser;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // 2. Get additional user data from backend
      const response = await fetch(`${API_URL}/users/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const googleSignIn = async () => {
    setLoading(true);
    try {
      // 1. Authenticate with Google
      const result = await signInWithPopup(auth, googleProvider);
      const { email, displayName, uid } = result.user;

      // 2. Check if user exists in backend
      const userExists = await checkUserExists(email);
      
      if (!userExists) {
        // 3. Create new user in backend if doesn't exist
        const userData = {
          email,
          name: displayName,
          firebaseUID: uid,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Failed to create user in database');
        }
      }

      // 4. Get complete user data (new or existing)
      const userResponse = await fetch(`${API_URL}/users/${email}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();
      setUser({ ...result.user, ...userData });
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await fetch(`${API_URL}/users/${currentUser.email}`);
          if (response.ok) {
            const userData = await response.json();
            setUser({ ...currentUser, ...userData });
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, API_URL]);

  const authInfo = {
    user,
    isAuthenticated: !!user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;