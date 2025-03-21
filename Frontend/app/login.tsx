import { View, Text, TextInput, Button } from "react-native";
import { router, useFocusEffect, useNavigation } from "expo-router";
import tw from "twrnc";
import { useState, useCallback } from "react";
import AuthService from "@/service/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();
  navigation.setOptions({ title: 'Login' })

  useFocusEffect(
    useCallback(() => {
      const checkUserLoggedIn = async () => {
        const isLoggedIn = await AuthService.isUserLoggedIn();
        if (isLoggedIn) {
          router.navigate("/userHome");
        }
      };
      checkUserLoggedIn();
    }, [])
  );
  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      console.log("Success", "User logged in successfully");
      router.navigate("/userHome");
    } catch (error) {
      setErrorMessage("Login failed: " + error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md`}>
        <Text style={tw`text-2xl font-bold mb-4 text-center`}>Login</Text>
        {errorMessage ? (
          <Text style={tw`text-red-500 mb-4 text-center`}>{errorMessage}</Text>
        ) : null}
        <TextInput
          style={tw`border border-gray-300 rounded p-2 mb-4 w-full`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={tw`border border-gray-300 rounded p-2 mb-4 w-full`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#20FF20" />
        <View style={tw`mt-4`}>
          <Button
            title="Sign Up"
            onPress={() => router.navigate("/register")}
            color="#FF0000"
          />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
