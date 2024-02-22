import React from 'react';
import { Link } from 'react-router-dom';
import './Documentation.css'; 

const Documentation = () => {
  return (
    <div className="documentation-container">
      <header className="documentation-header">
        <h1>GlasgowSupportBot Documentation</h1>
      </header>

      <section className="overview-section">
        <h2>Overview</h2>
        <p>The Glasgow Support Bot is designed to assist students of the University of Glasgow by providing quick and easy access to information about support services. This tool aims to simplify the process of finding information about various services such as disability support, mental health resources, academic assistance, and more.</p>
      </section>

      <section className="support-services-section">
        <h2>Support Services Covered</h2>
        <ul>
          <li>The Disability Service</li>
          <li>Good Cause</li>
          <li>International Students</li>
          <li>Mental Health Services and Information</li>
          <li>Peer Wellbeing Support</li>
          <li>Student Parents</li>
          <li>Study Support</li>
          <li>University of Glasgow Careers Service</li>
          <li>Uofg Helpdesk</li>
        </ul>
      </section>

      <section className="installation-setup-section">
        <h2>Installation and Setup</h2>
        <div className="code-container">
          <h3>Clone the Repository</h3>
          <code>git clone &lt;repository_url&gt;</code>
          
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

      <section className="additional-info-section">
        <h2>Additional Information</h2>
        <p>For any additional information or support, reach out through the provided contact channels or consult the FAQ section on the University of Glasgow's website.</p>
      </section>

      <footer className="documentation-footer">
        <Link to="/" className="back-to-chat-link">Back to Chat</Link>
      </footer>
    </div>
  );
};

export default Documentation;
