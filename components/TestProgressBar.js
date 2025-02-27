import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const HorseshoeProgressBar = ({ progress, duration }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress, duration]);

  const svgWidthHeight = 300;
  const strokeWidth = 15;
  const outlineWidth = strokeWidth + 16; // Thickness of the black outline
  const whiteOutlineWidth = strokeWidth + 8; // Thickness of the white outline
  const radius = 90;
  const centerX = svgWidthHeight / 2;
  const centerY = svgWidthHeight / 2;
  const startAngle = -225; // Start angle of the horseshoe
  const endAngle = 45; // End angle of the horseshoe

  // Function to calculate the arc path based on the current angle
  const getArcPath = () => {
    const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

    // Draw the full arc path
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };

  // Calculate the total length of the arc
  const arcLength = (Math.PI * radius * Math.abs(endAngle - startAngle)) / 180;

  // Interpolate the animated value to get the strokeDashoffset
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [arcLength, 0], // Draws the stroke from full dash to no dash
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height={svgWidthHeight} width={svgWidthHeight}>
        <G>
          {/* Black Outline for the Background Arc */}
          <Path
            d={getArcPath()}
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
            stroke="#e0e0e0" // Light gray color for the background
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Black Outline for the Progress Arc */}
          <AnimatedPath
            d={getArcPath()}
            stroke="#00FF00" // Black color for the outline
            strokeWidth={whiteOutlineWidth} // Same thickness as the outermost black outline
            fill="none"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
          />
          {/* Progress Arc (Green) */}
          <AnimatedPath
            d={getArcPath()}
            stroke="#00FF00" // Green color for the progress
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
          />
        </G>
      </Svg>
      <Text style={{ marginTop: 10, fontSize: 20 }}>
        {Math.round(progress)}%
      </Text>
    </View>
  );
};

// AnimatedPath is a workaround for animating the Path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default HorseshoeProgressBar;