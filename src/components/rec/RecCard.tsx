import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Colors } from "@constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import RecSearch from "./RecSearch";
import RecTagList from "./RecTagList";
import { FoodCategory } from "models/FoodCategory";
import { BlurView } from "expo-blur";

const RecCard = (props: any) => {
  const getMarginTop = () => {
    let marginTop = 0;
    if (props.search) {
      marginTop = marginTop + 80;
    }
    if (props.tags) {
      marginTop = marginTop + 30;
    }
    return marginTop;
  };
  const [scrollPosition, setScrollPosition]: [number, any] = useState(0);
  const [marginTop, setMarginTop]: [number, any] = useState(getMarginTop());
  const [bgRef, setBgRef]: [any, any] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View
          style={{
            height: marginTop,
            width: 400,
            zIndex: -1,
            backgroundColor: "transparent",
          }}
        />
        <BlurView
          style={{
            width: "100%",
            height: 50,
            opacity: 0.5,
          }}
          intensity={1000}
        ></BlurView>

        <ScrollView style={styles.bgScroll} ref={(ref) => setBgRef(ref)}>
          {props?.children?.map((child: any, i: number) => (
            <ImageBackground
              source={{
                uri: "data:image/jpeg;base64," + child?.props?.recipe?.photo,
              }}
              style={[styles.photo]}
              blurRadius={10}
              key={i}
            ></ImageBackground>
          ))}
        </ScrollView>

        <BlurView
          style={{
            width: "100%",
            height: 50,
            opacity: 0.5,
          }}
          intensity={1000}
        ></BlurView>
      </View>

      <View style={styles.shadow2}>
        <View style={styles.shadow}>
          <BlurView style={styles.card} intensity={10}>
            <RecSearch
              label="search"
              style={props.search ? {} : styles.hidden}
            />
            <RecTagList
              listType="food"
              selectedTags={(tags: FoodCategory[]) => console.log(tags)}
              marginTop={10}
              marginBottom={24}
              marginLeft={0}
              marginRight={0}
              style={props.tags ? {} : styles.hidden}
            />
            <ScrollView
              onScroll={(e) =>
                bgRef.scrollTo({
                  x: 0,
                  y: e.nativeEvent.contentOffset.y + 5,
                  animated: false,
                })
              }
              scrollEventThrottle={1}
              style={{ height: 350 }}
            >
              {props.children}
            </ScrollView>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  container: {},
  card: {
    padding: 15,
    paddingBottom: 50,
    height: 580,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: `${Colors.white}50`,
    borderColor: `${Colors.white}50`,

    textShadowColor: "transparent",
    textShadowRadius: 0,
    overflow: "scroll",
  },
  shadow: {
    height: 580,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: `${Colors.white}60`,
    borderColor: `${Colors.white}50`,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowOpacity: 0.5,
    textShadowColor: "transparent",
    textShadowRadius: 0,
  },
  shadow2: {
    height: 580,
    paddingBottom: 50,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: `${Colors.white}50`,
    borderColor: `${Colors.white}10`,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    textShadowColor: "transparent",
    textShadowRadius: 0,
  },
  photo: {
    height: 120,
    width: 430,
    opacity: 1,
    shadowColor: `${Colors.black}80`,
    shadowOffset: {
      width: 4,
      height: -4,
    },
    shadowOpacity: 1.0,
  },
  background: {
    position: "absolute",
    maxHeight: 580,
  },
  bgScroll: {
    zIndex: -1,
    overflow: "hidden",
    marginTop: -5,
    marginBottom: -5,
  },
});

export default RecCard;
