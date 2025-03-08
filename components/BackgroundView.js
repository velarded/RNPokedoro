import React from 'react';
import { View, StyleSheet } from 'react-native';

const BackgroundView = () => {
  return (
    <View style={styles.container}>
      {/* Top Section (45%) */}
      <View style={[styles.section, styles.topSection]} />

      {/* Middle Section (10%) */}
      <View style={[styles.section, styles.middleSection]} />

      {/* Bottom Section (45%) */}
      <View style={[styles.section, styles.bottomSection]} />
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
    backgroundColor: '#68A0A0', // Example color
  },
  middleSection: {
    flex: 0.01, // Takes up 10% of the container's height
    backgroundColor: '#B9D6D6', // Example color
  },
  bottomSection: {
    flex: 0.495, // Takes up 45% of the container's height
    backgroundColor: '#95BCBC', // Example color
  },
});

export default BackgroundView;