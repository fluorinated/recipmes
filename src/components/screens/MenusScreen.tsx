import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecButton from "@rec/RecButton";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@constants/colors";
import RecEmptyState from "@rec/RecEmptyState";
import { Menu } from "@models/Menu";
import Parse from "parse/react-native";
import { getDateNumeric } from "@utils/format-date";
import RecIconButton from "@rec/RecIconButton";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const MenusScreen = ({ navigation }: any) => {
  const [menus, setMenus]: [any, any] = useState([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const query = new Parse.Query("menu");

    query.find().then(
      (results) => {
        setMenus(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("e", error);
      }
    );
  };

  const saveNewMenu = async () => {
    let Menu = new Parse.Object("menu");
    const newMenu: Menu = {
      title: "menu title",
      recipes: [],
    };
    try {
      let response = await Menu.save(newMenu);
      navigation.navigate("Menu");
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <View style={styles.background}>
      <RecButton handleClick={saveNewMenu} label="create new menu" />
      {menus.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <RecEmptyState
            icon={faBinoculars}
            header="no menus found"
            subheader="create a new menu or adjust your search"
            handleClick={saveNewMenu}
            buttonLabel="create menu"
          />
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView>
            {menus.map((menu: any, index: number) => (
              <View style={styles.listEntry} key={index}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{menu.title}</Text>
                  <Text style={styles.date}>
                    {getDateNumeric(menu.createdAt)}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <RecIconButton
                    icon={faPen}
                    handleClick={() => console.log("hi")}
                  />
                  <RecIconButton
                    icon={faTrash}
                    handleClick={() => console.log("hi")}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    margin: 10,
    fontFamily: "Kailasa",
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#656565",
    marginTop: 65,
  },
  title: {
    fontSize: 32,
    paddingTop: 15,
    paddingBottom: 15,
    color: Colors.black,
  },
  date: {
    color: Colors.neutral2,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "75%",
  },
  listEntry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
  },
});

export default MenusScreen;
