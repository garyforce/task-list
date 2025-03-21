import backendAPI from "../api";
import { AxiosResponse } from "axios";

interface Filters {
    [key: string]: any;
}

export const getTodos = async (filters?: Filters): Promise<TodoModel[]> => {
    const response: AxiosResponse<TodoModel[]> = await backendAPI.get("/todo", { params: { filters } });
    return response.data;
};

export const getProjectTodos = async (projectId: number, filters?: Filters): Promise<TodoModel[]> => {
    const response: AxiosResponse<TodoModel[]> = await backendAPI.get(`/project/${projectId}/todos`, { params: { filters } });
    return response.data;
};

export const getTodo = async (id: number): Promise<TodoModel> => {
    const response: AxiosResponse<TodoModel> = await backendAPI.get(`/todo/${id}`);
    return response.data;
};

export const createTodo = async (todo: CreateTodoParams): Promise<TodoModel> => {
    const response: AxiosResponse<TodoModel> = await backendAPI.post("/todo", todo);
    return response.data;
};

export const updateTodo = async (id: number, todo: UpdateTodoParams): Promise<TodoModel> => {
    const response: AxiosResponse<TodoModel> = await backendAPI.put(`/todo/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: number): Promise<boolean> => {
    const response: AxiosResponse<void> = await backendAPI.delete(`/todo/${id}`);
    return response.status === 204;
};

export const completeTodo = async (id: number): Promise<TodoModel> => {
    const response: AxiosResponse<TodoModel> = await backendAPI.put(`/todo/${id}/complete`);
    return response.data;
};