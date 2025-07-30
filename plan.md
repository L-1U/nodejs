# Express.js + PostgreSQL with Cookie Authentication (Docker Compose)

## Notes
- Full-stack application with Express.js, PostgreSQL, and TypeORM via Docker Compose.
- Complete cookie-based authentication system implemented with secure session management.
- User registration and login forms with password hashing using bcrypt.
- Protected routes and session persistence across browser sessions.
- Database schema includes authentication fields and proper initialization.

## Task List
- [x] Initialize Express.js project
- [x] Set up Docker Compose with PostgreSQL service
- [x] Connect Express.js to PostgreSQL using TypeORM
- [x] Add API endpoints in Express.js
- [x] Serve static files via Express.js
- [x] Dockerize the Node.js Express application
- [x] Implement user authentication with cookies
- [x] Add user registration and login forms
- [x] Set up password hashing and session management
- [x] Update database schema with authentication fields
- [x] Test authentication flows end-to-end

## Current Goal
Authentication system complete

## Project Summary

This example project demonstrates a complete full-stack application with:

### Architecture
- **Backend**: Express.js REST API with TypeORM
- **Database**: PostgreSQL with Docker Compose
- **Frontend**: Modern HTML/CSS/JavaScript interface
- **Deployment**: Docker containers with networking

### Features Implemented
- **Authentication System**: Cookie-based user registration and login
- **Password Security**: Bcrypt hashing with 10 salt rounds
- **Session Management**: HTTP-only cookies with 24-hour expiration
- **Protected Routes**: Authentication required for main application access
- **User Management**: CRUD operations with authentication integration
- **Post Management**: User relationships with authentication context
- **Health Monitoring**: System status endpoint
- **Static File Serving**: Frontend with authentication forms
- **Database Initialization**: Sample data with hashed passwords
- **Error Handling**: Comprehensive validation and error responses
- **Responsive Interface**: Modern HTML/CSS/JavaScript with auth forms

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration with password hashing
- `POST /api/auth/login` - User login with session creation
- `POST /api/auth/logout` - Session destruction and cookie clearing
- `GET /api/auth/me` - Get current authenticated user

#### Application
- `GET/POST/PUT/DELETE /api/users` - User management
- `GET/POST/PUT/DELETE /api/posts` - Post management
- `GET /health` - System health check
- `GET /` - Frontend application with authentication forms

### Quick Start Commands
```bash
# Install dependencies (includes authentication packages)
npm install

# Start with Docker Compose (fresh database with auth schema)
docker compose up -d

# Reset database if schema issues occur
docker compose down -v
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Access Points
- **Frontend**: http://localhost:3000 (shows authentication forms first)
- **API**: http://localhost:3000/api (authentication endpoints + CRUD)
- **Health Check**: http://localhost:3000/health

### Authentication Testing
- **Register**: Create new account with name, email, password (min 6 chars)
- **Login**: Use sample accounts or newly created accounts
- **Sample Users**: 
  - `john@example.com` / `password123`
  - `jane@example.com` / `password123`
  - `bob@example.com` / `password123`
- **Session**: Automatically maintained via HTTP-only cookies
- **Logout**: Destroys session and returns to authentication forms

The project is fully functional with secure authentication and ready for development or as a learning reference.
