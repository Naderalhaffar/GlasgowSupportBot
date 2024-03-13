from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import UserFeedback, UserQuery, db
from database_query import query_database
from database_creation import create_or_load_database
from database_creation import THE_CHROMA_PATH
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from email.mime.text import MIMEText
import base64
import os
from email.mime.multipart import MIMEMultipart



load_dotenv()

app = Flask(__name__)

base_dir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base_dir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

CORS(app)  # Enable CORS for all domains on all routes

with app.app_context():
    db.create_all()  
@app.route('/ask', methods=['POST'])  # Matching React's calling endpoint
def ask():
    data = request.json  # JSON payload from React
    query = data['prompt']
    response = query_database(query)
    user_query = UserQuery(query_text=query, response_text=response)
    db.session.add(user_query)
    db.session.commit()
    return {'response': response}


def create_message(sender, to, subject, message_html):
    message = MIMEMultipart('alternative')
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    
    part = MIMEText(message_html, 'html')
    message.attach(part)
    
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}

def send_email(subject, name, email, message_text):
    CLIENT_ID = os.environ['CLIENT_ID']
    CLIENT_SECRET = os.environ['CLIENT_SECRET']
    REFRESH_TOKEN = os.environ['REFRESH_TOKEN']
    
    message_html = f"""
<html>
<head>
    <style>
        body {{ font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; }}
        .container {{ max-width: 600px; margin: 40px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }}
        .header {{ background-color: #0056b3; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; font-size: 24px; }}
        .info {{ margin-bottom: 20px; padding: 20px; font-size: 18px; }}
        .info h1 {{ color: #0056b3; font-size: 22px; }}
        .info p {{ margin: 20px 0; line-height: 1.6; }}
        .info span {{ font-weight: bold; }}
        .info .email {{ color: #0056b3; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Feedback Received
        </div>
        <div class="info">
            <h1>Subject: {subject}</h1>
            <p><span>Name:</span> {name}</p>
            <p><span>Email:</span> <a href="mailto:{email}" class="email">{email}</a></p>
            <p><span>Message:</span></p>
            <p>{message_text}</p>
        </div>
    </div>
</body>
</html>
"""

    
    credentials = Credentials(
        None,  # Access token set to None, will use refresh token for access
        refresh_token=REFRESH_TOKEN,
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        token_uri='https://oauth2.googleapis.com/token',
        scopes=['https://mail.google.com']
    )

    credentials.refresh(Request())

    service = build('gmail', 'v1', credentials=credentials)
    message = create_message("glasgowsuppbot@gmail.com", "glasgowsuppbotfeedback@gmail.com", subject, message_html)
    service.users().messages().send(userId="me", body=message).execute()

@app.route('/send-email', methods=['POST'])
def submit_feedback():
    data = request.json
       # Save the feedback in the database
    feedback = UserFeedback(
        name=data.get('name', 'Anonymous'),
        email=data.get('email', ''),
        subject=data.get('subject', 'No Subject'),
        message=data.get('message', '')
    )
    db.session.add(feedback)
    db.session.commit()
    try:
        send_email(data.get('subject', 'No Subject'), data.get('name', 'Anonymous'), data.get('email', ''), data.get('message', ''))
        return jsonify({'success': True, 'message': 'Email sent successfully'})
    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Failed to send email'}), 500


if __name__ == '__main__':
    create_or_load_database(THE_CHROMA_PATH)  
    app.run(debug=False)
