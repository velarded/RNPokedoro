import React from 'react';
import { View, StyleSheet } from 'react-native';

const TimerBackgroundView = ({ timerIsActive }) => {
  console.log(timerIsActive);
  return (
    <View style={styles.container}>
      {/* Top Section (45%) */}
      <View style={[styles.section, timerIsActive ? styles.topSectionTimerActive : styles.topSection]} />

      {/* Middle Section (10%) */}
      <View style={[styles.section, timerIsActive ? styles.middleSectionTimerActive : styles.middleSection]} />

      {/* Bottom Section (45%) */}
      <View style={[styles.section, timerIsActive ? styles.bottomSectionTimerActive : styles.bottomSection]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up 100% of the parent's width and height
    flexDirection: 'column', // Arrange children vertically
  },
  section: {
    width: '100%', // Each section takes up 100% of the container's width
  },
  topSection: {
    flex: 0.495, // Takes up 45% of the container's height
    backgroundColor: '#68A0A0', 
  },
  topSectionTimerActive: {
    flex: 0.495, 
    backgroundColor: '#385656', 
  },
  middleSection: {
    flex: 0.01, // Takes up 10% of the container's height
    backgroundColor: '#B9D6D6', 
  },
  middleSectionTimerActive: {
    flex: 0.01, // Takes up 10% of the container's height
    backgroundColor: '#95BDBD', 
  },
  bottomSection: {
    flex: 0.495, // Takes up 45% of the container's height
    backgroundColor: '#95BCBC', 
  },
  bottomSectionTimerActive: {
    flex: 0.495, // Takes up 45% of the container's height
    backgroundColor: '#68A0A0', 
  },
});

export default TimerBackgroundView;