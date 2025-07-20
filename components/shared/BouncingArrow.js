import { StyleSheet, Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';
import Svg, { Path, G } from 'react-native-svg';

const BouncingArrow = () => {
  // Create an animated value for the bounce effect
  const bounceValue = useRef(new Animated.Value(0)).current;

  // Bouncing animation
  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -2, // Move down
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
        <Animated.View
            style={[
            styles.arrowContainer,
            {
                transform: [{ translateY: bounceValue }], // Apply bounce animation
            },
            ]}
        >
        <Svg>
            <G transform={`scale(0.8)`}>
                <Path d="M9.96393 11.104L4.00056 3.39513V0.000107765L16.125 0.000107765V3.39513L9.96393 11.104Z" fill="#DE3140" stroke="white" strokeWidth="2.5"/>
            </G>
        </Svg>
      </Animated.View>
    );
};

const styles = StyleSheet.create({

  arrowContainer: {
    width: 20,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow blur radius
    elevation: 5, // For Android shadow
  }
});

export default BouncingArrow;