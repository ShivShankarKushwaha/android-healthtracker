import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CustomProgress = ({target, percentage }) => {
  console.log('target',target,'percentage',percentage);
  // Calculate the angle based on the percentage
  if(!percentage)
  {
    percentage=0;
  }
  var angle = (percentage / target) * 360;
  if(percentage>=target)
  {
    angle=360;
  }
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * 35; // 35 is the radius

  return (
    <View style={styles.container}>
      <Svg width="80" height="80">
        {/* Background Circle */}
        <Circle
          cx="40"
          cy="40"
          r="35"
          stroke="#ccc"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress Arc */}
        <Circle
          cx="40"
          cy="40"
          r="35"
          stroke="#007AFF"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={circumference - (angle / 360) * circumference}
          strokeLinecap="round"
        />
      </Svg>
      {<Text style={styles.text}>{parseInt(percentage*100/target)}%</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10, // Add margin for spacing between circular bars
  },
  text: {
    fontSize: 16, // Reduce the text size
    fontWeight: 'bold',
    marginTop: 5, // Adjust the margin for text positioning
  },
});

export default CustomProgress;
