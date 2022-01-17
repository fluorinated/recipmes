import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '@models/Recipe';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecListEntry from '@rec/RecListEntry';
import { getDateNumeric } from '@utils/format-date';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const MenusScreen = (props: any) => {
  const [menus, setMenus]: [any, any] = useState([]);
  const [recipe, setRecipe]: [any, any] = useState(
    props.route?.params?.recipe ?? {}
  );
  const [isSaved, setIsSaved]: [boolean, any] = useState(false);

  useEffect(() => {
    getMenus();
  });

  const getMenus = async (): Promise<void> => {
    const query = new Parse.Query("menu");

    query.find().then(
      (results) => {
        setMenus(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("[MenusScreen] getMenus error:", error);
      }
    );
  };

  const saveNewMenu = async (): Promise<void> => {
    let Menu = new Parse.Object("menu");
    const newMenu: Menu = {
      title: "menu title",
      recipes: [],
    };
    try {
      let response = await Menu.save(newMenu);
      props.navigation.navigate("Menu");
    } catch (e) {
      console.log("[MenusScreen] saveNewMenu error:", e);
    }
  };

  const addRecipeToMenu = async (menu: any, recipe: Recipe): Promise<void> => {
    var Menu = Parse.Object.extend("menu");
    var query = new Parse.Query(Menu);
    query.equalTo("objectId", menu.objectId);
    await query.first().then((menuObj: any) => {
      const currentMenu = JSON.parse(JSON.stringify(menuObj));
      const Menu = Parse.Object.extend("menu");
      const parseMenu = new Menu(currentMenu);
      if (
        !menu.recipes.some((menuRec: any) => {
          // would be better to test the whole object in the future
          return menuRec.title === recipe.title;
        })
      ) {
        parseMenu.set("recipes", [...menu.recipes, recipe]);
      }
      parseMenu.save();
      setIsSaved(true);
    });
  };

  const onClickMenu = (menu: any): void => {
    if (!isSaved && Object.keys(recipe).length !== 0) {
      addRecipeToMenu(menu, recipe);
      setIsSaved(false);
      props.navigation.goBack();
    } else {
      props.navigation.navigate("Menu", menu);
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
        <RecCard search paddingLeft={0} paddingRight={0}>
          {menus.map((menu: any, index: number) => (
            <RecListEntry
              onPress={() => onClickMenu(menu)}
              key={index}
              header={menu.title}
              subheaderLeft={getDateNumeric(menu.createdAt)}
            />
          ))}
        </RecCard>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MenusScreen;
