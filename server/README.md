# Python backend setup for Marketing AI Assistant

## Requirements

To run the backend server, you need Python 3.7+ and the following packages:

```
pip install -r requirements.txt
```

## Running the server

Start the Flask server:

```
python app.py
```

The server will run on http://localhost:5000 by default.

## API Endpoints

- **GET /api/health**: Health check endpoint to verify the API is up and the model is loaded
- **POST /api/chat**: Main endpoint for chatting with the AI
  - Request body: `{ "question": "Your marketing question here" }`
  - Response: `{ "answer": "AI generated answer" }`

## Model Details

The server uses the Falcon-7B-Instruct model from Hugging Face, fine-tuned for marketing use cases.

## Notes

- The first startup will take some time as it downloads the model
- For production use, consider:
  - Using a smaller model or quantizing the model for better performance
  - Adding proper authentication
  - Setting up CORS properly
  - Adding rate limiting
