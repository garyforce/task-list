import backendAPI from "../api";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await backendAPI.post("/user", { name, email, password });
  return response.data;
};

export const deleteUser = async (userId: number) => {
  await backendAPI.delete(`/user/${userId}`);
};

export const loginUser = async (email: string, password: string) => {
  const response = await backendAPI.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  await backendAPI.delete("/logout");
};
