import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import {
  getProjectTodos,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "@/api/todo/todoApi";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

interface TodoListProps {
  projectId: number;
}

const TodoList: React.FC<TodoListProps> = ({ projectId }) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("none");
  const [filteredTodos, setFilteredTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getProjectTodos(projectId);
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [projectId]);

  useEffect(() => {
    const filterTodos = () => {
      const filtered = todos.filter((todo) => {
        const matchesTitle = todo.title
          .toLowerCase()
          .includes(filter.toLowerCase());
        if (filterStatus === "completed") {
          return matchesTitle && todo.is_completed;
        } else if (filterStatus === "uncompleted") {
          return matchesTitle && !todo.is_completed;
        }
        return matchesTitle;
      });
      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [todos, filter, filterStatus]);

  const handleUpdate = async (
    id: number,
    title: string,
    description: string,
    is_completed: boolean
  ) => {
    try {
      const updatedTodo = await updateTodo(id, {
        title,
        description,
        is_completed,
      });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const completedTodo = await completeTodo(id);
      setTodos(todos.map((todo) => (todo.id === id ? completedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <View style={tw`p-2`}>
        <Button
          title="Add Todo"
          onPress={() =>
            router.push({ pathname: "/todo/create", params: { projectId } })
          }
        />
      </View>
      <TextInput
        style={tw`border p-2 mb-2`}
        placeholder="Filter by title"
        value={filter}
        onChangeText={setFilter}
      />
      <Picker
        selectedValue={filterStatus}
        onValueChange={(itemValue: React.SetStateAction<string>) =>
          setFilterStatus(itemValue)
        }
        style={tw`border p-2 mb-2`}
      >
        <Picker.Item label="None" value="none" />
        <Picker.Item label="Completed" value="completed" />
        <Picker.Item label="Uncompleted" value="uncompleted" />
      </Picker>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              tw`mb-4 p-4 border rounded`,
              item.is_completed && tw`bg-green-200`,
            ]}
          >
            <TextInput
              style={tw`border p-2 mb-2`}
              defaultValue={item.title}
              editable={true}
              onBlur={(e) =>
                handleUpdate(
                  item.id,
                  e.nativeEvent.text,
                  item.description ?? "",
                  item.is_completed
                )
              }
            />
            <TextInput
              style={tw`border p-2 mb-2`}
              defaultValue={item.description}
              onBlur={(e) =>
                handleUpdate(
                  item.id,
                  item.title,
                  e.nativeEvent.text,
                  item.is_completed
                )
              }
            />
            <View style={tw`flex-row justify-between`}>
              {!item.is_completed ? (
                <Button
                  title="Complete"
                  onPress={() => handleComplete(item.id)}
                />
              ) : (
                <Button
                  title="Uncomplete"
                  onPress={() =>
                    handleUpdate(
                      item.id,
                      item.title,
                      item.description ?? "",
                      false
                    )
                  }
                />
              )}
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
