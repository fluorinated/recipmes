import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export const useCachedResources = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          ...FontAwesome.font,
          Light: Manrope_400Regular,
          Regular: Manrope_500Medium,
          Medium: Manrope_600SemiBold,
        });
      } catch (e) {
        console.warn(e); // provide this error info to an error reporting service
      } finally {
        setIsLoaded(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoaded;
};
