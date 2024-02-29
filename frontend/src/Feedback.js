import React, { useState } from 'react';
import './Feedback.css';



const Feedback = () => {
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');
    const [hover, setHover] = useState(false);
    const [subject, setSubject] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const initialSubject = '';
    const initialName = '';
    const initialEmail = '';
    const initialMessage = '';



    const toggleFeedbackForm = () => setShowForm(!showForm);
    const handleFormClick = (event) => event.stopPropagation();

    const validateForm = () => {
        if (!subject || !message) {
            alert('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const sendFeedback = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
    
        const feedbackData = { subject, name, email, message };
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData),
            });
            
            const data = await response.json();
            if (data.success) {
                alert('Feedback sent! Thank you.');
                // Reset form state here
                setSubject(initialSubject);
                setName(initialName);
                setEmail(initialEmail);
                setMessage(initialMessage);
            } else {
                throw new Error(data.message || 'Failed to send feedback');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            alert('An error occurred while sending feedback. Please try again.');
        }
    };
    

    return (
        <>
            <div
                className={`feedback-icon ${hover ? 'feedback-button-hover' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={toggleFeedbackForm}
            >
                <div className="feedback-button">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
            </div>

            <div className={`modal-background ${showForm ? 'd-flex' : 'd-none'}`} onClick={toggleFeedbackForm}>
                <div className="feedback-form" onClick={handleFormClick}>
                    <form onSubmit={sendFeedback} noValidate>
                        <div className="form-group">
                            <label className="input-label">Name</label>
                            <input
                                type="text"
                                className="feedback-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name (optional)"
                            />
                            <div className="form-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email" // Makes it easier for users to input email addresses
                            className="feedback-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email (optional)"
                        />
                        </div>
                        </div>
                        <div className="form-group">
                            <label className="input-label">
                                Please Select the Subject <span className="mandatory">*</span>
                            </label>
                            <select
                                className={`feedback-input ${!subject && 'required-input'}`}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            >
                                <option value="">Select a Subject</option>
                                <option value="User Experience (UX)">User Experience (UX)</option>
                                <option value="Content Quality">Content Quality</option>
                                <option value="Functionality">Functionality</option>
                                <option value="Support Services">Support Services</option>
                                <option value="Personalization">Personalization</option>
                                <option value="Overall Satisfaction">Overall Satisfaction</option>
                                <option value="Technical Issues">Technical Issues</option>
                                <option value="Communication">Communication</option>
                                <option value="Other">Other</option>

                            </select>
                        </div>
                        <div className="form-group">
                            <label className="input-label">
                                Description <span className="mandatory">*</span>
                            </label>
                            <textarea
                                className={`textarea feedback-input ${!message && 'required-input'}`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter your feedback"
                                required
                            />
                        </div>
                        <button className="submit-button" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
};


export default Feedback;
