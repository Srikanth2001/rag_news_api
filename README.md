# RAG News Intelligence API (Mock Implementation)

This repository contains a complete backend implementation for the **Scalable RAG API for News Intelligence** assignment.

**What you'll find:**
- Express-based Node.js API with endpoints:
  - `POST /ingest` — ingests 50 mock news articles and stores embeddings into a local file-based vector store.
  - `POST /chat` — accepts `{ sessionId, query }` and returns a contextual answer using retrieval + LLM stub.
  - `GET /history/:sessionId` — fetches logged interactions.
  - `DELETE /history/:sessionId` — clears session history.

**Notes**
- This is a **self-contained, runnable** mock version so you can test the API without requiring external APIs (Jina/Gemini/Qdrant).  
- The code uses a deterministic local embedding function and a file-backed vector store (`data/vector_store.json`) implementing cosine similarity search.
- For production, swap the vector store with Qdrant/Chroma and replace the LLM stub with Google Gemini/OpenAI, as described in the assignment README section.

## Run locally (quick)
1. Install Node.js >= 18
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. API will run at `http://localhost:5000`.

## Run with Docker Compose (optional)
This repository includes a `docker-compose.yml` with Postgres and Redis defined. Build & run:
```
docker-compose up --build
```
Note: The API will try to connect to Postgres/Redis if available; otherwise it falls back to a local SQLite database and in-memory cache.

## Files of interest
- `src/` — backend source code (controllers, services, simple vector store, SQL logging)
- `data/news.json` — 50 mock news articles used for ingestion
- `data/vector_store.json` — created after running `/ingest`
- `postman_collection.json` — Postman collection for testing endpoints

## How the mock RAG works
1. `/ingest` reads `data/news.json`, calculates deterministic embeddings, and writes them to `data/vector_store.json`.
2. `/chat` embeds the user query, finds top-k nearest articles by cosine similarity, constructs a context, and calls a **local LLM stub** that synthesizes an answer (no external API required).
3. Interactions are logged to SQL (Postgres if configured, otherwise SQLite).

## Deliverables to submit
- This repository (zip included)
- README explaining the architecture and how to swap to production components
- Postman collection (included)

If you want, I can:
- Replace the mock vector store with Qdrant client code (requires Qdrant running).
- Replace the LLM stub with a Gemini integration (you’ll need to supply API key).
- Add rate-limiting and a BullMQ ingestion queue (for bonus points).

Good luck! — Generated for the Edwid Tech Backend Assessment
