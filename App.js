import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Timer from './components/Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EggHatchingView from './components/EggHatchingView';
import PokemonRevealView from './components/PokemonRevealView';
import { PokemonGifProvider } from './components/context/PokemonGifContext';
import TimerSliderView from './components/TimerSliderView';


// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'VT323': require('./assets/fonts/VT323-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  return (
    <PokemonGifProvider>
      <StatusBar style='light'/>
      {/* <View style={styles.appContainer}>
        <Timer />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Timer" screenOptions={
          {
            headerShown: false, 
            animationEnabled: false, // Disables transition animations
            gestureEnabled: false,    // Disables swipe gestures
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 0 } },
              close: { animation: 'timing', config: { duration: 0 } },
            },
          }}>
          <Stack.Screen name="Timer" component={TimerSliderView} />
          <Stack.Screen name="EggHatching" component={EggHatchingView} />
          <Stack.Screen name="PokemonReveal" component={PokemonRevealView} />
        </Stack.Navigator>
      </NavigationContainer>
    </PokemonGifProvider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;