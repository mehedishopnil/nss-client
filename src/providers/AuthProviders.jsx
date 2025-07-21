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
  const [role, setRole] = useState(null); // ✅ MODIFIED

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const API_URL = import.meta.env.VITE_Api_link;

  console.log(user)

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`${API_URL}/users/${email}`);
      if (response.status === 404) return false;
      if (!response.ok) throw new Error("Failed to check user existence");
      return true;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };

  const fetchUserRole = async (email) => {
    try {
      const response = await fetch(`${API_URL}/users/role-check/${email}`);
      if (!response.ok) throw new Error("Failed to fetch role");
      const data = await response.json();
      return data.role || "user";
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "user"; // fallback
    }
  };

  const createUser = async (email, password, name) => {
    setLoading(true);
    try {
      const userExists = await checkUserExists(email);
      if (userExists) throw new Error("User already exists");

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });

      const userData = {
        email,
        name,
        firebaseUID: userCredential.user.uid,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to create user in database");

      const createdUser = await response.json();
      const fetchedRole = await fetchUserRole(email); // ✅ MODIFIED
      setUser({ ...userCredential.user, ...createdUser });
      setRole(fetchedRole); // ✅ MODIFIED
      return createdUser;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await fetch(`${API_URL}/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      const userData = await response.json();
      const fetchedRole = await fetchUserRole(email); // ✅ MODIFIED
      setUser({ ...userCredential.user, ...userData });
      setRole(fetchedRole); // ✅ MODIFIED
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { email, displayName, uid } = result.user;

      const userExists = await checkUserExists(email);

      if (!userExists) {
        const userData = {
          email,
          name: displayName,
          firebaseUID: uid,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Failed to create user in database");
      }

      const userResponse = await fetch(`${API_URL}/users/${email}`);
      if (!userResponse.ok) throw new Error("Failed to fetch user data");

      const userData = await userResponse.json();
      const fetchedRole = await fetchUserRole(email); // ✅ MODIFIED
      setUser({ ...result.user, ...userData });
      setRole(fetchedRole); // ✅ MODIFIED
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    setRole(null); // ✅ MODIFIED
    return signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await fetch(`${API_URL}/users/${currentUser.email}`);
          const userData = response.ok ? await response.json() : null;
          const fetchedRole = await fetchUserRole(currentUser.email); // ✅ MODIFIED
          setUser(userData ? { ...currentUser, ...userData } : currentUser);
          setRole(fetchedRole); // ✅ MODIFIED
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(currentUser);
          setRole("user"); // fallback
        }
      } else {
        setUser(null);
        setRole(null); // ✅ MODIFIED
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, API_URL]);

  const authInfo = {
    user,
    role, // ✅ MODIFIED
    isAuthenticated: !!user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
