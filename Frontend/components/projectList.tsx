import { getProjects, deleteProject } from "@/api/project/projectApi";
import { Project } from "@/api/project/projectModel";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import tw from "twrnc";
import { router } from "expo-router";

const ProjectList: React.FC<{
  lastSelected: number | null;
  onSelect: (id: number) => void;
}> = ({ lastSelected, onSelect }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    lastSelected
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
        if(lastSelected) {
          setSelectedProjectId(lastSelected);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSelect = (id: number) => {
    setSelectedProjectId(id);
    onSelect(id);
  };

  const handleCreateProject = () => {
    router.navigate("/project/create");
  };

  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={tw`p-2`}>
      <Text style={tw`text-lg font-bold mb-2`}>Select a Project</Text>
      <FlatList
        horizontal
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => {
          return <View style={tw`bg-gray-200 w-1 mr-2 H-full`} />;
        }}
        renderItem={({ item }) => (
          <View style={tw`mr-4 border-2 p-2 rounded-md border-zinc-400`}>
            <TouchableOpacity
              style={[
                tw`p-2 rounded mb-4`,
                selectedProjectId === item.id
                  ? tw`bg-blue-500`
                  : tw`bg-gray-200`,
              ]}
              onPress={() => handleSelect(item.id)}
            >
              <Text style={tw`text-lg`}>{item.title}</Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              onPress={() => handleDeleteProject(item.id)}
              color="red"
            />
          </View>
        )}
      />
      <View style={tw`mt-4`}>
        <Button title="Create Project" onPress={handleCreateProject} />
      </View>
    </View>
  );
};

export default ProjectList;
