from unittest.mock import ANY, MagicMock, patch
from langchain.schema import Document 
from database_creation import text_chunking, create_or_load_database, create_chroma_database

# Test the behavior when a Chroma database already exists
"""
Test create_or_load_database function when the database already exists.
It should not attempt to create a new database.
"""
@patch('database_creation.glob')
@patch('database_creation.os.path.join')
@patch('database_creation.create_chroma_database')
def test_create_or_load_database_exists(mock_create_chroma_database, __ , mock_glob):
    # Setup: simulate the existence of a database directory
    mock_glob.return_value = ['chroma/subdirectory']

    # Action: call the function under test
    create_or_load_database('chroma')

    # Assert: create_chroma_database is not called since database exists
    mock_create_chroma_database.assert_not_called()

# Test the behavior when a Chroma database does not exist
"""
Test create_or_load_database function when no database exists.
It should trigger the creation of a new database.
"""
@patch('database_creation.glob')
@patch('database_creation.os.path.join')
@patch('database_creation.create_chroma_database')
def test_create_or_load_database_not_exists(mock_create_chroma_database, __ , mock_glob):
    # Setup: simulate no existing database directory
    mock_glob.return_value = []

    # Action: call the function under test
    create_or_load_database('chroma')

    # Assert: create_chroma_database is called to create a new database
    mock_create_chroma_database.assert_called_once()

# Test the creation of a Chroma database
"""
Test create_chroma_database function to ensure it processes documents,
chunks them, and creates a new Chroma database.
"""
@patch('database_creation.Chroma.from_documents')
@patch('database_creation.text_chunking', return_value=['chunk1', 'chunk2'])
@patch('database_creation.DirectoryLoader.load', return_value=[MagicMock()])
@patch('database_creation.shutil.rmtree')
@patch('database_creation.os.path.exists', return_value=True)
def test_create_chroma_database(_, mock_rmtree, __ , mock_text_chunking, mock_from_documents):
    # Action: call the function under test
    create_chroma_database()

    # Assert: Check if the directory was cleared before creating a new database
    mock_rmtree.assert_called_once_with('chroma')
    
    # Assert: text_chunking is called with loaded documents
    mock_text_chunking.assert_called_once()

    # Assert: Chroma database creation is initiated with the chunks
    mock_from_documents.assert_called_once_with(['chunk1', 'chunk2'], ANY, persist_directory='chroma')

# Test the text_chunking functionality
"""
Test text_chunking function to ensure it correctly splits documents into chunks.
"""
def test_text_chunking():
    # Setup: Create a mock Document list with both page_content and metadata attributes,
    # where metadata is a dictionary as expected by the text_chunking logic.
    docs = [MagicMock(spec=Document, page_content="some content", metadata={"some": "metadata"}) for _ in range(2)]

    # Action: call the function under test
    chunks = text_chunking(docs)

    # Assert: Verify that chunks have been created correctly
    assert len(chunks) > 0
