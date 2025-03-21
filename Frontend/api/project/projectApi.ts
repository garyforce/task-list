import backendAPI from "../api";
import { AxiosResponse } from "axios";
import { Project } from "./projectModel";

export const getProjects = async (): Promise<Project[]> => {
  const response: AxiosResponse<Project[]> = await backendAPI.get("/project");
  return response.data;
};

export const getProject = async (id: number): Promise<Project> => {
  const response: AxiosResponse<Project> = await backendAPI.get(`/project/${id}`);
  return response.data;
};

export const createProject = async (title: string): Promise<Project> => {
  const response: AxiosResponse<Project> = await backendAPI.post("/project", {
    title,
  });
  return response.data;
};

export const updateProject = async (
  id: number,
  title: string
): Promise<Project> => {
  const response: AxiosResponse<Project> = await backendAPI.put(`/project/${id}`, {
    title,
  });
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await backendAPI.delete(`/project/${id}`);
};
