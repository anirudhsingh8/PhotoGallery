import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default CameraScreen = () => {
  const navigator = useNavigation();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    try {
      if (cameraRef.current) {
        const result = await cameraRef.current.takePictureAsync(null);
        setPhoto(result.uri);
        console.log(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (photo) {
      navigator.navigate("Detail", { imageUri: photo });
    }
  }, [photo]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <MaterialIcons name="camera" size={36} color={"red"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialIcons
              name="flip-camera-android"
              size={36}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
