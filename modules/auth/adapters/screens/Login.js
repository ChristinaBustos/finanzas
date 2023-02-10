import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Input, Button, Image, Icon } from "@rneui/base";
import { isEmpty } from "lodash";

import Loading from "../../../../kernel/components/Loading";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

export default function Login(props) {
  const {navigation} = props;
  const [error, setError] = useState({email:'',password:''});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [show, setShow] = useState(false);
  // const [failSession, setFailSession] = useState(false);
  const auth = getAuth();
  const login = () => {
    console.log(email);
    if (!(isEmpty(email) || isEmpty(password))){
        signInWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
          setError({email:'',password:''});
          setShow(true);
          // Signed in
          const user = userCredential.user;
          setShow(false);
          navigation.navigate("userGuestStack");
          console.log(user);
          // ...
        })
        .catch((error) => {
          setError({email:'',password:'Usuario o contraseña incorrectos'});
            setShow(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      setError({email:'Campo obligatorio',password:'Campo obligatorio'});
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../../../assets/img/presupuesto.png")}
          resizeMode="contain"
          style={styles.logotype}
        />
        <Input
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          errorMessage={error.email}
          autoCapitalize="none"
        />
        <Input
          placeholder="Contraseña"
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          secureTextEntry={showPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              color="#007bff"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          errorMessage={error.password}
        />
        <Button
          title="Iniciar sesión"
          icon={
            <Icon
              type="material-community"
              name="login"
              size={22}
              color="#fff"
            />
          }
          buttonStyle={styles.btnSuccess}
          containerStyle={styles.btnContainer}
          onPress={login}
        />

        <Text style={styles.createAccount} onPress={() => console.log("Vamos")}>
          ¡Registrate!
        </Text>
        <Loading show={show} text="Iniciando sesión" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#fff",
    height: "100%",
  },
  logotype: {
    width: "100%",
    height: 150,
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  btnSuccess: {
    color: "#fff",
    backgroundColor: "#28a745",
  },
  btnContainer: {
    margin: 16,
  },
  createAccount: {
    color: "#007bff",
  },
});
