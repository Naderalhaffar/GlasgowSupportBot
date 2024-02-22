import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBox from '../ChatBox';
import axios from 'axios';

// Mocking axios
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { response: 'Mocked response' } })),
  }));

  window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('ChatBox Component Tests', () => {
  const initialMessages = [
    { text: 'Hello, World!', sender: 'user' },
    { text: 'How can I assist you today?', sender: 'ai' },
  ];

  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders messages from activeChat', () => {
    const { getByText } = render(<ChatBox activeChat={{ messages: initialMessages }} readOnly={false} />);

    // Check if initial messages are rendered
    expect(getByText('Hello, World!')).toBeInTheDocument();
    expect(getByText('How can I assist you today?')).toBeInTheDocument();
  });

// Corrected placeholder text in test cases

test('sends a user message and receives an AI response', async () => {
    axios.post.mockResolvedValueOnce({ data: { response: 'This is an AI response.' } });
  
    const { getByPlaceholderText, getByText, findByText } = render(<ChatBox activeChat={{ messages: [] }} readOnly={false} />);
  
    fireEvent.change(getByPlaceholderText('Type your Query here...'), { target: { value: 'User message' } });
    fireEvent.click(getByText('Send'));
  
    await findByText('This is an AI response.');
  
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/ask', { prompt: 'User message' });
  });
  
  
  
  test('handles error when sending a message', async () => {
    // Mock Axios to reject the promise simulating a network error
    axios.post.mockRejectedValueOnce(new Error('Network Error'));
  
    const { getByPlaceholderText, findByText } = render(<ChatBox activeChat={{ messages: [] }} readOnly={false} />);
  
    // Simulate user typing a message
    fireEvent.change(getByPlaceholderText('Type your Query here...'), { target: { value: 'User message' } });
  
    // Simulate pressing Enter to send the message
    fireEvent.keyPress(getByPlaceholderText('Type your Query here...'), { key: 'Enter', code: 13, charCode: 13 });
  
    // Await the asynchronous display of the error message
    const errorMessage = await findByText('Error getting response.');
  
    expect(errorMessage).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/ask', { prompt: 'User message' });
  });
  
  
});
