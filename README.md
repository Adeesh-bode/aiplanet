
### Frontend
1. Navigate to the `pdf-app` directory:
    ```bash
    cd pdf-app
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```
### Backend
1. Create a virtual environment and activate it:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows: .\env\Scripts\activate
    ```
2. Install dependencies:
    ```bash
    pip install fastapi uvicorn sqlalchemy
    ```
3. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
