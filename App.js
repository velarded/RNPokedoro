import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import HorseshoeProgressBar from './components/HorseshoeProgressBar';
// import HorseshoeProgressBar from './components/TestProgressBar';
import HorseShoeArc from './components/Arc';
import * as Font from 'expo-font';
import CustomText from './components/CustomText';
import Header from './components/Header';
import { StatusBar } from 'expo-status-bar';


const App = () => {
  const durationSeconds = 1500;
  const duration = 100;
  const [progress, setProgress] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'PressStart2P': require('./assets/fonts/PressStart2P-Regular.ttf'),
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

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Header />
      
      <HorseshoeProgressBar progress={progress} duration={duration} durationSeconds={durationSeconds}/>
      <Image style={{ width: 100, height: 100 }} source={require('./assets/pokemon-egg.gif')}/>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width: '100%', // Ensures full width
    height: '100%', // Ensures full height
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#385655',
  }
});

export default App;