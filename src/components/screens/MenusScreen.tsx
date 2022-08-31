import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '@models/Recipe';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecLoader from '@rec/RecLoader';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import MenuListEntry from './menus/MenuListEntry';

const MenusScreen = (props: any) => {
  const [menus, setMenus]: [any, any] = useState(undefined);
  const [recipe, setRecipe]: [any, any] = useState(
    props.route?.params?.recipe ?? undefined
  );
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing ?? false,
    errorMessage: props.route?.params?.errorMessage ?? null,
    isError: props.route?.params?.isError ?? false,
  });

  useEffect(() => {
    getMenus();
  });

  const getMenus = async (): Promise<void> => {
    const query = new Parse.Query("menu");

    await query.find().then(
      (results) => {
        setMenus(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("[MenusScreen] getMenus error:", error);
        const { message, code } = JSON.parse(JSON.stringify(error));
        setToast({
          isShowing: true,
          errorMessage: `${code} ${message}`,
        });
      }
    );
  };

  const saveNewMenu = async (): Promise<void> => {
    let Menu = new Parse.Object("menu");
    const menu = {
      title: "menu title",
      recipes: recipe ? [recipe] : [],
    };
    await Menu.save(menu).then(
      (results) => {
        props.navigation.navigate("Menus", {
          screen: "Menu",
          params: { menu },
        });
      },
      (error) => {
        console.log("[MenusScreen] saveNewMenu error:", error);
        const { message, code } = JSON.parse(JSON.stringify(error));
        setToast({
          isShowing: true,
          errorMessage: `${code} ${message}`,
        });
      }
    );
  };

  const addRecipeToMenu = async (menu: any, recipe: Recipe) => {
    var Menu = Parse.Object.extend("menu");
    var query = new Parse.Query(Menu);
    query.equalTo("objectId", menu.objectId);
    await query.first().then((menuObj: any) => {
      const currentMenu = JSON.parse(JSON.stringify(menuObj));
      const Menu = Parse.Object.extend("menu");
      const parseMenu = new Menu(currentMenu);
      if (
        !menu?.recipes?.some((menuRec: any) => {
          // filter out more similar fields?
          return menuRec?.title === recipe?.title;
        })
      ) {
        parseMenu.set("recipes", [...menu.recipes, recipe]);
        menu.recipes = [...menu.recipes, recipe];
      }

      parseMenu.save().then(() => {
        console.log("saved", menu.recipes);
        props.navigation.navigate("Menus", {
          screen: "Menu",
          params: { menu },
        });
      });
    });
  };

  const onClickMenu = (menu: any): void => {
    console.log("outside");

    if (recipe) {
      addRecipeToMenu(menu, recipe);
    } else {
      console.log("inside");
      props.navigation.navigate("Menus", {
        screen: "Menu",
        params: { menu },
      });
    }
  };

  const deleteMenu = async (menu: any): Promise<void> => {
    let newMenu = new Parse.Object("menu");
    newMenu.id = menu.objectId;
    await newMenu.destroy().then(
      (results) => {
        getMenus();
      },
      (error) => {
        console.log("[MenusScreen] deleteMenu error:", error);
        const { message, code } = JSON.parse(JSON.stringify(error));
        setToast({
          isShowing: true,
          errorMessage: `${code} ${message}`,
        });
      }
    );
  };

  const handleClickedIcon = (icon: string, menu: any) => {
    switch (icon) {
      case "trash":
        deleteMenu(menu);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.background}>
      {/* <RecToast
        message={toast.isError ?? "error"}
        isShowing={toast.isShowing}
        isError={toast.isError}
        errorMessage={toast.errorMessage}
      /> */}
      <RecButton handleClick={saveNewMenu} label="create new menu" />
      <RecCard search paddingLeft={0} paddingRight={0}>
        {menus && menus?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no menus found"
              subheader="create a new menu or adjust your search"
              handleClick={saveNewMenu}
              buttonLabel="create menu"
            />
          </View>
        )}

        {!menus && <RecLoader />}

        {menus &&
          menus?.length > 0 &&
          menus.map((menu: any, i: number) => (
            <MenuListEntry
              key={i}
              menu={menu}
              iconSet="menus"
              navigation={props.navigation}
              handlePressIn={() => onClickMenu(menu)}
              inlineBtn={true}
            />
          ))}
      </RecCard>
    </View>
  );
};

// subheader={{ left: getDateNumeric(menu.createdAt) }}
// handleActionClick={(icon: string) =>
//   handleClickedIcon(icon, menu)
// }
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
