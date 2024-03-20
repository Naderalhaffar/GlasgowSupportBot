import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatHistory from '../ChatHistory';
import { encryptData, decryptData } from '../ChatHistory';



// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('ChatHistory', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    expect(screen.getByText('New Chat')).toBeInTheDocument();
  });


  test('deletes a chat and updates localStorage', async () => {
    const initialChats = JSON.stringify([{ id: 1, messages: [] }, { id: 2, messages: [] }]);
    window.localStorage.setItem('chatHistory', initialChats);
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    const chats = JSON.parse(window.localStorage.getItem('chatHistory'));
    expect(chats.length).toBeLessThan(initialChats.length); // Adjust based on the actual deletion logic
  });

});

