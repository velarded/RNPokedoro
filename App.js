import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EggHatchingView from './components/EggHatchingView';
import PokemonRevealView from './components/PokemonRevealView';
import { PokemonGifProvider } from './components/context/PokemonGifContext';
import RegisterToPokedexView from './components/pokedex-register/RegisterToPokedexView';
import Timer from './components/timer/Timer';
import PokedexView from './components/pokedex/PokedexView';


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
      <NavigationContainer>
      <Stack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'rgba(15, 15, 15, 0.75)' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.85],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
      >
          <Stack.Screen name="Timer" component={Timer} />
          <Stack.Screen name="EggHatching" component={EggHatchingView} />
          <Stack.Screen name="PokemonReveal" component={PokemonRevealView} />
          <Stack.Screen name="RegisterToPokedex" component={PokedexView} />
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