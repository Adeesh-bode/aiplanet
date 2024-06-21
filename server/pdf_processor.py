import fitz  # PyMuPDF
from transformers import pipeline

def extract_text_from_pdf(pdf_path):
    """
    Extracts text content from a PDF file using PyMuPDF.

    Parameters:
    - pdf_path (str): Path to the PDF file.

    Returns:
    - text (str): Extracted text content.
    """
    text = ""
    pdf_document = fitz.open(pdf_path)
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        text += page.get_text()
    # print(text)
    return text



# Initialize the question-answering pipeline using a pre-trained model
qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")

def process_question(pdf_text, question):
    """
    Processes a user question based on the content of a PDF.

    Parameters:
    - pdf_text (str): Text content extracted from the PDF.
    - question (str): User's question.

    Returns:
    - answer (str): Answer to the question.
    """
    # Use the question-answering pipeline to find the answer
    result = qa_pipeline(question=question, context=pdf_text)
    answer = result['answer']
    print(f"Question: {question}")
    print(f"Answer: {answer}")
    return answer
