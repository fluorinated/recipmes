import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import {BlurView} from 'expo-blur';
import {Colors} from './colors';
import RecipesScreen from './components/screens/RecipesScreen';
import RecipeScreen from './components/screens/RecipeScreen';
import NewRecipeScreen from './components/screens/NewRecipeScreen';
import MenuScreen from './components/screens/MenuScreen';
import IngredientsScreen from './components/screens/IngredientsScreen';
import GroceriesScreen from './components/screens/GroceriesScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBookOpen,
  faUtensils,
  faCarrot,
  faList,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const GroceriesStack = createNativeStackNavigator();
const IngredientsStack = createNativeStackNavigator();
{
  // tabBarBackground: () => (
  //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
  //     <Text>Sign in with Facebook</Text>
  //   </LinearGradient>
  // ),
  // tabBarBackground: () => (
  //   <BlurView
  //     tint="light"
  //     intensity={100}
  //     style={StyleSheet.absoluteFill}
  //   />
  // ),
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {position: 'absolute', backgroundColor: Colors.purple1},
          tabBarActiveBackgroundColor: Colors.purple2,
          tabBarInactiveBackgroundColor: Colors.purple1,
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
          fontFamily: 'Kailasa',
        }}>
        <Tab.Screen
          name="Recipes"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                icon={faBookOpen}
                color={Colors.white}
                size={size}
              />
            ),
          }}>
          {() => (
            <RecipesStack.Navigator>
              <RecipesStack.Screen
                name="Recipes"
                component={RecipesScreen}
                options={{
                  title: 'Recipes',
                  headerStyle: {
                    backgroundColor: Colors.purple1,
                  },
                  headerTintColor: Colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <RecipesStack.Screen
                name="NewRecipe"
                component={NewRecipeScreen}
                options={{
                  title: 'NewRecipe',
                  headerStyle: {
                    backgroundColor: Colors.purple1,
                  },
                  headerTintColor: Colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
              <RecipesStack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{
                  title: 'Recipe',
                  headerStyle: {
                    backgroundColor: Colors.purple1,
                  },
                  headerTintColor: Colors.white,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              />
            </RecipesStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Menu"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                icon={faUtensils}
                color={Colors.white}
                size={size}
              />
            ),
          }}>
          {() => (
            <MenuStack.Navigator>
              <MenuStack.Screen name="Menu" component={MenuScreen} />
            </MenuStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Ingredients"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon
                icon={faCarrot}
                color={Colors.white}
                size={size}
              />
            ),
          }}>
          {() => (
            <IngredientsStack.Navigator>
              <IngredientsStack.Screen
                name="Ingredients"
                component={IngredientsScreen}
              />
            </IngredientsStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Groceries"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faList} color={Colors.white} size={size} />
            ),
          }}>
          {() => (
            <GroceriesStack.Navigator>
              <GroceriesStack.Screen
                name="Groceries"
                component={GroceriesScreen}
              />
            </GroceriesStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
