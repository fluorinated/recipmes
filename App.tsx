import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@constants/colors";
import RecipesScreen from "@screens/RecipesScreen";
import RecipeScreen from "@screens/RecipeScreen";
import NewRecipeScreen from "@screens/NewRecipeScreen";
import MenusScreen from "@screens/MenusScreen";
import MenuScreen from "@screens/MenuScreen";
import IngredientsScreen from "@screens/IngredientsScreen";
import GroceriesScreen from "@screens/GroceriesScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookOpen,
  faClipboard,
  faCarrot,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Parse from "parse/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCachedResources from "@hooks/useCachedResources";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("recipmes", "recipmesJSKey", "recipmesMasterKey619");
Parse.serverURL = "https://recipmes-server.herokuapp.com/parse";
// Parse.serverURL = "http://localhost:1337/parse";

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const GroceriesStack = createNativeStackNavigator();
const IngredientsStack = createNativeStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              position: "absolute",
            },
            tabBarBackground: () => (
              <LinearGradient
                colors={[Colors.pink1, Colors.purple1]}
                style={{ height: "100%" }}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                locations={[0.0, 1.0]}
              ></LinearGradient>
            ),
            tabBarActiveBackgroundColor: `${Colors.neutral1}20`,
            tabBarInactiveTintColor: Colors.white,
            tabBarActiveTintColor: Colors.white,
            tabBarItemStyle: {
              marginLeft: 15,
              marginRight: 15,
              marginTop: 10,
              marginBottom: -15,
              borderRadius: 10,
            },
            tabBarShowLabel: false,
          }}
          // fontFamily: "Kailasa",
        >
          <Tab.Screen
            name="Recipes"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faBookOpen}
                  color={Colors.white}
                  size={size}
                />
              ),
            }}
          >
            {() => (
              <RecipesStack.Navigator>
                <RecipesStack.Screen
                  name="RecipesHome"
                  component={RecipesScreen}
                  options={{
                    title: "Recipes",
                    header: () => <View />,
                  }}
                />
                <RecipesStack.Screen
                  name="NewRecipe"
                  component={NewRecipeScreen}
                  options={{
                    title: "NewRecipe",
                    headerStyle: {
                      backgroundColor: Colors.white,
                    },
                    headerTintColor: Colors.purple1,
                    headerTitle: () => <View />,
                  }}
                />
                <RecipesStack.Screen
                  name="Recipe"
                  component={RecipeScreen}
                  options={{
                    title: "Recipe",
                    headerStyle: {
                      backgroundColor: Colors.white,
                    },
                    headerTintColor: Colors.purple1,
                    headerTitle: () => <View />,
                  }}
                />
              </RecipesStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Menus"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faClipboard}
                  color={Colors.white}
                  size={size}
                />
              ),
            }}
          >
            {() => (
              <MenuStack.Navigator>
                <MenuStack.Screen
                  name="MenusHome"
                  component={MenusScreen}
                  options={{
                    title: "Menus",
                    header: () => <View />,
                  }}
                />
                <MenuStack.Screen
                  name="Menu"
                  component={MenuScreen}
                  options={{
                    title: "Menu",
                    headerStyle: {
                      backgroundColor: Colors.white,
                    },
                    headerTintColor: Colors.purple1,
                    headerTitle: () => <View />,
                  }}
                />
              </MenuStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Ingredients"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faCarrot}
                  color={Colors.white}
                  size={size}
                />
              ),
            }}
            component={IngredientsScreen}
          />
          <Tab.Screen
            name="Groceries"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faList}
                  color={Colors.white}
                  size={size}
                />
              ),
            }}
            component={GroceriesScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
