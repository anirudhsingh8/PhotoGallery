import { Image, StyleSheet, Text, View } from "react-native";

export default PhotoViewScreen = ({ route, navigation }) => {
  const params = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Photo View</Text>
      <Image source={{ uri: params.imageUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Makes background black to match the image
  },
  text: {
    position: "absolute",
    top: 40,
    color: "white",
    fontSize: 20,
    zIndex: 1, // Ensures the text stays above the image
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures the whole image fits within the screen
  },
});
