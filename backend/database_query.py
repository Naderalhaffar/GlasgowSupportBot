from langchain.embeddings import OpenAIEmbeddings as Embeddings
from langchain.prompts import ChatPromptTemplate as PromptBuilder
from langchain.vectorstores.chroma import Chroma as VectorDB
from langchain.chat_models import ChatOpenAI as AIResponder



def query_database(query_text):
    # Check if the query is too short
    if len(query_text) < 4:
        return "Your query is too short to process. Please provide a longer query."
    
  
    embedder = Embeddings()
    vector_store = VectorDB(persist_directory="chroma", embedding_function=embedder)
    
    # Execute a similarity search within the database for the given query text, limiting results to top 2 matches.
    search_results = vector_store.similarity_search_with_relevance_scores(query_text, k=2)
    
    if not search_results or search_results[0][1] < 0.675:
            # Offer guidance on refining the query or suggest alternative actions.
        return "I'm having trouble finding a precise match for your question. Could you provide more details or try a different question? This helps me understand better and provide more accurate information. You can also contact the Uofg Helpdesk for any queries at https://www.gla.ac.uk/selfservice"
    
    # Concatenate page contents of the top search results, separated by a specific delimiter for clarity.
    gathered_context = "\n\n---\n\n".join([document.page_content for document, _ in search_results])
    
    query_builder = PromptBuilder.from_template(""" Answer the question based on the given following data() {context} 
                                                -- 
                                                Answer this question based on the above given data(In your answer dont show anything related to ai like starting with assistant in your answer or mentioning about the given data. just answer directly like a human)) {question}""")
    
    constructed_prompt = query_builder.format(context=gathered_context, question=query_text)
    
    # Initialize the chat model for generating the answer based on the constructed prompt.
    chat_model = AIResponder()
    
    # Generate and return the answer.
    answer = chat_model.predict(constructed_prompt)

    return answer


   