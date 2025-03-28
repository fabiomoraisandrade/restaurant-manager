import { Text, View, StatusBar } from "react-native";
import Routes from "@/src/routes";

export default function Index() {
  return (
    <>
      <StatusBar
        backgroundColor="#1d1d2e"
        barStyle="light-content"
        translucent={false}
      />
      <Routes/>
    </>
  );
}
