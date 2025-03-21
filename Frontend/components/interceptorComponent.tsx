
import { AxiosInterceptorsSetup } from "../api/api";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export function InterceptorComponent() {
const navigation = useNavigation().navigate;

  useEffect(() => {
    AxiosInterceptorsSetup(navigation, location);
  }, []);

  return <></>;
}