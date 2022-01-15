import * as React from "react";
import { StatusBar, View } from "react-native";
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
                colors={[Colors.pink1, Colors.yellow4]}
                style={{ height: "100%" }}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                locations={[0.0, 1.0]}
              >
                <StatusBar
                  barStyle="dark-content"
                  networkActivityIndicatorVisible={true}
                />
              </LinearGradient>
            ),
            tabBarActiveBackgroundColor: `${Colors.yellow1}10`,
            tabBarInactiveTintColor: Colors.yellow1,
            tabBarActiveTintColor: Colors.yellow1,
            tabBarItemStyle: {
              marginLeft: 15,
              marginRight: 15,
              marginTop: 10,
              marginBottom: -15,
              borderRadius: 10,
            },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Recipes"
            options={{
              headerStyle: {
                backgroundColor: Colors.yellow4,
                borderBottomWidth: 0.5,
                borderBottomColor: `${Colors.yellow3}50`,
              },
              headerTintColor: Colors.yellow1,
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faBookOpen}
                  color={Colors.yellow1}
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
                      backgroundColor: Colors.yellow4,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => (
                      <View
                        style={{
                          position: "absolute",
                          width: 420,
                          height: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: `${Colors.yellow3}50`,
                          paddingTop: 45,
                        }}
                      />
                    ),
                  }}
                />
                <RecipesStack.Screen
                  name="Recipe"
                  component={RecipeScreen}
                  options={{
                    title: "Recipe",
                    headerStyle: {
                      backgroundColor: Colors.yellow4,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => (
                      <View
                        style={{
                          position: "absolute",
                          width: 420,
                          height: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: `${Colors.yellow3}50`,
                          paddingTop: 45,
                        }}
                      />
                    ),
                  }}
                />
              </RecipesStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Menus"
            options={{
              title: "Menus",
              headerStyle: {
                backgroundColor: Colors.yellow4,
                borderBottomWidth: 0.5,
                borderBottomColor: `${Colors.yellow3}50`,
              },
              headerTintColor: Colors.yellow1,
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faClipboard}
                  color={Colors.yellow1}
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
                      backgroundColor: Colors.yellow4,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => (
                      <View
                        style={{
                          position: "absolute",
                          width: 420,
                          height: 1,
                          borderBottomWidth: 1,
                          borderBottomColor: `${Colors.yellow3}50`,
                          paddingTop: 45,
                        }}
                      />
                    ),
                  }}
                />
              </MenuStack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Ingredients"
            options={{
              headerStyle: {
                backgroundColor: Colors.yellow4,
                borderBottomWidth: 0.5,
                borderBottomColor: `${Colors.yellow3}50`,
              },
              headerTintColor: Colors.yellow1,
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faCarrot}
                  color={Colors.yellow1}
                  size={size}
                />
              ),
            }}
            component={IngredientsScreen}
          />
          <Tab.Screen
            name="Groceries"
            options={{
              headerStyle: {
                backgroundColor: Colors.yellow4,
                borderBottomWidth: 0.5,
                borderBottomColor: `${Colors.yellow3}50`,
              },
              headerTintColor: Colors.yellow1,
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faList}
                  color={Colors.yellow1}
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
