import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link, router } from "expo-router";
import { useState } from "react";
import axios from "axios";

import airbnb from "../../assets/images/airbnb-logo.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  // console.log(content);

  const styles = useStyle();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email === "" || password === "") {
        setErrorMessage("Please fill all fields");
        return;
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        setIsLoading(false);
        login(response.data.id, response.data.token);
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Wrong email and/or password");
        setIsLoading(false);
      }
      console.log("catch");

      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPage}>
        <Image source={airbnb} style={styles.airbnbLogo} />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <KeyboardAwareScrollView style={styles.form}>
        <TextInput
          style={styles.inputText}
          keyboardType="email-address"
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </KeyboardAwareScrollView>
      <View style={styles.bottomPage}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
        <Link href={"/signup"} style={styles.registerText}>
          No account? Register
        </Link>
      </View>
    </View>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 20,
    },
    topPage: {
      marginVertical: 50,
      alignItems: "center",
    },
    airbnbLogo: {
      width: 100,
      height: 100,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 30,
      color: "#717171",
    },
    form: {
      width: width,
      paddingHorizontal: 40,
    },
    inputText: {
      borderBottomColor: "#FFBAC0",
      borderBottomWidth: 2,
      marginBottom: 20,
      height: 40,
    },
    bottomPage: {
      alignItems: "center",
      justifyContent: "center",
    },
    errorMessage: {
      color: "#F96468",
      marginBottom: 10,
    },
    button: {
      height: 50,
      width: width / 2,
      borderColor: "#F9575C",
      borderWidth: 3,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: "#717171",
    },
    registerText: {
      color: "#717171",
    },
  });
  return styles;
};
