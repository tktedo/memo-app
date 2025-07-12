# Memo App (FastAPI + Next.js)

## Overview

This is a simple memo application built with FastAPI (backend) and Next.js (frontend), using PostgreSQL as the database. The entire stack is containerized using Docker and Docker Compose.

## Tech Stack

- ⚙️ FastAPI (Python)
- 🧠 PostgreSQL
- 🌐 Next.js (React)
- 🐳 Docker / Docker Compose

## Features

- Create and view memos
- Full API support (FastAPI with auto-generated docs)
- Dockerized environment for easy setup
- RESTful architecture

## Getting Started

### Prerequisites

- Docker & Docker Compose

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tktedo/memo-app.git
   cd memo-app

2. Build and start the containers:

   ```bash
   docker compose up --build

3. Backend API will be available at:
   http://localhost:8000

4. Frontend will be available at:
   http://localhost:3000

## Folder structure

```bash
memo-app/
├── backend/       # FastAPI application
│   ├── app/
│   ├── Dockerfile
│   └── ...
├── frontend/      # Next.js application
│   ├── pages/
│   ├── components/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml
└── README.md
