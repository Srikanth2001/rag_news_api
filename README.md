RAG News Intelligence API

This project implements a scalable Retrieval-Augmented Generation (RAG) backend designed for answering queries over a news corpus. The system supports ingestion of news articles, vector search, contextual answer generation, and structured logging.

The design follows clean modular architecture principles with clear separation between controllers, services, utilities, and data layers.

🚀 Features
RAG Pipeline

Ingests news articles from a JSON feed.

Generates deterministic embeddings for each article.

Stores them in a simple vector store (easily replaceable with Qdrant/Chroma in production).

Retrieves the most relevant documents using cosine similarity.

Generates contextual answers using a pluggable LLM service (mock LLM included; Gemini/OpenAI can be plugged in).

API Endpoints
Method	Endpoint	Description
POST	/ingest	Ingests and indexes news articles
POST	/chat	Answers a query using retrieval + generation
GET	/history/:sessionId	Fetches logged interactions
DELETE	/history/:sessionId	Clears session history
🏗️ Tech Stack

Node.js (Express)

PostgreSQL / SQLite fallback

Redis (or in-memory fallback)

Docker & Docker Compose

File-based Vector Store (mock)
(Can be swapped with Qdrant/ChromaDB with minimal changes)

📂 Project Structure
rag_news_api/
│── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│── data/
│   ├── news.json
│── Dockerfile
│── docker-compose.yml
│── package.json
│── postman_collection.json
│── README.md

⚙️ Installation & Running Locally
1️⃣ Install dependencies
npm install

2️⃣ Start server
npm start


Server runs at:
http://localhost:5000

🐳 Run Using Docker Compose
docker-compose up --build


This starts:

Node.js API

PostgreSQL

Redis

(You can extend the compose file to include Qdrant for production setup.)

🧪 Testing the API
Ingest documents
POST http://localhost:5000/ingest

Ask a question
POST http://localhost:5000/chat
{
  "sessionId": "demo-1",
  "query": "Show me tech news"
}

Get history
GET http://localhost:5000/history/demo-1

📄 Postman Collection

A Postman collection (postman_collection.json) is included in the project root.
Import it into Postman to test all endpoints.

📊 Logging

All interactions are logged to:

PostgreSQL if available

SQLite fallback if not

Each entry stores:

sessionId

user query

model response

response time

timestamp

🔧 Modularity & Extensibility

This repository is designed to be easily extended:

Replace vector embeddings

Swap embedding.service.js with Jina, HuggingFace, or any embedding model.

Replace vector store

Replace /utils/vectorstore.js with:

Qdrant client

ChromaDB client

Pinecone client

Replace LLM

Swap llm.stub.js with:

Google Gemini

OpenAI

Groq

or any provider

📌 Notes

The project includes a mock LLM for local testing without API keys.

The architecture matches the assignment requirements for modularity, clean design, and containerized execution.

📬 Contact

If you need any help running the project, feel free to reach out.
