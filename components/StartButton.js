// StartButton.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './shared/CustomText';
import { Audio } from 'expo-av';
import BouncingArrow from './BouncingArrow';

const fontSize = 28; // Your font size
const letterSpacingPercentage = 3; // 5.5%
const letterSpacing = fontSize * (letterSpacingPercentage / 100); // Calculate letter spacing

const StartButton = ({ onPress }) => {
  const [sound, setSound] = useState();

  const onPressHandler = async () => {
    onPress();
    playSound();
  };

  // Load the sound effect when the component mounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound when the component unmounts
      }
    };
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('../assets/button-press.mp3') 
      );
      setSound(soundObject);

      await soundObject.playAsync(); // Play the sound
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <CustomText style={styles.text}>Start</CustomText>
        <BouncingArrow />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 125,
    height: 55,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 3.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: fontSize,
    letterSpacing: letterSpacing,
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color
    textShadowOffset: { width: 0, height: 4 }, // Shadow offset
    textShadowRadius: 4, // Shadow blur radius
  },
});

export default StartButton;