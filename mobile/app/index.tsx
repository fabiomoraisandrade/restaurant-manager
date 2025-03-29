import { Text, View, StatusBar } from "react-native";
import Routes from "@/src/routes";
import { AuthProvider } from "../src/contexts/AuthContext"

export default function Index() {
  return (
    <>
      <AuthProvider>
        <StatusBar
          backgroundColor="#1d1d2e"
          barStyle="light-content"
          translucent={false}
        />
        <Routes/>
      </AuthProvider>
    </>
  );
}
