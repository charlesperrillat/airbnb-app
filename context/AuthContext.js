import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);
  const [userToken, setUserToken] = useState(null);

  console.log("auth cont");

  const login = (id, token) => {
    setUserID(id);
    setUserToken(token);
  };

  const logout = (id, token) => {
    setUserID(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userID: userID,
        userToken: userToken,
        login: login,
        setUserToken: setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
