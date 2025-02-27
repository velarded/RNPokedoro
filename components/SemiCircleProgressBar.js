import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

const SemiCircleProgressBar = ({ progress, total }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = -Math.PI / 2;
  const strokeWidth = 5;
  const strokeDasharray = circumference - (circumference * progress / total);
  const strokeDashoffset = circumference;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg height={radius * 2} width={radius * 2}>
        <Path
          d={`M ${radius}, ${radius}
             A ${radius},${radius} 0 0,1 ${radius * 2},${radius}
             L ${radius},${radius}`}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Path
          d={`M ${radius}, ${radius}
             A ${radius},${radius} 0 0,1 ${radius * 2},${radius}
             L ${radius},${radius}`}
          stroke="#3498db"
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeDasharray}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          transform={`rotate(45, ${radius}, ${radius})`}
        />
      </Svg>
      <Text style={{ marginTop: 10 }}>
        {Math.round((progress / total) * 100)}%
      </Text>
    </View>
  );
};

export default SemiCircleProgressBar;