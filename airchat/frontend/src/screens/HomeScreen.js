import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Layout from '../components/Layout';

const HomeScreen = ({ navigation }) => {
  return (
    <Layout>
      <Text style={styles.title}>Welcome to AirChat</Text>
      <Button
        title="Join a Room"
        onPress={() => navigation.navigate('RoomList')}
      />
      <View style={styles.separator} />
      <Button
        title="Create a Room"
        onPress={() => navigation.navigate('CreateRoom')}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 10,
  },
});

export default HomeScreen;
