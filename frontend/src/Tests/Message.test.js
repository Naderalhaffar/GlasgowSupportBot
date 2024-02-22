import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../Message'; // Adjust the import path as needed

describe('Message Component', () => {
  test('correctly displays user messages', () => {
    const userText = 'This is a user message.';
    render(<Message text={userText} sender="user" />);

    // Verify that the text is present in the document.
    expect(screen.getByText(userText)).toBeInTheDocument();

    // Verify that the correct avatar is used for a user message.
    const userImage = screen.getByRole('img', { name: /user/i });
    expect(userImage).toHaveAttribute('src', expect.stringContaining('/user.png'));
  });

  test('correctly displays AI messages', () => {
    const aiText = 'This is an AI response.';
    render(<Message text={aiText} sender="ai" />);

    // Verify that the text is present in the document.
    expect(screen.getByText(aiText)).toBeInTheDocument();

    // Verify that the correct avatar is used for an AI message.
    const aiImage = screen.getByRole('img', { name: /ai/i });
    expect(aiImage).toHaveAttribute('src', expect.stringContaining('/Universitylogo.jpg'));
  });

  test('renders clickable links in messages', () => {
    const linkText = 'Check this out: https://example.com';
    render(<Message text={linkText} sender="user" />);

    // Since dangerouslySetInnerHTML is used to render the link, we need to check the document's HTML.
    const messageHTML = screen.getByRole('link', { name: 'https://example.com' }).outerHTML;
    expect(messageHTML).toContain('<a href="https://example.com"');

    // Verify that the link is correctly rendered and clickable.
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });
});
