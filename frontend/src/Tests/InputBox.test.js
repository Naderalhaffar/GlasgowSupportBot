import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputBox from '../InputBox'; 

describe('InputBox Component', () => {
  test('input field updates state on user input', () => {
    render(<InputBox onSendMessage={() => {}} isAITyping={false} />);

    const inputElement = screen.getByPlaceholderText(/Type your Query here.../i);
    userEvent.type(inputElement, 'Hello, World!');

    expect(inputElement).toHaveValue('Hello, World!');
  });

  test('sends message on "Send" button click', () => {
    const mockSendMessage = jest.fn();
    render(<InputBox onSendMessage={mockSendMessage} isAITyping={false} />);

    const inputElement = screen.getByPlaceholderText(/Type your Query here.../i);
    userEvent.type(inputElement, 'Test message');
    fireEvent.click(screen.getByText(/Send/i));

    expect(mockSendMessage).toHaveBeenCalledWith('Test message');
  });

  test('sends message on "Enter" key press', () => {
    const mockSendMessage = jest.fn();
    render(<InputBox onSendMessage={mockSendMessage} isAITyping={false} />);

    const inputElement = screen.getByPlaceholderText(/Type your Query here.../i);
    userEvent.type(inputElement, 'Test message{enter}');

    expect(mockSendMessage).toHaveBeenCalledWith('Test message');
  });

  test('"Send" button is disabled when isAITyping is true', () => {
    render(<InputBox onSendMessage={() => {}} isAITyping={true} />);
  
    // Since the button text changes based on isAITyping, we should check for "Typing..." instead of "Send"
    const sendButton = screen.getByText('Typing...');
  
    // Now we're correctly expecting the button to be disabled when isAITyping is true
    expect(sendButton).toBeDisabled();
  });
  
});
