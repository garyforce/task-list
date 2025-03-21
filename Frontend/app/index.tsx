import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import tw from "twrnc";

export default function Index() {
  const navigation = useNavigation();
  navigation.setOptions({ title: "" });
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-xl font-bold`}>TodoPath</Text>

      <View
        style={tw`my-8 h-px w-11/12 max-w-md`}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text style={tw`text-center text-base mx-4 my-4 bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md`}>
        This project is a Todo App built with Ruby on Rails for the backend and
        React Native for the frontend. It allows users to create, read, update,
        and delete tasks. Tasks are organized into projects, enabling users to
        manage their tasks more efficiently by grouping related tasks together.
      </Text>

      <TouchableOpacity onPress={() => router.navigate("/login")}>
        <Text style={tw`text-blue-500`}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
