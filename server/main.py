import os
from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import shutil
from pdf_processor import extract_text_from_pdf, process_question

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Replace with your React frontend URL during development
    # Add more origins if needed for different environments or domains
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],
)

# Directory to store uploaded PDF files
UPLOAD_DIRECTORY = "./uploaded_pdfs"

# Create the directory if it doesn't exist
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload/")
async def upload_pdf(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    for file in files:
        # Save the file to the upload directory
        file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    return JSONResponse(status_code=200, content={"message": "Files uploaded successfully"})

@app.post("/ask/")
async def ask_question(pdf_filename: str = Query(...), question: str = Query(...)):
    pdf_path = os.path.join(UPLOAD_DIRECTORY, pdf_filename)
    
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail=f"PDF file {pdf_filename} not found")
    
    pdf_text = extract_text_from_pdf(pdf_path)
    
    if not pdf_text:
        raise HTTPException(status_code=500, detail=f"Failed to extract text from {pdf_filename}")
    
    try:
        answer = process_question(pdf_text, question)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"answer": answer}

@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Q&A application!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
