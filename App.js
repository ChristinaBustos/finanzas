import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { initializeApp } from "firebase/app";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyC7eejQzqpyz4XmbuiFp_9brV90h56p-cI",
    authDomain: "finanzas-7a5b1.firebaseapp.com",
    projectId: "finanzas-7a5b1",
    storageBucket: "finanzas-7a5b1.appspot.com",
    messagingSenderId: "537976435132",
    appId: "1:537976435132:web:ccb6fbe485f6bca98a7bb9"
  };
  const app = initializeApp(firebaseConfig);
  return (
    <View style={styles.container}>
      <Text>Hola Anna Christina!</Text>
      <Button title="Solid" />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
