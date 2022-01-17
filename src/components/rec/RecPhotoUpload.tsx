import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

const RecPhotoUpload = (props: any) => {
  const [image, setImage]: [any, any] = useState({ base64: "" });

  useEffect(() => {
    props.uploadedImage && props.uploadedImage(image);
  }, [image]);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    if (!_image.cancelled) {
      setImage(_image.base64);
    }
  };

  return (
    <View style={styles.container}>
      <View style={image.base64 !== "" ? styles.photoCloseBtn : styles.hidden}>
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={() => setImage({ base64: "" })}
        >
          <View style={styles.closeBtnBg}>
            <FontAwesomeIcon icon={faTimes} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <Image
          source={{ uri: "data:image/jpeg;base64," + image }}
          style={styles.photo}
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={addImage}
          style={image.base64 !== "" ? styles.hidden : styles.photoUpload}
        >
          <FontAwesomeIcon icon={faCamera} style={styles.icon} />
          <Text style={styles.photoUploadText}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  container: {
    width: "100%",
  },
  photoUpload: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: Colors.neutral6,
    borderColor: Colors.neutral4,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
  },
  photoUploadText: {
    color: Colors.neutral1,
  },
  photo: {
    height: 130,
    width: 130,
    borderRadius: 10,
  },
  icon: {
    color: Colors.neutral1,
  },
  closeBtnBg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    backgroundColor: Colors.neutral5,
    borderRadius: 50,
  },
  closeBtnContainer: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: -10,
    marginRight: -10,
    zIndex: 1,
  },
  photoCloseBtn: {
    display: "flex",
    width: 130,
  },
});

export default RecPhotoUpload;
