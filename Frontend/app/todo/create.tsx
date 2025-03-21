import { createTodo } from "@/api/todo/todoApi";
import { useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Switch,
} from "react-native";
import tw from "twrnc";

const CreateTodo = () => {
  const params = useLocalSearchParams();
  const { projectId } = params;
  const [title, setTitle] = useState("");
  const [is_completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();
  navigation.setOptions({ title: 'Create Todo' })

  const handleSubmit = async () => {
    try {
      await createTodo({
        title,
        description,
        project_id: Number(projectId),
        is_completed,
      });

      router.navigate("/userHome");
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-1 justify-center items-center bg-gray-100 p-4`}
    >
      <View style={tw`bg-white p-6 rounded-lg shadow-md w-11/12 max-w-md`}>
        <Text style={tw`text-2xl font-bold mb-4 text-center`}>Create Todo</Text>
        {error && (
          <Text style={tw`text-red-500 mb-4 text-center`}>{error}</Text>
        )}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg mb-2`}>Title</Text>
          <TextInput
            style={tw`border border-gray-300 rounded p-2 w-full`}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter todo title"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg mb-2`}>Description</Text>
          <TextInput
            style={tw`border border-gray-300 rounded p-2 w-full`}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter todo description"
            multiline
          />
        </View>
        <View style={tw`mb-4 flex-row items-center`}>
          <Switch value={is_completed} onValueChange={setCompleted} />
          <Text style={tw`ml-2 text-lg`}>Completed</Text>
        </View>
        <Button title="Create Todo" onPress={handleSubmit} color="#3192ec" />
      </View>
    </ScrollView>
  );
};

export default CreateTodo;
