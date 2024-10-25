import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import CameraScreen from "./screens/CameraScreen";
import PhotoListScreen from "./screens/PhotoListScreen";
import PhotoViewScreen from "./screens/PhotoViewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={PhotoListScreen}
          options={{
            title: "Photo gallery",
            headerRight: () => {
              const navigator = useNavigation();

              return (
                <TouchableOpacity
                  onPressIn={() => navigator.navigate("Camera")}
                >
                  <AntDesign name="camerao" size={24} />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen name="Detail" component={PhotoViewScreen} />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: "",
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
