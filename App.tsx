import { Colors } from '@constants/colors';
import { faBookOpen, faCarrot, faClipboard, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import useCachedResources from '@hooks/useCachedResources';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroceriesScreen from '@screens/GroceriesScreen';
import IngredientsScreen from '@screens/IngredientsScreen';
import MenuScreen from '@screens/MenuScreen';
import MenusScreen from '@screens/MenusScreen';
import NewGroceryScreen from '@screens/NewGroceryScreen';
import NewIngredientScreen from '@screens/NewIngredientScreen';
import NewRecipeScreen from '@screens/NewRecipeScreen';
import RecipeScreen from '@screens/RecipeScreen';
import RecipesScreen from '@screens/RecipesScreen';
import { LinearGradient } from 'expo-linear-gradient';
import Parse from 'parse/react-native';
import * as React from 'react';
import { StatusBar, View } from 'react-native';

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
                colors={[Colors.pink4, Colors.yellow4]}
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
                      backgroundColor: Colors.neutral7,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => <View />,
                  }}
                />
                <RecipesStack.Screen
                  name="Recipe"
                  component={RecipeScreen}
                  options={{
                    title: "Recipe",
                    headerStyle: {
                      backgroundColor: Colors.neutral7,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => <View />,
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
                      backgroundColor: Colors.neutral7,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => <View />,
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
          >
            {() => (
              <IngredientsStack.Navigator>
                <IngredientsStack.Screen
                  name="IngredientsHome"
                  component={IngredientsScreen}
                  options={{
                    title: "Ingredients",
                    header: () => <View />,
                  }}
                />
                <IngredientsStack.Screen
                  name="NewIngredient"
                  component={NewIngredientScreen}
                  options={{
                    title: "NewIngredient",
                    headerStyle: {
                      backgroundColor: Colors.neutral7,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => <View />,
                  }}
                />
              </IngredientsStack.Navigator>
            )}
          </Tab.Screen>
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
          >
            {() => (
              <GroceriesStack.Navigator>
                <GroceriesStack.Screen
                  name="GroceriesHome"
                  component={GroceriesScreen}
                  options={{
                    title: "Groceries",
                    header: () => <View />,
                  }}
                />
                <GroceriesStack.Screen
                  name="NewGrocery"
                  component={NewGroceryScreen}
                  options={{
                    title: "NewGrocery",
                    headerStyle: {
                      backgroundColor: Colors.neutral7,
                    },
                    headerTintColor: Colors.yellow1,
                    headerTitle: () => <View />,
                  }}
                />
              </GroceriesStack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
