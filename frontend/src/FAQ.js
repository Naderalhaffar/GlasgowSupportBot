import React from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css'; 

const FAQ = () => {
  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1>FAQ</h1>
        <p>Here you can find answers to frequently asked questions about GlasgowSupportBot and its services.</p>
      </header>
      
      <section className="faq-section">
        <div className="faq-item">
          <h2>What services does GlasgowSupportBot offer?</h2>
          <p>GlasgowSupportBot is your digital assistant, dedicated to providing swift answers about the University of Glasgow's comprehensive support services. This includes guidance on the Disability Service, Good Cause claims, support for International Students, Mental Health Services, Peer Wellbeing Support, assistance for Students with Caring Responsibilities, information for Student Parents, Study Support, and the University of Glasgow Careers Service, among others.</p>
        </div>

        <div className="faq-item">
          <h2>How can I interact with GlasgowSupportBot?</h2>
          <p>Engaging with GlasgowSupportBot is straightforward: simply type your question into the chat interface. Include specific keywords or topics related to your query for more precise assistance. GlasgowSupportBot will then provide you with relevant information or direct you to the appropriate support service.</p>
        </div>

        <div className="faq-item">
          <h2>What should I do if GlasgowSupportBot can't answer my query?</h2>
          <p>Should GlasgowSupportBot fall short in providing the answer you need, visit the University of Glasgow's official website or reach out directly to the specific department. But please be specific with the question you are asking, the bot is only trained on the support service data .</p>
        </div>

        <div className="faq-item">
          <h2>Is GlasgowSupportBot available all the time?</h2>
          <p>Absolutely! GlasgowSupportBot is at your service 24/7, ensuring you have access to information on the University of Glasgow's support services whenever you need it.</p>
        </div>

        <div className="faq-item">
          <h2>How reliable is the information provided by GlasgowSupportBot?</h2>
          <p>GlasgowSupportBot is updated regularly to ensure it offers the most current details on the university's support services. However, for the most up-to-date and comprehensive information, you should always check the official university website or directly contact the relevant department.</p>
        </div>

        <div className="faq-item">
          <h2>Can the GlasgowSupportBot give me general advice on the support services topics at the University of Glasgow?</h2>
          <p>Yes, the GlasgowSupportBot can provide general advice on topics because these subjects are related to the University of Glasgow's support services. Therefore, it's capable of offering relevant and helpful information on general subjects related to the university's scope, like mental health, leveraging the comprehensive support framework of the university's services.</p>
        </div>

        <div className="faq-item">
          <h2>Can GlasgowSupportBot answer questions outside of support services, but related to the University of Glasgow?</h2>
          <p>GlasgowSupportBot is primarily designed to offer information and assistance with the University of Glasgow's support services. However, with sufficient data and updates, it has the potential to expand its knowledge base to encompass a broader range of topics related to the University of Glasgow. As we continue to enhance GlasgowSupportBot, our goal is to update it with comprehensive information about the university, enabling it to address a wider array of queries in the future.</p>
        </div>
      </section>

      <footer className="faq-footer">
        <Link to="/" className="back-to-chat-link">Back to Chat</Link>
      </footer>
    </div>
  );
};

export default FAQ;
