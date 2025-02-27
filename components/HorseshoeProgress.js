import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import GradientPath from 'react-native-svg-path-gradient';

const HorseshoeProgress = () => {

  return (
    <View style={styles.container}>
        <Svg height="100%" width="100%" viewBox="-2 -2 295 256">
        <GradientPath
            d={
            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
            }
            colors={['#A35AFF', '#5AF5FF']}
            strokeWidth={35}
            roundedCorners
        />
        </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HorseshoeProgress;