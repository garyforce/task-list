import axios from "axios";
const backendURL = "http://localhost:3000";

console.log(`Running requests to ${backendURL}`);

const backendAPI = axios.create({
  baseURL: backendURL,
  withCredentials: true, // Ensure cookies are sent with requests
});

export function AxiosInterceptorsSetup(
  navigate: (to: string) => void,
  location: Location
): void {
  backendAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
      try {
        if (error?.response?.status === 401) {
          console.log(
            "Session expired or unauthorized access",
            error?.response
          );

          // Redirect to login page if not already there
          if (
            location.pathname !== "/login" &&
            location.pathname !== "/createAccount"
          ) {
            console.log("Redirecting to login page");
            navigate("/login");
            return;
          }
          throw error;
        }
      } catch (err) {
        console.error("Error handling response", err);

        // Redirect to login page if not already there
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/createAccount"
        ) {
          navigate("/login");
          return;
        }
        throw err;
      }
      return await Promise.reject(error);
    }
  );
}

//backendAPI.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//backendAPI.defaults.headers.put["Access-Control-Allow-Origin"] = "*";

export default backendAPI;
