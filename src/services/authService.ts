import { User } from '../types';

// Mock auth service - in production would connect to your Golang backend
export const loginUser = async (email: string, password: string): Promise<User> => {
  // In a real app, this would make a fetch/axios call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Demo User',
        email,
      });
    }, 500);
  });
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  // In a real app, this would make a fetch/axios call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name,
        email,
      });
    }, 500);
  });
};

export const logoutUser = async (): Promise<void> => {
  // In a real app, this would make a fetch/axios call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

export const getCurrentUser = async (): Promise<User | null> => {
  // In a real app, this would make a fetch/axios call to your API
  return new Promise((resolve) => {
    // Simulate checking local storage or cookies for a token and returning user
    setTimeout(() => {
      resolve(null); // Return null to simulate not logged in
    }, 500);
  });
};