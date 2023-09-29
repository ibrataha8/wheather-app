import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./src/Screens/Home";
import { NativeBaseProvider } from "native-base"

export default function App() {
  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
});
