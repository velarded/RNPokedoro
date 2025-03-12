import { View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import HorseshoeProgressBar from './HorseshoeProgressBar';
import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import CustomText from './CustomText';
import TimerBackgroundView from './TimerBackgroundView';
import StopButton from './StopButton';
import DialogBox from './DialogBox';

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
//   const duration = 1500;
  const duration = 10;
  const [timerIsActive, setTimerIsActive] = useState(false); 
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // Store the interval ID


  // Function to start the interval
  const startTimer = () => {
    setTimerIsActive(true);
    if (intervalId) return; // Prevent multiple intervals

    const id = setInterval(() => {
        setProgress((prevProgress) => {
          console.log('setInterval: ', prevProgress, duration);
          return (prevProgress < duration ? (prevProgress + 1) : prevProgress);
        });
      }, 1000);

    setIntervalId(id); // Save the interval ID
  };

  // Function to stop the interval
  const stopTimer = () => {
    setTimerIsActive(false);
    if (intervalId) {
      clearInterval(intervalId); // Clear the interval
      setIntervalId(null); // Reset the interval ID
    }
  };

  // Cleanup the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval on unmount
      }
    };
  }, [intervalId]);

  const resetTimer = () => {
    if(timerIsActive) {
        console.log('reset the timer');
        stopTimer();
        setProgress(0);
        setTimerIsActive(false);
    }
  };

    const remainingTime = formatTime(duration - progress);
    const isTimerDone = duration - progress === 0;
    return (
        <Pressable style={styles.timerContainer} onLongPress={resetTimer}>
            <TimerBackgroundView timerIsActive={timerIsActive}/>
            <Image style={styles.eggImg} source={require('../assets/pokemon-egg.gif')}/>
            { isTimerDone && <DialogBox>Oh?! Your egg is hatching</DialogBox> }
            <View style={styles.wrapper}>
                <View>
                { !isTimerDone && <HorseshoeProgressBar progress={progress} duration={duration}/> }
                <View style={styles.contentContainer}>
                    { !isTimerDone && <View style={styles.timerContentInfo}>
                        <CustomText style={styles.timerText}>{remainingTime}</CustomText> 
                        { !timerIsActive && <StartButton onPress={startTimer}/> } 
                        { timerIsActive && <StopButton onPress={stopTimer}/> }
                        { timerIsActive && <CustomText style={styles.holdToResetText}>Hold to reset</CustomText>}
                    </View> }
                </View>
                </View>
            </View>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    timerContainer: {
        alignSelf: 'stretch',
        flex: 1,
        position: 'relative',
    },
    wrapper: {
        position: 'absolute',
        top: '50%', // Start at the center
        transform: [{ translateY: -200 }], // Move up by 250px
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center', // Center horizontally
        gap: 20,
        
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eggImg: {
        width: 100,
        height: 100,
        zIndex: 9999,
        alignSelf: 'center',
        position: 'absolute',
        top: '50%', // Start at the center
        transform: [{ translateY: -70 }], // Move up by 100px
    },
    timerContentInfo: {
        gap: 32,
        transform: [{ translateY: -30 }], // Move up by 40px
        alignItems: 'center',
    },
    timerText: {
      fontSize: fontSize,
      letterSpacing: letterSpacing,
    },
    holdToResetText: {
        fontSize: 32,
        paddingTop: 80,
        color: 'rgba(42, 55, 80, 0.6)'
    },
  });

export default Timer;