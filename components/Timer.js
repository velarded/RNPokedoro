import { View, Image, StyleSheet } from 'react-native';
import HorseshoeProgressBar from './HorseshoeProgressBar';
import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import CustomText from './CustomText';
import TimerBackgroundView from './TimerBackgroundView';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  };
  const fontSize = 64; // Your font size
  const letterSpacingPercentage = 5.5; // 5.5%
  const letterSpacing = fontSize * (letterSpacingPercentage / 100); // Calculate letter spacing

  
const Timer = () => {
  const duration = 1500;
  const [progress, setProgress] = useState(0);
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

    const remainingTime = formatTime(duration - progress);
    return (
        <View style={styles.timerContainer}>
            <TimerBackgroundView />
            <View style={styles.wrapper}>
                <View style={styles.contentContainer}>
                <HorseshoeProgressBar progress={progress} duration={duration}/>
                <Image style={styles.eggImg} source={require('../assets/pokemon-egg.gif')}/>
                <View style={styles.timerContentInfo}>
                    <CustomText style={styles.timerText}>
                        {remainingTime}
                    </CustomText> 
                    <StartButton />
                </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    timerContainer: {
        alignSelf: 'stretch',
        flex: 1,
        position: 'relative',
        backgroundColor: 'blue',
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eggImg: {
      width: 100,
      height: 100,
      position: 'absolute',
    },
    timerContentInfo: {
        gap: 16
    },
    timerText: {
      fontSize: fontSize,
      letterSpacing: letterSpacing,
    },
  });

export default Timer;