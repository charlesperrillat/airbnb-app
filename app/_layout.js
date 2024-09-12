import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { NavigationWrapper } from "../assets/components/NavigationWrapper";

export default RootLayout = () => {
  return (
    <AuthProvider>
      <NavigationWrapper>
        <Slot />
      </NavigationWrapper>
    </AuthProvider>
  );
};
