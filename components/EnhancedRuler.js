import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

const EnhancedRuler = ({
  minValue = 0,
  maxValue = 100,
  step = 1,
  width = Dimensions.get('window').width,
  height = 120,
  segmentWidth = 40,
  indicatorColor = 'red',
  initialValue = 50,
  onValueChange,
}) => {
  const scrollViewRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [contentOffset, setContentOffset] = useState(0);

  const totalSegments = Math.ceil((maxValue - minValue) / step);
  const centerOffset = (width / 2) - (segmentWidth / 2);
  const rulerWidth = (totalSegments + 1) * segmentWidth + centerOffset*2;

  // Initialize scroll position
  useEffect(() => {
    const initialScrollX = ((initialValue - minValue) / step) * segmentWidth - centerOffset;
    scrollViewRef.current?.scrollTo({ x: initialScrollX, animated: false });
  }, [initialValue]);

    const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setContentOffset(offsetX);
    
    // Calculate the exact segment
    const segment = Math.round(offsetX / segmentWidth);
    const value = Math.min(maxValue, Math.max(minValue, minValue + segment * step));
    
    setSelectedValue(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const renderSegments = () => {
    const segments = [];
    console.log('min value: ', minValue);
    console.log('max value: ', maxValue);
    console.log('ruler width: ', rulerWidth);
    console.log('total segments: ', totalSegments);
    for (let i = 0; i <= totalSegments; i++) {
      const value = minValue + i * step;
      const isMajorTick = value % (step * 5) === 0;
      const isSelected = i === selectedValue;
    //   const backgroundColour = i % 2 == 0 ? 'red' : 'blue';

      segments.push(
        <View key={`segment-${i}`} style={[styles.segment, { width: segmentWidth }]}>
          {isMajorTick && (
            <Text style={styles.tickLabel}>{value}</Text>
          )}
          <View style={[
            styles.tick,
            {
              height: isMajorTick ? 30 : 20,
              backgroundColor: isSelected ? indicatorColor : (isMajorTick ? '#333' : '#999'),
            }
          ]} />
        </View>
      );
    }
    return segments;
  };

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: rulerWidth,
          paddingHorizontal: centerOffset
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={segmentWidth}
        decelerationRate="fast"
      >
        {renderSegments()}
      </ScrollView>
      
      {/* Indicator line that perfectly matches ticks */}
      {/* <View style={[styles.indicatorLine, { left: width / 2 - 1 }]} /> */}
      
      {/* Arrow and value indicator */}
      <View style={[styles.indicatorContainer, { left: width / 2 }]}>
        <View style={[styles.arrow, { borderTopColor: indicatorColor }]} />
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{selectedValue}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    position: 'relative',
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tick: {
    width: 2,
    marginTop: 5,
  },
  tickLabel: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  indicatorLine: {
    position: 'absolute',
    height: 40,
    width: 2,
    backgroundColor: 'red',
    top: 20,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    transform: [{ translateX: -15 }],
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  valueBox: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default EnhancedRuler;