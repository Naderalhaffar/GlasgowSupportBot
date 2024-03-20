import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from '../App';
import ChatBox from '../ChatBox';
import ChatHistory from '../ChatHistory';
import '@testing-library/jest-dom';


// Mock scrollIntoView for the test environment
Element.prototype.scrollIntoView = jest.fn();

// Mock Axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { response: 'Mocked response' } })),
}));

const mockChat = {
  id: 1,
  messages: [
    { text: 'Hello', sender: 'user' },
    { text: 'Hi, how can I help you?', sender: 'ai' },
  ],
};

beforeEach(() => {
  // Clear localStorage
  localStorage.clear();
  // Reset all mocks
  jest.clearAllMocks();
});


// Tests for ChatBox component
describe('ChatBox Component', () => {
  test('renders ChatBox correctly with welcome message when no messages are present', () => {
    // Assuming the activeChat prop is passed as an object with an empty messages array
    // to simulate the scenario of no messages being present in the chat.
    const activeChatWithNoMessages = { id: 1, messages: [] };
    render(<ChatBox activeChat={activeChatWithNoMessages} readOnly={false} />);
    // Check for the welcome message
    expect(screen.getByText(/Welcome to the chat!/i)).toBeInTheDocument();
    expect(screen.getByText(/Type your message below and press enter to start the conversation./i)).toBeInTheDocument();
  });

  test('sends a new message and receives a reply', async () => {
    const userMessage = 'Test message';
    const aiResponse = 'This is a response from AI.';
    
    // Mocking axios post response
    axios.post.mockResolvedValue({ data: { response: aiResponse } });
    
    render(<ChatBox activeChat={mockChat} readOnly={false} />);
    
    // Simulate sending a message
    userEvent.type(screen.getByRole('textbox'), userMessage);
    userEvent.click(screen.getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(screen.getByText(userMessage)).toBeInTheDocument();
      expect(screen.getByText(aiResponse)).toBeInTheDocument();
    });
  });
});


// Tests for App component
describe('App Component', () => {
  test('renders the App and navigates through components', () => {
    render(<App />);
    expect(screen.getByText(/Please select a chat from the history or start a new chat./i)).toBeInTheDocument();
    
    // Navigation to FAQ and Documentation
    userEvent.click(screen.getByText(/FAQ/i));
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Documentation/i));
    expect(screen.getByRole('link', { name: /documentation/i })).toBeInTheDocument();

  });
  

});


