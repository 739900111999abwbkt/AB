import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'WeePlayApp:users';
const CHILDREN_KEY = 'WeePlayApp:children';

// A simple ID generator
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- User (Parent) Functions ---

const getUsers = async () => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (e) {
    console.error('Failed to fetch users.', e);
    return [];
  }
};

export const registerParent = async (name, email, password) => {
  if (!name || !email || !password) throw new Error('All fields are required.');
  const users = await getUsers();
  if (users.find(user => user.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = { id: generateId(), name, email, password, children: [] };
  const updatedUsers = [...users, newUser];
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  return newUser;
};

export const loginParent = async (email, password) => {
  if (!email || !password) throw new Error('Email and password are required.');
  const users = await getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password.');
  return user;
};

// --- Child Profile Functions ---

const getChildren = async () => {
  try {
    const childrenJson = await AsyncStorage.getItem(CHILDREN_KEY);
    return childrenJson ? JSON.parse(childrenJson) : [];
  } catch (e) {
    console.error('Failed to fetch children.', e);
    return [];
  }
};

export const addChildProfile = async (parentId, childData) => {
  const { name, age, avatar } = childData;
  if (!name || !age || !avatar) throw new Error('All child fields are required.');

  const newChild = { id: generateId(), parentId, name, age, avatar, progress: {} };

  const allChildren = await getChildren();
  const updatedChildren = [...allChildren, newChild];

  const allUsers = await getUsers();
  const parentIndex = allUsers.findIndex(u => u.id === parentId);
  if (parentIndex === -1) throw new Error('Parent not found.');
  allUsers[parentIndex].children.push(newChild.id);

  await AsyncStorage.setItem(CHILDREN_KEY, JSON.stringify(updatedChildren));
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  return newChild;
};

export const getChildProfiles = async (parentId) => {
  const allChildren = await getChildren();
  return allChildren.filter(child => child.parentId === parentId);
};

// --- Game Progress Functions ---

export const saveGameResult = async (childId, gameName, result) => {
  const allChildren = await getChildren();
  const childIndex = allChildren.findIndex(c => c.id === childId);
  if (childIndex === -1) throw new Error('Child not found.');

  allChildren[childIndex].progress = {
    ...allChildren[childIndex].progress,
    [gameName]: result,
  };

  await AsyncStorage.setItem(CHILDREN_KEY, JSON.stringify(allChildren));
  return allChildren[childIndex];
};
