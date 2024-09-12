import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TextInput,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link, router } from "expo-router";
import { useState } from "react";
import axios from "axios";

import airbnb from "../../assets/images/airbnb-logo.png";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = useStyle();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (email === "" || password === "") {
        setErrorMessage("Please fill all fields");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords must be the same");
        return;
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      if (response.data.token) {
        setIsLoading(false);
        alert("Registration successfull");
        router.push("/home");
      }
    } catch (error) {
      //   console.log(Object.keys(error));
      //   console.log(error.response.data);
      if (error.response.data.error === "This email already has an account.") {
        setErrorMessage("This email already has an account.");
        setIsLoading(false);
      }
      if (
        error.response.data.error === "This username already has an account."
      ) {
        setErrorMessage("This username already has an account.");
        setIsLoading(false);
      }
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPage}>
        <Image source={airbnb} style={styles.airbnbLogo} />
        <Text style={styles.title}>Sign up</Text>
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
          placeholder="username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          style={styles.inputText}
          multiline
          numberOfLines={10}
          placeholder="Describe yourself in a few wods.."
          value={description}
          onChangeText={(text) => {
            setDescription(text);
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
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
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
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
        <Link href={"/"} style={styles.registerText}>
          Already have an account? Sign in
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
