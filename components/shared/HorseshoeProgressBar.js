import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const HorseshoeProgressBar = ({ progress, duration }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [progress, duration]);

  const svgWidth = 300;
  const strokeWidth = 25;
  const outlineWidth = strokeWidth + 16; // Slightly larger for the outline
  const whiteOutlineWidth = strokeWidth +8; // Slightly smaller for the white outline
  const radius = 120;
  const centerX = svgWidth / 2;
  const centerY = svgWidth / 2;
  const startAngle = -225; // Start angle of the horseshoe
  const endAngle = 45; // End angle of the horseshoe
  const progressColor = '#F9F2F7';
  const backgroundColor = '#99e0b4';

  // Function to calculate the arc path based on the current angle
  const getArcPath = () => {
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

    // Draw the full arc path
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };

  const getOutlineArcPath = () => {
    const x1 = centerX + radius * Math.cos(((startAngle - 2) * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin(((startAngle - 2) * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos(((endAngle + 2) * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin(((endAngle + 2) * Math.PI) / 180);

    // Draw the full arc path
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  
  // Calculate the total length of the arc
  const arcLength = (Math.PI * radius * Math.abs(endAngle - startAngle)) / 180;
  const arcInnerLength = (Math.PI * radius * Math.abs(endAngle - startAngle - 2)) / 180;

  // Interpolate the animated value to get the strokeDashoffset
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, duration],
    outputRange: [arcLength, 0], // Draws the stroke from full dash to no dash
  });

  return (
        <View style={styles.container}>
          <Svg height={275} width={svgWidth} style={styles.svg}>
            <G>
              {/* Black Outline for the Background Arc */}
              <Path
                d={getOutlineArcPath()}
                stroke="#000" // Black color for the outline
                strokeWidth={outlineWidth} // Thickness of the black outline
                fill="none"
              />
              {/* White Outline for the Background Arc */}
              <Path
                d={getArcPath()}
                stroke="#FFF" // White color for the outline
                strokeWidth={whiteOutlineWidth} // Thickness of the white outline
                fill="none"
              />
              {/* Background Arc */}
              <Path
                d={getArcPath()}
                stroke={backgroundColor} // Green color for the background
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Black Outline for the Progress Arc */}
              <AnimatedPath
                d={getArcPath()}
                stroke={'#000'} // Black color for the outline
                strokeWidth={outlineWidth} // Same thickness as the outermost black outline
                fill="none"
                strokeDasharray={arcLength}
                strokeDashoffset={strokeDashoffset}
              />
              {/* Progress Arc (Grey) */}
              <AnimatedPath
                d={getArcPath()}
                stroke={progressColor} // Grey color for the progress
                strokeWidth={whiteOutlineWidth}
                fill="none"
                strokeDasharray={arcInnerLength}
                strokeDashoffset={strokeDashoffset}
              />
            </G>
          </Svg>
        </View>
  );
};

// AnimatedPath is a workaround for animating the Path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({ 
  container: {
  },
});
export default HorseshoeProgressBar;