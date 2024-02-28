import os
import json
import base64
from unittest.mock import patch, MagicMock
import pytest

from app import app, create_message, send_email

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_environment_variables():
    """Test if the environment variables are loaded correctly."""
    assert os.environ.get('CLIENT_ID') is not None
    assert os.environ.get('CLIENT_SECRET') is not None
    assert os.environ.get('REFRESH_TOKEN') is not None

def test_ask_endpoint_valid_request(client):
    """Test the /ask endpoint with a valid request."""
    with patch('app.query_database') as mock_query:
        mock_query.return_value = "Test Response"
        response = client.post('/ask', data=json.dumps({'prompt': 'test query'}), content_type='application/json')
        assert response.status_code == 200
        assert response.json == {'response': 'Test Response'}

@patch('app.send_email')
def test_send_email_endpoint(mock_send_email, client):
    """Test the /send-email endpoint functionality."""
    mock_send_email.return_value = None
    response = client.post('/send-email', data=json.dumps({
        'subject': 'Test Subject',
        'name': 'Test Name',
        'email': 'test@example.com',
        'message': 'Test Message'
    }), content_type='application/json')
    assert response.status_code == 200
    assert response.json == {'success': True, 'message': 'Email sent successfully'}
    mock_send_email.assert_called_once()
    
def test_create_message():
    """Test creating an email message."""
    sender = 'test@example.com'
    to = 'recipient@example.com'
    subject = 'Test Subject'
    message_html = '<p>This is a test message</p>'
    message = create_message(sender, to, subject, message_html)
    assert 'raw' in message
    encoded_message = message['raw']
    decoded_message = base64.urlsafe_b64decode(encoded_message.encode('ASCII'))
    assert to in str(decoded_message)
    assert subject in str(decoded_message)
    assert message_html in str(decoded_message)

@patch('app.build')
def test_send_email_functionality(mock_build, client):
    # Setup mock service object and its method chain
    mock_service = MagicMock()
    mock_users = MagicMock()
    mock_messages = MagicMock()
    mock_send = MagicMock()

    # Configure the mock object's return values and method calls
    mock_build.return_value = mock_service
    mock_service.users.return_value = mock_users
    mock_users.messages.return_value = mock_messages
    mock_messages.send.return_value = mock_send
    mock_send.execute.return_value = {'id': 'abc123'}

    # JSON payload for the POST request
    data = {
        'subject': 'Test Subject',
        'name': 'Test Name',
        'email': 'test@example.com',
        'message': 'This is a test message.'
    }

    # Make a POST request to the /send-email endpoint
    response = client.post('/send-email', data=json.dumps(data), content_type='application/json')

    # Assertions to verify the endpoint's behavior
    assert response.status_code == 200
    assert response.json == {'success': True, 'message': 'Email sent successfully'}
    mock_build.assert_called_once()
    mock_service.users.assert_called_once()
    mock_users.messages.assert_called_once()
    mock_messages.send.assert_called_once()  # This verifies that send is called exactly once