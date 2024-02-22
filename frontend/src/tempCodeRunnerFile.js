
    };
    const { findByText } = render(<ChatBox activeChat={activeChat} readOnly={false} />);
    const userMessage = await findByText(/Hello/i);
    const aiMessage = await findByText(/Hi, how can I help you?/i);
