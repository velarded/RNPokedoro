// components/CustomText.js
import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ style, ...props }) => {
  return (
    <Text
      style={[{ fontFamily: 'VT323' }, style]}
      {...props}
    />
  );
};

export default CustomText;