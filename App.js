import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import HomeScreen from "./src/screens/home";
import DetailScreen from "./src/screens/detail";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="detail"
            component={DetailScreen}
            options={{ headerShown: true, headerTransparent: true, title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
