import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Timer from './components/Timer';


const App = () => {
  const duration = 1500;
  const [progress, setProgress] = useState(0);
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

  // run every second
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        console.log(prevProgress, duration);
        return (prevProgress < duration ? (prevProgress + 1) : 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    console.log('Start Button Pressed!');
  };

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