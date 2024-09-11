import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null); // Define user state

  const authInfo = {
    user,
    setUser, // Add setUser to update the user state if needed
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
