# Example Project: Express.js + PostgreSQL (Docker Compose)

## Notes
- User wants an example project using Express.js and PostgreSQL via Docker Compose.
- Reference materials: Express.js docs, Dockerizing Node.js, serving static files, TypeORM for PostgreSQL connection.
- Project structure, Docker Compose, Dockerfile, .env, database schema, API endpoints, static frontend, and documentation have been created.

## Task List
- [x] Initialize Express.js project
- [x] Set up Docker Compose with PostgreSQL service (postgrest)
- [x] Connect Express.js to PostgreSQL using TypeORM
- [x] Add API endpoints in Express.js
- [x] Serve static files via Express.js
- [x] Dockerize the Node.js Express application
- [x] Test the setup end-to-end

## Current Goal
Project complete

## Project Summary

This example project demonstrates a complete full-stack application with:

### Architecture
- **Backend**: Express.js REST API with TypeORM
- **Database**: PostgreSQL with Docker Compose
- **Frontend**: Modern HTML/CSS/JavaScript interface
- **Deployment**: Docker containers with networking

### Features Implemented
- User management (CRUD operations)
- Post management with user relationships
- Health monitoring endpoint
- Static file serving
- Database initialization with sample data
- Error handling and validation
- Responsive web interface

### API Endpoints
- `GET/POST/PUT/DELETE /api/users` - User management
- `GET/POST/PUT/DELETE /api/posts` - Post management
- `GET /health` - System health check
- `GET /` - Frontend application

### Quick Start Commands
```bash
# Install dependencies
npm install

# Start with Docker Compose
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Access Points
- Frontend: http://localhost:3000
- API: http://localhost:3000/api
- Health Check: http://localhost:3000/health

The project is fully functional and ready for development or as a learning reference.
