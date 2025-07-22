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

// Creating context to provide authentication globally
export const AuthContext = createContext();

// AuthProvider component to wrap around app
const AuthProvider = ({ children }) => {
  // States
  const [user, setUser] = useState(null);             // Firebase + DB user
  const [loading, setLoading] = useState(true);       // Loading state
  const [role, setRole] = useState(null);             // Role: "admin" or "user"
  const [allUsers, setAllUsers] = useState(null);     // All users (admin only)

  console.log(allUsers)
  console.log(role)

  // Firebase Auth & Google provider
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Backend API base URL from environment
  const API_URL = import.meta.env.VITE_Api_link;

  // 🔍 Check if a user exists in DB by email
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

  // 🔄 Fetch role based on email, fallback to "user"
  const fetchUserRole = async (email) => {
    try {
      const response = await fetch(`${API_URL}/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const userData = await response.json();
      if (userData?.role) return userData.role;
      return userData?.isAdmin ? "admin" : "user";
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "user";
    }
  };

  // 🧾 Create User (Signup)
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
      const fetchedRole = await fetchUserRole(email);

      setUser({ ...userCredential.user, ...createdUser });
      setRole(fetchedRole);
      return createdUser;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Email/Password Sign In
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const response = await fetch(`${API_URL}/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      const userData = await response.json();
      const fetchedRole = await fetchUserRole(email);

      setUser({ ...userCredential.user, ...userData });
      setRole(fetchedRole);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Google Sign In
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
      const fetchedRole = await fetchUserRole(email);

      setUser({ ...result.user, ...userData });
      setRole(fetchedRole);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Logout
  const logOut = () => {
    setLoading(true);
    setRole(null);
    return signOut(auth).finally(() => setLoading(false));
  };

 // 📥 Fetch all users — accessible only by admin users
const fetchAllUsers = async () => {
  setLoading(true);
  try {
    // ✅ Ensure user is logged in
    if (!user?.email) throw new Error("No authenticated user");

    // ✅ Step 1: Verify if the current user is an admin
    const adminCheckRes = await fetch(`${API_URL}/users?email=${user.email}`);
    if (!adminCheckRes.ok) throw new Error("Failed to verify admin status");

    const adminCheckData = await adminCheckRes.json();

    // ✅ Step 2: If user is not admin, throw error
    if (!adminCheckData?.isAdmin) throw new Error("Unauthorized: Admin access required");

    // ✅ Step 3: Fetch all users (admin authorized)
    // The backend is designed to return all users if the requester is admin and passes their email
    const usersResponse = await fetch(`${API_URL}/users?email=${user.email}`);
    if (!usersResponse.ok) throw new Error("Failed to fetch user list");

    const allUsersData = await usersResponse.json();

    // ✅ Step 4: Update state and return
    setAllUsers(allUsersData);
    return allUsersData;
  } catch (error) {
    console.error("❌ Error fetching all users:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};


  // 🧠 Auth state change listener (auto-login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await fetch(`${API_URL}/users/${currentUser.email}`);
          const userData = response.ok ? await response.json() : null;
          const fetchedRole = await fetchUserRole(currentUser.email);
          setUser(userData ? { ...currentUser, ...userData } : currentUser);
          setRole(fetchedRole);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(currentUser);
          setRole("user");
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, API_URL]);

  // 🌍 Exporting all authentication context
  const authInfo = {
    user,
    
    role,
    isAuthenticated: !!user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    fetchAllUsers,  // ✅ Make sure this is exposed
    allUsers,       // ✅ Exposing stored allUsers for components
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
