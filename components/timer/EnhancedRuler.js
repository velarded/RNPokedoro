import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, AccessibilityInfo, Platform, Modal } from 'react-native';
import CustomText from '../shared/CustomText';
import Svg, { G, Path } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import CustomButton from '../shared/CustomButton';

const EnhancedRuler = ({
  minValue = 1,
  maxValue = 100,
  step = 1,
  width = Dimensions.get('window').width,
  height = 80,
  segmentWidth = 30,
  indicatorColor = '#fff',
  initialValue = 25,
  onValueChange,
  
}) => {
  const scrollViewRef = useRef(null);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [contentOffset, setContentOffset] = useState(0);

  const totalSegments = (maxValue - minValue) + 1;
  console.log('total segments: ', totalSegments);
  const centerOffset = (width / 2) - (segmentWidth / 2);
  const rulerWidth = (totalSegments) * segmentWidth + centerOffset * 2;

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
    console.log('selectedValue: ', value);
    if (onValueChange) {
      onValueChange(value);
    }
  };
  const onClose = () => {
    console.log('on close');
    setVisible(false);
  };
  const renderSegments = () => {
    const segments = [];
    for (let i = minValue; i <= maxValue; i++) {
      const value = i;
      const isMajorTick = value % (step * 5) === 0;
      const isSelected = i === selectedValue;
      
      segments.push(
        <View key={`segment-${i}`} style={[styles.segment, { width: segmentWidth }]}>
          {isMajorTick && (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row', // Needed for inline content
                flexShrink: 0, // Prevent shrinking
                flexGrow: 0, // Prevent growing
                alignSelf: 'center', // Override parent's alignItems
                width: 60,
              }}>
            <CustomText style={[styles.tickLabel, { color: isSelected ? indicatorColor : '#959595', fontSize: isSelected ? 60 : 45 }]}>{value}</CustomText>
          </View>
          )} 
         {!isMajorTick && (
            <CustomText style={styles.tickLabel}></CustomText>
          )}
          <View style={[
            styles.tick,
            {
              height: isMajorTick ? 45 : isSelected ? 42 : 28,
              backgroundColor: isSelected ? indicatorColor : '#959595',
              width: isSelected ? 9 : isSelected ? 7 : 5,
            }
          ]} />
        </View>
      );
    }
    return segments;
  };

  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
  >
    <BlurView intensity={40} style={styles.absolute}>

    <View style={styles.modalContainer}>
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
      
      {/* Arrow and value indicator */}
      <View style={[styles.indicatorContainer, { left: width / 2 }]}>
        <Svg width="20" height="15" viewBox="0 0 20 15">
            <G>
            <Path d="M9.96393 0.896L4.00056 8.60487V12L16.125 12V8.60487L9.96393 0.896Z" fill="#DE3140" stroke="white" strokeWidth="2.5"/>
            </G>
        </Svg>
      </View>
        </View>
        <CustomButton label='Set' onPress={onClose}/>
    </View>
    </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    modalContainer: {
        flex: 1,
    backgroundColor: 'rgba(5, 5, 5, 0.80)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
  container: {
    height: 170,
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  tick: {
    marginTop: 5,
    borderRadius: 1,
  },
  tickLabel: {
    height: 60,
    fontWeight: 'bold',
  },
  selectedTick: {
    width: 9.5,
    height: 42,
    backgroundColor: '#fff',
  },
  indicatorLine: {
    position: 'absolute',
    height: 120,
    width: 2,
    backgroundColor: 'red',
    top: 20,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -10 }],
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