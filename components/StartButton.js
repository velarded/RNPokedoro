// StartButton.js
import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Easing } from 'react-native';
import CustomText from './CustomText';
import Svg, { Path } from 'react-native-svg';

const StartButton = ({ onPress }) => {
  // Create an animated value for the bounce effect
  const bounceValue = useRef(new Animated.Value(0)).current;

  // Bouncing animation
  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -5, // Move up
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // Move back to original position
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    bounceAnimation.start();

    // Cleanup animation on unmount
    return () => bounceAnimation.stop();
  }, [bounceValue]);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <CustomText style={styles.text}>Start</CustomText>
        <Animated.View
            style={[
            styles.arrowContainer,
            {
                transform: [{ translateY: bounceValue }], // Apply bounce animation
            },
            ]}
        >
        <Svg>
            <Path d="M9.96393 11.104L4.00056 3.39513V0.000107765L16.125 0.000107765V3.39513L9.96393 11.104Z" fill="#DE3140" stroke="white" strokeWidth="2"/>
        </Svg>
      </Animated.View>
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
    fontSize: 28,
    letterSpacing: '0.5',
    textShadowColor: 'rgba(0, 0, 0, 0.25)', // Shadow color
    textShadowOffset: { width: 0, height: 4 }, // Shadow offset
    textShadowRadius: 4, // Shadow blur radius
  },
  arrowContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    elevation: 5, // For Android shadow
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute', // Position the triangles on top of each other
  },
  arrowBorder: {
    borderBottomColor: 'white', // White border
    borderLeftWidth: 10, // Slightly larger
    borderRightWidth: 10, // Slightly larger
    borderBottomWidth: 20, // Slightly larger
    transform: [{ rotate: '180deg' }], // Rotate to point downwardr
  },
  arrowInner: {
    borderBottomColor: 'red', // Red inner triangle
    transform: [{ rotate: '180deg' }], // Rotate to point downward
  },
});

export default StartButton;