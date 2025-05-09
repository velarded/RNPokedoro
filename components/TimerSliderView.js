import React from 'react';
import { View, Text } from 'react-native';
import EnhancedRuler from "./EnhancedRuler";

const TimerSliderView = () => {
    const [value, setValue] = React.useState(0);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <EnhancedRuler
          minValue={0}
          maxValue={40}
          step={1}
          initialValue={0}
          onValueChange={setValue}
        />
      </View>
    );
  };
  
  export default TimerSliderView;