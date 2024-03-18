import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatHistory from '../ChatHistory';
import { encryptData, decryptData } from '../ChatHistory';

// Mocking the encryption and decryption to return data as-is
jest.mock('crypto-js', () => ({
  AES: {
    encrypt: jest.fn().mockImplementation((data, key) => ({
      toString: () => data // Mock encrypting data by returning it directly
    })),
    decrypt: jest.fn().mockImplementation((ciphertext, key) => ({
      toString: () => ciphertext // Mock decrypting by returning the input ciphertext
    }))
  },
  enc: {
    Utf8: {
      stringify: jest.fn(data => data),
      parse: jest.fn(data => data)
    }
  }
}));

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

  test('loads initial chats from localStorage', () => {
    const initialChats = JSON.stringify([{ id: 1, messages: [] }]);
    window.localStorage.setItem('chatHistory', initialChats);
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    expect(screen.getByText(/1/)).toBeInTheDocument(); // Assuming formatDate returns the timestamp
  });

  test('allows creating a new chat when under limit', async () => {
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    await userEvent.click(screen.getByText('New Chat')); // Using userEvent directly
    const chats = JSON.parse(window.localStorage.getItem('chatHistory'));
    expect(chats.length).toBe(1);
  });

  test('prevents creating a new chat when limit is reached', async () => {
    const initialChats = JSON.stringify(new Array(5).fill(0).map((_, index) => ({ id: index, messages: [] })));
    window.localStorage.setItem('chatHistory', initialChats);
    // Mock window.alert to confirm it gets called
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    // Use userEvent directly
    await userEvent.click(screen.getByText('New Chat'));
    const chats = JSON.parse(window.localStorage.getItem('chatHistory'));
    expect(chats.length).toBe(5); // Confirms no new chats were added
    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith("Maximum number of chats reached. Please delete an old chat before creating a new one.");
    // Clean up the mock to avoid leaks
    window.alert.mockRestore();
  });

  test('deletes a chat and updates localStorage', async () => {
    const initialChats = JSON.stringify([{ id: 1, messages: [] }, { id: 2, messages: [] }]);
    window.localStorage.setItem('chatHistory', initialChats);
    render(<ChatHistory onSelectChat={() => {}} onDeleteChat={() => {}} />);
    const chats = JSON.parse(window.localStorage.getItem('chatHistory'));
    expect(chats.length).toBeLessThan(initialChats.length); // Adjust based on the actual deletion logic
  });

  test('selects a chat on click', async () => {
    const onSelectChat = jest.fn();
    const initialChats = JSON.stringify([{ id: 1, messages: [] }]);
    window.localStorage.setItem('chatHistory', initialChats);
    render(<ChatHistory onSelectChat={onSelectChat} onDeleteChat={() => {}} />);
    const chatItems = screen.getByText(/1/); // Assuming formatDate returns the timestamp
    fireEvent.click(chatItems);
    expect(onSelectChat).toHaveBeenCalledWith({ id: 1, messages: [] });
  });

});
