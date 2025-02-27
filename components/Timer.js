import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SemiCircleProgressBar from './SemiCircleProgressBar'; // Adjust the path as necessary

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [interval, setIntervalId] = useState(null);

  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);

  const startTimer = () => {
    setIntervalId(setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000));
  };

  const stopTimer = () => {
    clearInterval(interval);
  };

  return (
    <View style={styles.container}>
      <SemiCircleProgressBar progress={seconds} total={60} />
      <TouchableOpacity onPress={seconds === 0 ? startTimer : stopTimer}>
        <Text style={styles.icon}>{/* Insert your icon here */}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    fontSize: 50,
  },
};

export default Timer;