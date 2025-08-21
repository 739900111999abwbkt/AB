import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddChildScreen from './src/screens/AddChildScreen';
import GameScreen from './src/screens/GameScreen';
import { loginParent, registerParent, addChildProfile, saveGameResult } from './src/utils/storage';

const App = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard', 'addChild', 'game'
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const user = await loginParent(email, password);
      setCurrentUser(user);
      setCurrentView('dashboard');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const user = await registerParent(name, email, password);
      setCurrentUser(user);
      setCurrentView('dashboard');
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveChild(null);
    setCurrentView('login');
  };

  const handleAddChild = async (childData) => {
    if (!currentUser) {
      Alert.alert('Error', 'You must be logged in to add a child.');
      return;
    }
    try {
      await addChildProfile(currentUser.id, childData);
      setCurrentView('dashboard');
    } catch (error) {
      Alert.alert('Failed to Add Child', error.message);
    }
  };

  const handleSelectChild = (child) => {
    setActiveChild(child);
    setCurrentView('game');
  };

  const handleGameEnd = async (result) => {
    if (!activeChild) return;
    try {
      await saveGameResult(activeChild.id, 'shape-puzzle', result);
      Alert.alert('Puzzle Complete!', `Your score was ${result.score}`);
    } catch (error) {
      Alert.alert('Error', 'Could not save your game progress.');
    } finally {
      setActiveChild(null);
      setCurrentView('dashboard');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'register':
        return <RegistrationScreen onRegister={handleRegister} onNavigateToLogin={() => setCurrentView('login')} />;
      case 'dashboard':
        return <DashboardScreen user={currentUser} onLogout={handleLogout} onNavigateToAddChild={() => setCurrentView('addChild')} onSelectChild={handleSelectChild} />;
      case 'addChild':
        return <AddChildScreen onAddChild={handleAddChild} onGoBack={() => setCurrentView('dashboard')} />;
      case 'game':
        return <GameScreen childProfile={activeChild} onGameEnd={handleGameEnd} />;
      case 'login':
      default:
        return <LoginScreen onLogin={handleLogin} onNavigateToRegister={() => setCurrentView('register')} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
