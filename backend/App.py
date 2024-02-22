from flask import Flask, request
from flask_cors import CORS
from database_query import query_database
from database_creation import create_or_load_database
from database_creation import THE_CHROMA_PATH

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes


@app.route('/ask', methods=['POST'])  # Matching React's calling endpoint
def ask():
    data = request.json  # JSON payload from React
    query = data['prompt']
    response = query_database(query)
    return {'response': response}

if __name__ == '__main__':
    create_or_load_database(THE_CHROMA_PATH)
    app.run(debug=True)
