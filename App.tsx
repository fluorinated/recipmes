import { Colors } from '@constants/colors';
import { faBookOpen, faCarrot, faChevronLeft, faClipboard, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useCachedResources } from '@hooks/useCachedResources';
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
import { store } from '@store/store';
import { LinearGradient } from 'expo-linear-gradient';
import Parse from 'parse/react-native';
import * as React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize("recipmes", "recipmesJSKey", "recipmesMasterKey619");
Parse.serverURL = "https://recipmes-server.herokuapp.com/parse";
// Parse.serverURL = "http://localhost:1337/parse";

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const GroceriesStack = createNativeStackNavigator();
const IngredientsStack = createNativeStackNavigator();

const BackHeader = (props: any) => {
  const isHome = (): boolean =>
    ["recipes", "ingredients", "groceries", "menus"].includes(
      props?.title?.toLowerCase()
    );
  return (
    <LinearGradient
      colors={[Colors.pink4, Colors.yellow4]}
      style={{
        height: 90,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
    >
      {props.header ? (
        <StatusBar
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
      ) : (
        <View />
      )}
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPressIn={() => props?.navigation?.goBack()}
      >
        {!isHome() ? (
          <FontAwesomeIcon
            icon={faChevronLeft}
            color={Colors.yellow1}
            size={25}
            style={{ flex: 1, marginLeft: 15 }}
          />
        ) : (
          <View />
        )}
        <Text
          style={{
            flex: 1,
            fontFamily: "Medium",
            fontSize: 18,
            color: Colors.yellow1,
            textAlign: "center",
            marginLeft: !isHome() ? -40 : 0,
          }}
        >
          {props?.title?.toLowerCase()}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          width: "100%",
          borderBottomColor: Colors.neutral5,
          borderBottomWidth: 0.5,
        }}
      />
    </LinearGradient>
  );
};

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              header: () => <View />,
              tabBarBackground: () => (
                <LinearGradient
                  colors={[Colors.pink4, Colors.yellow4]}
                  style={{ height: "100%" }}
                  start={[0.0, 0.5]}
                  end={[1.0, 0.5]}
                  locations={[0.0, 1.0]}
                ></LinearGradient>
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
                      header: (props) => (
                        <BackHeader {...props} title="Recipes" />
                      ),
                    }}
                  />
                  <RecipesStack.Screen
                    name="NewRecipe"
                    component={NewRecipeScreen}
                    options={{
                      title: "NewRecipe",
                      header: (props) => (
                        <BackHeader {...props} title="Add Recipe" />
                      ),
                    }}
                  />
                  <RecipesStack.Screen
                    name="Recipe"
                    component={RecipeScreen}
                    options={{
                      title: "Recipe",
                      header: (props) => (
                        <BackHeader {...props} title="Recipe" />
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
                      header: (props) => (
                        <BackHeader {...props} title="Menus" />
                      ),
                    }}
                  />
                  <MenuStack.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{
                      title: "Menu",
                      header: (props) => <BackHeader {...props} title="Menu" />,
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
                      header: (props) => (
                        <BackHeader {...props} title="Ingredients" />
                      ),
                    }}
                  />
                  <IngredientsStack.Screen
                    name="NewIngredient"
                    component={NewIngredientScreen}
                    options={{
                      title: "NewIngredient",
                      header: (props) => (
                        <BackHeader {...props} title="Add Ingredient" />
                      ),
                    }}
                  />
                </IngredientsStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Groceries"
              options={{
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
                      header: (props) => (
                        <BackHeader {...props} title="Groceries" />
                      ),
                    }}
                  />
                  <GroceriesStack.Screen
                    name="NewGrocery"
                    component={NewGroceryScreen}
                    options={{
                      title: "NewGrocery",
                      header: (props) => (
                        <BackHeader {...props} title="Add Grocery" />
                      ),
                    }}
                  />
                </GroceriesStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
