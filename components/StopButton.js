// StartButton.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Easing } from 'react-native';
import CustomText from './CustomText';
import { Audio } from 'expo-av';
import BouncingArrow from './BouncingArrow';

const fontSize = 28; // Your font size
const letterSpacingPercentage = 3; // 5.5%
const letterSpacing = fontSize * (letterSpacingPercentage / 100); // Calculate letter spacing

const StopButton = ({ onPress }) => {
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
        <View style={styles.goldBorder}>
            <View style={styles.whiteBorder}>
                <CustomText style={styles.text}>Stop</CustomText>
                <BouncingArrow />
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 125,
    height: 55,
    flexDirection: 'row',
    borderWidth: 3.15,
    borderColor: 'black',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: fontSize,
    letterSpacing: letterSpacing,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color
    textShadowOffset: { width: 0, height: 4 }, // Shadow offset
    textShadowRadius: 4, // Shadow blur radius
  },
  goldBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 3.15,
    borderColor: '#C8A848',
    backgroundColor: '#C8A848',
    borderRadius: 2,
  },
  whiteBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 2.5,
    borderColor: 'white',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#285068',
  },
});

export default StopButton;