import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HorseShoeArc = () => {
  const width = 200;
  const height = 200;
  const radius = 80;
  const strokeWidth = 20;
  const startAngle = 45; // Start angle in degrees
  const endAngle = 315; // End angle in degrees

  // Convert angles from degrees to radians
  const toRadians = (angle) => (angle * Math.PI) / 180;

  // Calculate the start and end points of the arc
  const startX = width / 2 + radius * Math.cos(toRadians(startAngle));
  const startY = height / 2 + radius * Math.sin(toRadians(startAngle));
  const endX = width / 2 + radius * Math.cos(toRadians(endAngle));
  const endY = height / 2 + radius * Math.sin(toRadians(endAngle));

  // Create the path for the arc
  const arcPath = `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 0 1 ${endX} ${endY}
  `;

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Green Inner Arc */}
        <Path
          d={arcPath}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Black Outer Arc */}
        <Path
          d={arcPath}
          stroke="black"
          strokeWidth={strokeWidth + 2} // Slightly thicker to outline the green arc
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default HorseShoeArc;
