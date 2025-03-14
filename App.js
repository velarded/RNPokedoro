import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Timer from './components/Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      {/* <Header /> */}
      <Timer />
    </View>
    </>
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