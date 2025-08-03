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
  const [role, setRole] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [allUsersMessages, setAllUsersMessages] = useState([]);

  // guard-related states (admin only)
  const [allGuards, setAllGuards] = useState(null);

  console.log(allGuards);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const API_URL = import.meta.env.VITE_Api_link;

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

  // 🔄 Fetch role: admin if isAdmin is true, otherwise user
  const fetchUserRole = async (email) => {
    if (!email) return "user";

    try {
      const response = await fetch(`${API_URL}/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user");

      const userData = await response.json();

      const roleData = userData?.isAdmin ? "admin" : "user";
      setRole(roleData); // update the state
      return roleData; // return the role as well
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole("user");
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

      setUser({ ...userCredential.user, ...createdUser });

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

      setUser({ ...userCredential.user, ...userData });

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

  // Fetch users message where email required:
  const fetchUserMessages = async (email) => {
    if (!email) {
      throw new Error("Authentication required");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users-messages/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user messages");
      }

      const resData = await response.json();
      setUserMessages(resData.data || []); // ensure .data is used
      return resData.data;
    } catch (error) {
      console.error("FetchUserMessages error:", error);
      setUserMessages([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  //  Fetch all users messages (admin only):
  const fetchAllUsersMessages = async (email) => {
    if (!email) {
      throw new Error("Admin email is required");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/all-users-messages?email=${email}`
      );

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Failed to fetch all user messages");
      }

      setAllUsersMessages(resData.data || []);
      return resData.data;
    } catch (error) {
      console.error("FetchAllUsersMessages error:", error.message);
      setAllUsersMessages([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update a user's message (status and/or isRead) — admin only
  const updateUserMessage = async (messageId, updates = {}) => {
    if (!user?.email || role !== "admin") {
      throw new Error("Admin privileges required to update message");
    }

    const payload = {
      email: user.email,
      ...updates, // expected: { status: 'responded', isRead: true }
    };

    try {
      const response = await fetch(`${API_URL}/users-messages/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update message");
      }

      const data = await response.json();

      // Optionally update state locally
      setAllUsersMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? data.data : msg))
      );

      return data.data;
    } catch (error) {
      console.error("UpdateUserMessage error:", error);
      throw error;
    }
  };

  //Guards related operation should be here::

  //  Fetch all users messages (admin only):
  const fetchAllGuards = async (adminEmail) => {
    if (!adminEmail) {
      throw new Error("Admin email is required");
    }

    setLoading(true);
    try {
      const url = new URL(`${API_URL}/guards`);
      url.searchParams.set("email", adminEmail);

      const response = await fetch(url.toString());
      const resData = await response.json();

      if (!response.ok) {
        // Prefer the server message if available
        const msg =
          resData?.message ||
          `Failed to fetch guards (status ${response.status})`;
        throw new Error(msg);
      }

      if (!resData.success || !Array.isArray(resData.data)) {
        throw new Error(resData.message || "Unexpected response format");
      }

      setAllGuards(resData.data);
      return resData.data;
    } catch (error) {
      console.error("fetchAllGuards error:", error.message);
      // Optionally clear: setAllGuards([]);
      // Otherwise leave previous value untouched
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🛡️ Create a new guard (admin only)
  const createGuard = async (guardData) => {
    if (!user?.email || role !== "admin") {
      throw new Error("Admin privileges required");
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/guards?email=${user.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(guardData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create guard");
      }

      const result = await response.json();
      await fetchAllGuards(user.email); // Refresh guards list
      return result.data;
    } catch (error) {
      console.error("CreateGuard error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 💰 Add guard transaction (admin only)
  const addGuardTransaction = async (guardId, transactionData) => {
    if (!user?.email || role !== "admin") {
      throw new Error("Admin privileges required");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/guards/${guardId}/transactions?email=${user.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add transaction");
      }

      const result = await response.json();
      await fetchAllGuards(user.email); // Refresh guards list
      return result.data;
    } catch (error) {
      console.error("AddGuardTransaction error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 📅 Record guard presence (admin only)
  const recordGuardPresence = async (guardId, presenceData) => {
    if (!user?.email || role !== "admin") {
      throw new Error("Admin privileges required");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/guards/${guardId}/presence?email=${user.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(presenceData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to record presence");
      }

      const result = await response.json();
      await fetchAllGuards(user.email); // Refresh guards list
      return result.data;
    } catch (error) {
      console.error("RecordGuardPresence error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Update guard info (admin only)
  const updateGuardInfo = async (guardId, updateData) => {
    if (!user?.email || role !== "admin") {
      throw new Error("Admin privileges required");
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/guards/${guardId}?email=${user.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update guard");
      }

      const result = await response.json();
      await fetchAllGuards(user.email); // Refresh guards list
      return result.data;
    } catch (error) {
      console.error("UpdateGuardInfo error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  

  // Update auth state listener to refresh admin-related data
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
            await fetchAllUsers(currentUser.email);
            await fetchAllUsersMessages(currentUser.email);
            await fetchAllGuards(currentUser.email);
          } else {
            await fetchUserMessages(currentUser.email);
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
    createUser,
    signIn,
    googleSignIn,
    logOut,
    fetchAllUsers,
    refreshUsers,
    userMessages,
    allUsersMessages,
    updateUserMessage,

    // guard-related exports
    // guard-related exports
    allGuards,
    fetchAllGuards,
    createGuard,
    addGuardTransaction,
    recordGuardPresence,
    updateGuardInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
