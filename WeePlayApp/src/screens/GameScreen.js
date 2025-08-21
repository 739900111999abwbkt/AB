import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// For simplicity, we'll define shapes here. In a real app, these could be images.
const SHAPES = [
  { name: 'circle', color: 'blue' },
  { name: 'square', color: 'red' },
  { name: 'triangle', color: 'green' },
];

// A simple shuffle function
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const GameScreen = ({ childProfile, onGameEnd }) => {
  const [targetShape, setTargetShape] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const MAX_LEVELS = 5;

  // Function to set up a new level
  const setupLevel = () => {
    const shuffledShapes = shuffle(SHAPES);
    const currentTarget = shuffledShapes[0];
    setTargetShape(currentTarget);
    setOptions(shuffle(SHAPES)); // Show all shapes as options
    setLevel(prev => prev + 1);
  };

  useEffect(() => {
    setupLevel();
  }, []); // Run once on mount

  const handleOptionPress = (selectedShape) => {
    if (selectedShape.name === targetShape?.name) {
      setScore(prev => prev + 10);
      Alert.alert('Correct!', 'Great job!');

      if (level >= MAX_LEVELS) {
        // Pass score back and let parent component handle saving and navigation
        onGameEnd({ score: score + 10, time: 0 }); // time is not implemented yet
      } else {
        setupLevel();
      }
    } else {
      Alert.alert('Try Again!', 'That\'s not the right shape.');
      setScore(prev => prev > 0 ? prev - 5 : 0); // Don't go below zero
    }
  };

  if (!targetShape) {
    return <View style={styles.container}><Text>Loading Game...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the Shape!</Text>
      <Text style={styles.score}>Score: {score}</Text>

      <View style={styles.targetContainer}>
        <Text style={styles.instruction}>Find this shape:</Text>
        {/* Target Shape Outline */}
        <View style={[styles.shape, styles[targetShape.name], { borderColor: targetShape.color, borderWidth: 4, backgroundColor: 'transparent' }]} />
      </View>

      <View style={styles.optionsContainer}>
        {options.map(shape => (
          <TouchableOpacity key={shape.name} onPress={() => handleOptionPress(shape)}>
            <View style={[styles.shape, styles[shape.name], { backgroundColor: shape.color }]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  score: { fontSize: 20, marginBottom: 20 },
  instruction: { fontSize: 18, marginBottom: 10 },
  targetContainer: { height: 150, justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginTop: 30 },
  shape: { width: 80, height: 80 },
  circle: { borderRadius: 40 },
  square: { borderRadius: 0 },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // The borderBottomColor will be set by the style prop
  },
});

export default GameScreen;
