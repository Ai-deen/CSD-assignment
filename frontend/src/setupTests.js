// Create a file setupTests.js in your src folder (if not already present)
// Jest will automatically run this file before your tests
// src/setupTests.js
// src/setupTests.js
import '@testing-library/jest-dom/extend-expect';
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  
global.localStorage = localStorageMock;
  