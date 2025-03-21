import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { InterceptorComponent } from "@/components/interceptorComponent";
import { Button, View } from "react-native";
import AuthService from "@/service/authService";
import tw from "twrnc";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function HeaderRightButton() {
  return (
    <View style={tw`pr-4`}>
      <Button
        onPress={() => {
          AuthService.logout();
          router.navigate("/login");
        }}
        title="Logout"
        color="#000000"
      />
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <InterceptorComponent />
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{}} />
        <Stack.Screen name="login" options={{}} />
        <Stack.Screen
          name="userHome"
          options={{ headerRight: HeaderRightButton }}
        />
        <Stack.Screen name="register" options={{}} />
        <Stack.Screen name="todo/create" 
          options={{ headerRight: HeaderRightButton }}/> 
        <Stack.Screen name="project/create" 
          options={{ headerRight: HeaderRightButton }}/>
      </Stack>
    </ThemeProvider>
  );
}
