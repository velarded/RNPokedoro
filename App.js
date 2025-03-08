import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import HorseshoeProgressBar from './components/HorseshoeProgressBar';
import * as Font from 'expo-font';
import CustomText from './components/CustomText';
import Header from './components/Header';
import { StatusBar } from 'expo-status-bar';
import BackgroundView from './components/BackgroundView';
import StartButton from './components/StartButton';


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
      <View style={styles.wrapper}>
        <BackgroundView />
      </View>
      {/* <StartButton onPress={handlePress} /> */}
      <HorseshoeProgressBar progress={progress} duration={duration}/>
      <Image style={styles.eggImg} source={require('./assets/pokemon-egg.gif')}/>

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
  wrapper: {
    alignSelf: 'stretch', // Ensures the wrapper takes up the full width
    flex: 1,
  },
  eggImg: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
});

export default App;