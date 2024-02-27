import React from 'react';
import './Documentation.css'; 

const Documentation = () => {
  return (
    <div className="documentation-container">
      <header className="documentation-header">
        <h1>GlasgowSupportBot Documentation</h1>
      </header>

      <section className="user-guide-section">
        <h2>User Guide</h2>
        <p>Welcome to the <strong>GlasgowSupportBot</strong>, your virtual assistant for navigating the University of Glasgow's support services. This guide will help you make the most of the chatbot's features, ensuring you find the support and answers you need efficiently.</p>
        
        <h3>Getting Started</h3>
        <p>To begin interacting with GlasgowSupportBot, simply access the app and head to the support service page. Here, you'll find a chat interface ready for your queries.</p>
        
        <h3>Chat Interface</h3>
        <ul>
          <li><strong>Asking Questions:</strong> You can type your question in the chat input area. GlasgowSupportBot is designed to understand and respond to a wide range of queries related to University support services.</li>
          <li><strong>Supported Topics:</strong> The bot covers various topics, including disability support, mental health resources, academic assistance, and more. For a smoother experience, visit the FAQ page to see a list of commonly asked questions and their answers.</li>
        </ul>
        
        <h3>Features</h3>
        <ul>
          <li><strong>Export Chat:</strong> Need to save a copy of your conversation? Use the export chat feature to download the chat as a .txt file, allowing you to keep a record of the information provided.</li>
          <li><strong>Chat History:</strong> GlasgowSupportBot supports up to 6 concurrent chats, allowing you to manage multiple inquiries simultaneously. Your chats are preserved using local storage, ensuring you can pick up right where you left off, even if you close the app.</li>
          <li><strong>Multilingual Support:</strong> The chatbot can interact in six different languages: English, Spanish, Portuguese, French, Chinese, and Arabic.</li>
          <li><strong>Processing Queries:</strong> GlasgowSupportBot is designed to handle one query at a time. While processing your question, you'll see a "typing..." indicator in place of the send button, signifying that your answer is on its way.</li>
        </ul>
        
        <h3>Limitations</h3>
        <p>Please note that while GlasgowSupportBot is a powerful tool for accessing support information, it may not be able to address every specific question or concern. For queries beyond the bot's scope, we recommend reaching out through the provided contact channels for personalized assistance.</p>
        
        <h3>Privacy and Security</h3>
        <p>Your interactions with GlasgowSupportBot are confidential. We prioritize your privacy and security, ensuring that your chats are stored securely and only accessible to you.</p>
        

      </section>
      

      <section className="installation-setup-section">
        <h2>Installation and Setup</h2>
        <div className="code-container">
          <h3>Clone the Repository</h3>
          <code>git clone &lt;https://github.com/Naderalhaffar/GlasgowSupportBot.git&gt;</code>
          
          <h3>Create and Activate a Virtual Environment</h3>
          <p><strong>For Windows using Anaconda:</strong></p>
          <code>conda create --name GlasgowSupportBot</code>
          <code>conda activate GlasgowSupportBot</code>
          <p><strong>Without Anaconda (Windows/Linux/Mac):</strong></p>
          <code>python -m venv GlasgowSupportBot</code>
          <code>GlasgowSupportBot\Scripts\activate # Windows</code>
          <code>source GlasgowSupportBot/bin/activate # Linux/Mac</code>
          
          <h3>Backend Setup</h3>
          <p>Navigate to the backend directory and install dependencies:</p>
          <code>cd backend</code>
          <code>pip install -r requirements.txt</code>
          
          <h3>Frontend Setup</h3>
          <p>Navigate to the frontend directory in a new terminal window and install dependencies:</p>
          <code>cd frontend</code>
          <code>npm install</code>
          
          <h3>Launching the Application</h3>
          <p>Start the backend service:</p>
          <code>python app.py</code>
          <p>In a new terminal, start the frontend service:</p>
          <code>npm start</code>
          <p>The application should now be running and accessible in your web browser.</p>
        </div>
      </section>
      
      <section className="testing-section">
        <h2>Testing</h2>
        <p>This section describes how to run tests for both the backend and frontend components of the Glasgow Support Bot to ensure everything is working correctly.</p>
        
        <h3>Backend Testing with Pytest</h3>
        <p>To run tests on the backend, you should stay in the backend directory. This part of the application comes with a suite of tests to verify the functionality of the support bot's backend services. To execute these tests, use the following command:</p>
        <code>pytest</code>
        <p>This command will automatically find and run all tests within the backend directory. You should see output indicating the number of tests passed, failed, and possibly skipped.</p>
        
        <h3>Frontend Testing</h3>
        <p>For testing the frontend, you need to navigate to the specific tests directory inside the frontend part of the application. These tests are designed to ensure that the user interface behaves as expected and interacts correctly with the backend services.</p>
        <p>First, ensure you are in the root directory of the Glasgow Support Bot, then move to the frontend tests directory:</p>
        <code>cd frontend/src/Tests</code>
        <p>Once in the correct directory, you can run the frontend tests using the following command:</p>
        <code>npm test</code>
        <p>This command will start the test runner in interactive watch mode and execute all .js test files located in the Tests directory. It will provide feedback on which tests have passed or failed, allowing you to ensure that the frontend of the Glasgow Support Bot is functioning correctly.</p>
        <p>Make sure you have installed all necessary dependencies as described in the installation section before running these tests. This ensures that both the backend and frontend environments are correctly set up for testing.</p>
      </section>
  

      <section className="libraries-section">
        <h2>Libraries</h2>
        <p>The journey of developing the Glasgow Support Bot was made easier thanks to the tools and libraries the open-source community provides:</p>
        <ul>
          <li><strong>React</strong>: For powering the frontend of our application with its efficient, declarative, and flexible JavaScript library.</li>
          <li><strong>Flask</strong>: A lightweight WSGI web application framework used to serve our backend services with ease and flexibility.</li>
          <li><strong>LangChain</strong>: For its comprehensive natural language processing and machine learning capabilities that greatly enhanced our bot's understanding and processing of textual data.</li>
          <li><strong>OpenAI Embeddings</strong>: Leveraged for generating advanced language model embeddings, enhancing our bot's ability to deliver relevant and accurate responses.</li>
          <li><strong>Chroma Vector Store</strong>: Enabled efficient similarity searches and relevance scoring, making our bot's response system quick and pertinent.</li>
        </ul>
      </section>

      <section className="troubleshooting-section">
        <h2>Troubleshooting Tips</h2>
        <p>While interacting with the GlasgowSupportBot, you might encounter situations where the bot does not immediately understand the flow of the conversation or seems to miss the context of your queries. Here are some tips to help you navigate these moments effectively:</p>
        
        <ul>
          <li><strong>Patience is Key:</strong> After submitting your query, please wait a moment before refreshing the page. This ensures that your data is saved and the bot has enough time to process your request.</li>
          <li><strong>Be Precise:</strong> If the bot doesn't seem to grasp the context of your conversation, try to be more precise with your queries. Clarity helps the bot to understand and respond more accurately to your needs.</li>
          <li><strong>Use Relevant Keywords:</strong> The bot is trained on specific keywords related to your queries. If you're not getting the expected response, try rephrasing your question with different keywords that closely match the topic you're inquiring about.</li>
        </ul>
        
      </section>

      <section className="feedback-section">
        <h2>Feedback</h2>
        <p>We continuously strive to improve GlasgowSupportBot and value your feedback. If you encounter any issues or have suggestions for enhancements, please let us know. There are two ways to provide feedback:</p>
        
        <ul>
          <li><strong>Support Button:</strong> For immediate assistance or to report a problem, click the "Report Issue" button located at the bottom right of the app. Simply describe the issue you're facing, and your feedback will be directly emailed to our support team. We aim to address and resolve issues promptly to enhance your experience.</li>
          <li><strong>Email:</strong> Alternatively, you can contact us at <a href="mailto:glasgowsuppbot@gmail.com">glasgowsuppbot@gmail.com</a>. This is our official email, and we welcome any comments, questions, or feedback you may have. We eill review the feedback to ensure the GlasgowSupportBot meets your needs and expectations.</li>
        </ul>

        <p>Your input is invaluable in helping us refine and improve our service. Thank you for taking the time to share your thoughts and for helping us make GlasgowSupportBot better for everyone.</p>
      </section>
    
    </div>
  );
};

export default Documentation;
