import { ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useState, useEffect } from "react";
import ProjectList from "@/components/projectList";
import TodoList from "@/components/todoList";
import { useNavigation } from "expo-router";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserHome() {
  const navigation = useNavigation();
  navigation.setOptions({ title: "TodoPath Home" });

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    const loadSelectedProjectId = async () => {
      try {
        const storedProjectId = await AsyncStorage.getItem("selectedProjectId");
        if (storedProjectId !== null) {
          setSelectedProjectId(Number(storedProjectId));
        }
      } catch (error) {
        console.error("Failed to load selected project ID:", error);
      }
    };

    loadSelectedProjectId();
  }, []);

  const handleSelectProject = async (projectId: number) => {
    setSelectedProjectId(projectId);
    try {
      await AsyncStorage.setItem("selectedProjectId", projectId.toString());
    } catch (error) {
      console.error("Failed to save selected project ID:", error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <ScrollView style={tw`p-4`}>
        <ProjectList lastSelected={selectedProjectId} onSelect={handleSelectProject} />
        <View style={tw`w-full h-0.5 bg-gray-300`} />
        {selectedProjectId && <TodoList projectId={selectedProjectId} />}
      </ScrollView>
    </View>
  );
}
