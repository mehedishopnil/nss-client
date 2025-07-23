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
import { all } from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const API_URL = import.meta.env.VITE_Api_link;

  console.log(user);


  // 🔄 Fetch all users (admin only)
 const fetchAllUsers = async (email) => {
  if (!email) {
    throw new Error("Authentication required");
  }

  setLoading(true);
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`);

    if (response.status === 403) {
      throw new Error("Admin privileges required");
    }
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    setAllUsers(users);
    return users;
  } catch (error) {
    console.error("FetchAllUsers error:", error);
    setAllUsers([]);
    throw error;
  } finally {
    setLoading(false);
  }
};


  // 🔄 Refresh users list (wrapper for fetchAllUsers)
const refreshUsers = async () => {
  if (role === "admin" && user?.email) {
    await fetchAllUsers(user.email);
  }
};


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

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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

  // Update auth state listener to refresh users when admin logs in
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const response = await fetch(`${API_URL}/users/${currentUser.email}`);
        const userData = response.ok ? await response.json() : null;
        const fetchedRole = await fetchUserRole(currentUser.email);

        setUser(userData ? { ...currentUser, ...userData } : currentUser);
        setRole(fetchedRole);

        if (fetchedRole === "admin") {
          await fetchAllUsers(currentUser.email); // ✅ pass email explicitly
        }
      } catch (error) {
        console.error("Auth state error:", error);
        setUser(currentUser);
        setRole("user");
      }
    } else {
      setUser(null);
      setRole(null);
      setAllUsers([]);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, [auth, API_URL]);


  // 🌍 Exporting all authentication context
  const authInfo = {
    user,
    role,
    allUsers,
    loading,
    isAuthenticated: !!user,
    isAdmin: role === "admin",
    createUser,
    signIn,
    googleSignIn,
    logOut,
    fetchAllUsers,
    refreshUsers,
  };


  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
