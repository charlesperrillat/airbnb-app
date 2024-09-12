import { useContext, useEffect } from "react";
import { router } from "expo-router";

import { AuthContext } from "../../context/AuthContext";

export const NavigationWrapper = ({ children }) => {
  const { userID, userToken } = useContext(AuthContext);
  console.log("nv wrapper");
  console.log(userID, userToken);
  useEffect(() => {
    if (userID && userToken) {
      router.navigate("/home");
    } else {
      router.navigate("/");
    }
  }, [userID, userToken]);

  return children;
};
