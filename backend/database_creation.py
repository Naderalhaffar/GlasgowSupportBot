import os
import shutil
from glob import glob
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores.chroma import Chroma

THE_CHROMA_PATH = "chroma"

def create_or_load_database(THE_CHROMA_PATH):
    # Find subdirectory with random name in the chroma directory
    subdirectories = glob(os.path.join(THE_CHROMA_PATH, '*'))
    # Check if there are any subdirectories, which implies the database exists
    if not subdirectories:
        print("No Chroma database found, creating one...")
        create_chroma_database() # generate database if not exists
    else:
        print(f"Chroma database found in: {subdirectories[0]}")
        

def create_chroma_database():
    directory_loader = DirectoryLoader("data", glob="*.txt") # Loading documents sitting in the directory of "data"
    docs = directory_loader.load()
    chunks = text_chunking(docs)
        # Clearing out the database
    if os.path.exists(THE_CHROMA_PATH): #checking is chroma database exists
        shutil.rmtree(THE_CHROMA_PATH)

    # Print the length of chunks for debugging
    print(f"Number of chunks before saving to Chroma: {len(chunks)}")

    if len(chunks) > 0:
        # Create new database from the documents.
        database = Chroma.from_documents(chunks, OpenAIEmbeddings(), persist_directory=THE_CHROMA_PATH)
        database.persist()
        print(f"Saved {len(chunks)} chunks to {THE_CHROMA_PATH}.")
    else:
        print("No chunks to save to Chroma.")


def text_chunking(docs: list[Document]):
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=5000,
        chunk_overlap=300,
        length_function=len,
        add_start_index=True,
    )
    
    chunks = splitter.split_documents(docs)
    
    print(f"Split {len(docs)} documents into {len(chunks)} chunks.")

    return chunks








