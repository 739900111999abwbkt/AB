import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddChildScreen = ({ onAddChild, onGoBack }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState('default_avatar'); // For now, a string

  const handleAdd = () => {
    if (!name || !age) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    onAddChild({ name, age, avatar });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Child</Text>
      <TextInput
        style={styles.input}
        placeholder="Child's Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Child's Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      {/* Avatar selection could be a grid of images here */}
      <Button title="Add Child" onPress={handleAdd} />
      <Button title="Back to Dashboard" onPress={onGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddChildScreen;
