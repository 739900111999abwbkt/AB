/**
 * @file UserProfileModels.js
 *
 * This file defines the data structures for user profiles in the WeePlayApp.
 * Since we are using AsyncStorage, these are not formal schemas, but rather
 * documentation for the shape of the objects we will be storing.
 */

/**
 * Represents a Parent user.
 * This object would be stored in AsyncStorage, likely in an array of all parents.
 * The password should be handled with care. In a real app, it would be hashed.
 */
export const ParentProfile = {
  id: 'uuid-string', // Unique identifier for the parent
  name: 'string',
  email: 'string (unique)',
  password: 'string', // Stored as plain text for this simple local-only version
  children: ['child-uuid-1', 'child-uuid-2'], // Array of child IDs
};

/**
 * Represents a Child profile, linked to a Parent.
 * This object would be stored in AsyncStorage, likely in an array of all children.
 */
export const ChildProfile = {
  id: 'uuid-string', // Unique identifier for the child
  parentId: 'uuid-string', // The ID of the parent this child belongs to
  name: 'string',
  age: 'number',
  avatar: 'string', // Could be a name of a local asset or a color code
  progress: {
    // Game-specific progress would go here
    // e.g., 'shape-puzzle': { score: 100, level: 5 }
  },
};
