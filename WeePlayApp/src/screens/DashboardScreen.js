import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getChildProfiles } from '../utils/storage';

const DashboardScreen = ({ user, onLogout, onNavigateToAddChild, onSelectChild }) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const loadChildren = async () => {
      if (user) {
        const childProfiles = await getChildProfiles(user.id);
        setChildren(childProfiles);
      }
    };
    loadChildren();
  }, [user]); // Reload when user changes

  const renderChild = ({ item }) => (
    <TouchableOpacity style={styles.childItem} onPress={() => onSelectChild(item)}>
      <Text style={styles.childName}>{item.name}</Text>
      <Text>Age: {item.age}</Text>
      {item.progress && item.progress['shape-puzzle'] && (
        <Text style={styles.progressText}>
          Shape Puzzle Score: {item.progress['shape-puzzle'].score}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}!</Text>

      <Text style={styles.subtitle}>Your Children:</Text>
      <FlatList
        data={children}
        renderItem={renderChild}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No children added yet.</Text>}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Child" onPress={onNavigateToAddChild} />
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  list: {
    width: '100%',
    flexGrow: 0,
    maxHeight: '60%',
  },
  childItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default DashboardScreen;
