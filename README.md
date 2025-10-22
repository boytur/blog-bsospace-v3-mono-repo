# ✨ BSO Blog – Be Simple but Outstanding 📝

**BSO Blog** is a collaborative blogging platform created by Software Engineering students, aimed at sharing knowledge, cutting-edge techniques, and real-world experiences. The system is designed with professionalism in mind, featuring CI/CD pipelines, clean backend architecture, and a modern user interface.

> “Be Simple but Outstanding.”

---

## 📌 Features

- 📰 **Write & Share Blog Posts** – Supports Markdown with syntax highlighting
- 🪄 **Real-Time Editing** – Built with Tiptap Editor + Image Upload with Preview
- 🧠 **RAG-powered Search** – Search blog content using Retrieval-Augmented Generation (Coming Soon)
- 🔐 **Authentication** – Supports OAuth (Google/GitHub, Discord)
- 🚀 **CI/CD** – Jenkins, Jest, SonarQube, and Docker for deployment
- 📊 **Dashboard** – Admin panel for posts and analytics
- 🌐 **Multilang Ready** – Supports both EN and TH

---

## 🏗 Tech Stack

| Layer         | Tech Stack                                  |
| ------------- | ------------------------------------------- |
| Frontend      | Next.js 15, TypeScript, ShadCN UI, Tailwind |
| Editor        | Tiptap (Custom Nodes & Image Upload)        |
| Backend       | GO, Gin                                     |
| Database      | PostgreSQL17 + GORM + PGVector              |
| AI/ML         | Ollama (LLaMA3, nomic-embed-text)           |
| Search        | SearXNG (Meta Search Engine)                |
| CI/CD         | Jenkins + Docker                            |
| Lint & Scan   | SonarQube                                   |
| Deployment    | Docker Compose (Multi-container)            |
| Auth          | OAuth (Google, GitHub, Discord)             |
| Cache         | Redis                                       |
| Proxy         | Caddy (Reverse Proxy + Auto HTTPS)          |
| Image Storage | Chibisafe                                   |

---

## 🏛️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Next.js 15 Frontend (Port 9009)                                   │     │
│  │  - React Components (ShadCN UI + Tailwind)                         │     │
│  │  - Tiptap Editor (Markdown + Image Upload)                         │     │
│  │  - OAuth Integration (Google/GitHub/Discord)                       │     │
│  │  (frontend/app, frontend/components, frontend/hooks, frontend/lib) │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS/HTTP
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROXY & GATEWAY LAYER                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Caddy Reverse Proxy (Port 80)                                     │     │
│  │  - Auto HTTPS / SSL Termination                                    │     │
│  │  - Request Routing & Load Balancing                                │     │
│  │  - Gzip/Zstd Compression                                           │     │
│  │  (Caddyfile)                                                       │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
┌─────────────────────────────────────┐   ┌──────────────────────────────┐
│      BACKEND API LAYER              │   │   SEARCH ENGINE LAYER        │
│  ┌────────────────────────────┐     │   │  ┌─────────────────────┐    │
│  │  Go/Gin Backend            │     │   │  │  SearXNG (Port 8080)│    │
│  │  (Port 8080)               │     │   │  │  - Meta Search      │    │
│  │                            │     │   │  │  - Privacy-focused  │    │
│  │  ┌──────────────────────┐  │     │   │  └─────────────────────┘    │
│  │  │  API Routes          │  │     │   └──────────────────────────────┘
│  │  │  - /v1/ai, /v1/auth, /v1/image, /v1/media, /v1/notification, │
│  │  │    /v1/post, /v1/user, /v1/ws                               │  │
│  │  └──────────────────────┘  │     │
│  │                            │     │
│  │  ┌──────────────────────┐  │     │
│  │  │  Internal Services   │  │     │
│  │  │  - AI, Auth, Cache, Chat, Image, LLM, Media, Middleware,     │
│  │  │    Models, Notification, Ollama, Post, Queue, Social, Storage,│
│  │  │    User, WS                                                 │  │
│  │  └──────────────────────┘  │     │
│  │  (backend/cmd/server, backend/api, backend/internal, backend/config, backend/pkg) │
│  └────────────────────────────┘     │
└─────────────────────────────────────┘
                    │
    ┌───────────────┼────────────────────┐
    │               │                    │
    ▼               ▼                    ▼
┌─────────────┐  ┌─────────────┐  ┌──────────────────┐
│  DATABASE   │  │   CACHE     │  │  AI/ML SERVICES  │
│             │  │             │  │                  │
│ PostgreSQL  │  │   Redis     │  │  ┌────────────┐  │
│   + Vector  │  │   (Port     │  │  │  Ollama    │  │
│ (PGVector)  │  │    6379)    │  │  │  LLM Host  │  │
│             │  │             │  │  │            │  │
│ ┌─────────┐ │  │ - Session   │  │  │ - nomic-   │  │
│ │ Posts   │ │  │   Cache     │  │  │   embed-   │  │
│ │ Users   │ │  │ - Query     │  │  │   text     │  │
│ │ Tags    │ │  │   Cache     │  │  │   (384dim) │  │
│ │ Comments│ │  │ - Rate      │  │  │ - LLaMA3   │  │
│ │ Embeddings│ │ │   Limit    │  │  │   Model    │  │
│ └─────────┘ │  │   Store     │  │  └────────────┘  │
│             │  └─────────────┘  └──────────────────┘
└─────────────┘
       │
       └───────────────────────────────────────────────────┐
                               │                           │
                               ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI/RAG PROCESSING FLOW                               │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  1. Content Ingestion & Embedding Pipeline                         │     │
│  │                                                                     │     │
│  │     User Post ──► Extract Text (TipTap) ──► Chunk Text ──►         │     │
│  │                                                                     │     │
│  │     ──► Generate Embeddings (Ollama/nomic-embed-text) ──►          │     │
│  │                                                                     │     │
│  │     ──► Store Vectors (PGVector 384-dim) ──► AI Ready ✓           │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  2. AI Chat / Q&A Flow (RAG - Retrieval Augmented Generation)      │     │
│  │                                                                     │     │
│  │     User Question ──► Intent Classification (LLM) ──►              │     │
│  │                                                                     │     │
│  │     ──► Generate Question Embedding ──► Vector Similarity Search   │     │
│  │         (PGVector Cosine Similarity)                                │     │
│  │                                                                     │     │
│  │     ──► Retrieve Top-K Relevant Chunks ──► Build Context ──►       │     │
│  │                                                                     │     │
│  │     ──► LLM Generation (Ollama/LLaMA3 + Context) ──►               │     │
│  │                                                                     │     │
│  │     ──► Stream Response to Client (SSE/WebSocket) ──► Display      │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  3. AI Agent Tools & Capabilities                                  │     │
│  │                                                                     │     │
│  │     • Intent Classifier Agent                                      │     │
│  │       - Classifies: blog_question, summarize, greeting, unknown    │     │
│  │                                                                     │     │
│  │     • Web Search Agent (via SearXNG)                               │     │
│  │       - External knowledge augmentation                            │     │
│  │       - Privacy-preserving search                                  │     │
│  │                                                                     │     │
│  │     • Blog Q&A Agent (RAG)                                         │     │
│  │       - Context-aware answers from blog content                    │     │
│  │       - Semantic search using embeddings                           │     │
│  │                                                                     │     │
│  │     • Summarization Agent                                          │     │
│  │       - Auto-summarize blog posts                                  │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUXILIARY SERVICES                                   │
│                                                                              │
│  ┌──────────────────────┐    ┌──────────────────────┐                       │
│  │  PDF Extractor       │    │  Background Workers  │                       │
│  │  (Python/Flask)      │    │  (Go Routines)       │                       │
│  │  (Port 5002)         │    │                      │                       │
│  │  (extractor/)        │    │  - Embedding Queue   │                       │
│  │  - PyMuPDF           │    │  - Post Processing   │                       │
│  │  - Tesseract OCR     │    │  - Notification Send │                       │
│  │  - pdf2image         │    │  - Analytics Update  │                       │
│  └──────────────────────┘    └──────────────────────┘                       │
│                                                                              │
│  ┌──────────────────────┐    ┌──────────────────────┐                       │
│  │  Image Storage       │    │  Real-time Comm      │                       │
│  │  (Chibisafe)         │    │  (WebSocket)         │                       │
│  │  - Upload handling   │    │  - Live AI Chat      │                       │
│  │  - CDN delivery      │    │  - Notifications     │                       │
│  └──────────────────────┘    └──────────────────────┘                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         CI/CD & DEVOPS PIPELINE                              │
│                                                                              │
│   GitHub ──► Jenkins ──► SonarQube ──► Jest Tests ──► Docker Build ──►      │
│                                                                              │
│   ──► Docker Compose Deploy (Production)                                    │
│                                                                              │
│   Networks: internal (db, redis, backend) | public (caddy, frontend,        │
│             searxng) | ollama_net (external AI services)                    │
│   (Jenkinsfile, .github/workflows, docker-compose.*.yml)                    │
└─────────────────────────────────────────────────────────────────────────────┘

Key Technologies:
├─ Frontend: Next.js 15, TypeScript, ShadCN UI, Tailwind CSS
├─ Backend: Go, Gin Framework, GORM
├─ Database: PostgreSQL 17 + PGVector (Vector DB)
├─ Cache: Redis 7
├─ AI/ML: Ollama (LLaMA3), nomic-embed-text (384-dim embeddings)
├─ Search: SearXNG (Privacy-focused meta-search)
├─ Proxy: Caddy (Auto HTTPS, Reverse Proxy)
├─ Queue: Go channels + Background workers
├─ Real-time: WebSocket (Gorilla WebSocket)
├─ Auth: OAuth 2.0 (Google, GitHub, Discord)
├─ CI/CD: Jenkins, Docker, SonarQube, Jest
└─ Deployment: Docker Compose (Multi-container orchestration)
```

---

## 🧪 CI/CD Pipeline

- ✅ **Test**: Run with Jest
- 🧹 **Lint & Scan**: SonarQube
- 🐳 **Deploy**: Docker + Jenkins
- 🐾 **Auto Deploy**: Pull Request -> Merge -> Deploy

---

## 🧠 Future Plans

- [ ] ✍️ AI Assistant: Auto-summarize / Suggest blog topics
- [ ] 🧠 RAG Search: LLM (LLaMA3)
- [ ] 🧪 Enhanced Analytics Dashboard
- [ ] 📱 Mobile-first UX Improvements

---

## 🤝 Contributors

Powered by BSO Club, Burapha University SE Students ❤️  
Maintained by: [@yamroll](https://github.com/LordEaster) and team.

---

> "Be Simple but Outstanding." – A platform born from the passion of those who love sharing knowledge.

---

## 🤖 AI-Generated Notice

This README file was generated with assistance from **ChatGPT-4o** (OpenAI) based on the project details and requirements provided by the BSO Blog team.
