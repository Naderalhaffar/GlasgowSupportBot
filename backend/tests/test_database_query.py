import pytest
from unittest.mock import patch, MagicMock
from database_query import query_database

# Test query_database function when it successfully finds relevant search results
# and gets a response from the AI responder.
@patch('database_query.AIResponder')
@patch('database_query.PromptBuilder.from_template')
@patch('database_query.VectorDB')
@patch('database_query.Embeddings')
def test_query_database_success(__, mock_vector_db, _, mock_ai_responder):
    mock_vector_store_instance = mock_vector_db.return_value
    mock_vector_store_instance.similarity_search_with_relevance_scores.return_value = [(MagicMock(page_content="relevant content"), 0.9)]
    mock_ai_responder_instance = mock_ai_responder.return_value
    mock_ai_responder_instance.predict.return_value = "Mock AI Response"
    response = query_database("test query")
    assert response == "Mock AI Response"
    mock_vector_store_instance.similarity_search_with_relevance_scores.assert_called_once_with("test query", k=2)
    mock_ai_responder_instance.predict.assert_called_once()


# Test query_database function when search results are found but with low relevance scores.
@patch('database_query.VectorDB')
@patch('database_query.Embeddings')
def test_query_database_low_relevance_scores(__, mock_vector_db):
    mock_vector_store_instance = mock_vector_db.return_value
    mock_vector_store_instance.similarity_search_with_relevance_scores.return_value = [(MagicMock(page_content="irrelevant content"), 0.5)]
    response = query_database("test query")
    expected_response = "I'm having trouble finding a precise match for your question. Could you provide more details or try a different question? This helps me understand better and provide more accurate information. You can also contact the Uofg Helpdesk for any queries at https://www.gla.ac.uk/selfservice"
    assert response == expected_response
    mock_vector_store_instance.similarity_search_with_relevance_scores.assert_called_once_with("test query", k=2)

# Test query_database function for its ability to handle exceptions.
@patch('database_query.VectorDB')
@patch('database_query.Embeddings')
def test_query_database_exception_handling(__, mock_vector_db):
    mock_vector_store_instance = mock_vector_db.return_value
    mock_vector_store_instance.similarity_search_with_relevance_scores.side_effect = Exception("Database error")
    with pytest.raises(Exception) as exc_info:
        query_database("test query")
    assert str(exc_info.value) == "Database error"

# Test query_database function to ensure it constructs the prompt correctly for the AI responder.
@patch('database_query.AIResponder')
@patch('database_query.PromptBuilder.from_template')
@patch('database_query.VectorDB')
@patch('database_query.Embeddings')
def test_query_database_prompt_construction(__, mock_vector_db, mock_prompt_builder, mock_ai_responder):
    
    # Setup mock to return two search results with high relevance scores
    mock_vector_store_instance = mock_vector_db.return_value
    mock_vector_store_instance.similarity_search_with_relevance_scores.return_value = [
        (MagicMock(page_content="relevant content"), 0.9),
        (MagicMock(page_content="additional relevant content"), 0.85)  # Added second search result
    ]
    
    # Mock PromptBuilder and AIResponder
    mock_prompt_instance = mock_prompt_builder.return_value
    mock_prompt_instance.format.return_value = "Formatted prompt for AI"
    mock_ai_responder_instance = mock_ai_responder.return_value
    mock_ai_responder_instance.predict.return_value = "Mock AI Response"
    
    # Execute the function
    response = query_database("test query")
    
    # Verify that the format method was called with the correctly constructed context
    expected_context = "relevant content\n\n---\n\nadditional relevant content"  # Updated expected context
    mock_prompt_instance.format.assert_called_once_with(context=expected_context, question="test query")
    assert response == "Mock AI Response"

