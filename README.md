# Express.js + PostgreSQL with Cookie Authentication

A full-stack web application demonstrating Express.js with PostgreSQL using Docker Compose, TypeORM, and secure cookie-based authentication system.

## Features

- **🔐 Authentication System** - Cookie-based user registration and login
- **🔒 Password Security** - Bcrypt hashing with salt rounds
- **🍪 Session Management** - HTTP-only cookies with expiration
- **🛡️ Protected Routes** - Authentication required for main app access
- **Express.js** REST API with CRUD operations
- **PostgreSQL** database with Docker Compose
- **TypeORM** for database operations and entity management
- **Modern Frontend** with authentication forms and responsive design
- **Docker Compose** for easy development setup
- **Static File Serving** for frontend assets
- **Health Check** endpoint for monitoring

## Project Structure

```
├── src/
│   ├── app.js              # Main Express application with session middleware
│   ├── database.js         # TypeORM configuration
│   ├── entities/           # Database entities
│   │   ├── User.js         # User entity with password field
│   │   └── Post.js
│   └── routes/             # API routes
│       ├── auth.js         # Authentication endpoints
│       ├── users.js
│       └── posts.js
├── public/                 # Static frontend files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docker-compose.yml      # Docker services configuration
├── Dockerfile              # Node.js app containerization
├── init.sql               # Database initialization
├── package.json           # Node.js dependencies
└── .env                   # Environment variables
```

## Quick Start

### Option 1: Docker Compose (Recommended)

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000 (shows login/register forms)
   - API: http://localhost:3000/api (includes authentication endpoints)
   - Health Check: http://localhost:3000/health

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start PostgreSQL (Docker):**
   ```bash
   docker-compose up -d postgres
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication 🔐
- `POST /api/auth/register` - Register new user with password hashing
- `POST /api/auth/login` - Login user and create session
- `POST /api/auth/logout` - Logout user and destroy session
- `GET /api/auth/me` - Get current authenticated user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### System
- `GET /health` - Health check endpoint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Application port | `3000` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `example_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password123` |
| `SESSION_SECRET` | Session encryption key | `your-secret-key` |

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Bcrypt hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Sample Data

The database is initialized with sample users and posts:

**Users (with authentication):**
- John Doe (john@example.com) - Password: `password123`
- Jane Smith (jane@example.com) - Password: `password123`
- Bob Johnson (bob@example.com) - Password: `password123`

**Posts:**
- Sample posts linked to the users above

## Authentication Usage 🔐

### Getting Started with Authentication

1. **Start the application** using Docker Compose:
   ```bash
   docker compose up -d
   ```

2. **Visit** http://localhost:3000 - you'll see the authentication interface

3. **Register a new account** or **login with sample users**

### Registration Flow

1. Click the "Register" tab
2. Fill in:
   - **Name**: Your full name
   - **Email**: Valid email address (must be unique)
   - **Password**: Minimum 6 characters
3. Click "Register"
4. You'll be automatically logged in and redirected to the main application

### Login Flow

1. Use the "Login" tab (default)
2. Enter credentials:
   - **Sample Users**: Use the credentials listed above
   - **Your Account**: Use your registered email and password
3. Click "Login"
4. Access the main application features

### Session Management

- **Automatic**: Sessions are maintained via HTTP-only cookies
- **Duration**: 24 hours (configurable)
- **Security**: Cookies are not accessible via JavaScript
- **Persistence**: Sessions survive browser refresh
- **Logout**: Click "Logout" to end session and return to auth forms

### Security Features

- **Password Hashing**: Bcrypt with 10 salt rounds
- **Session Cookies**: HTTP-only, secure configuration
- **CSRF Protection**: Session-based authentication
- **Input Validation**: Email format, password length, required fields
- **Error Handling**: Secure error messages without information leakage

### Troubleshooting Authentication

**"Column User.password does not exist" Error:**
```bash
# Reset database with fresh schema
docker compose down -v
docker compose up -d
```

**Session not persisting:**
- Check browser cookie settings
- Ensure you're accessing via http://localhost:3000 (not 127.0.0.1)

**Registration/Login not working:**
- Check application logs: `docker compose logs app`
- Verify database connection: `docker compose logs postgres`

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run docker:up` - Start Docker Compose services
- `npm run docker:down` - Stop Docker Compose services
- `npm run docker:logs` - View Docker Compose logs

### Adding New Features

1. **Database Changes:** Update `init.sql` and entity files
2. **API Routes:** Add new routes in `src/routes/`
3. **Frontend:** Update `public/` files for UI changes

## Troubleshooting

### Common Issues

1. **Port 5432 already in use:**
   ```bash
   # Stop local PostgreSQL service
   brew services stop postgresql
   # Or change the port in docker-compose.yml
   ```

2. **Database connection failed:**
   - Check if PostgreSQL container is running: `docker-compose ps`
   - Verify environment variables in `.env`

3. **Permission denied:**
   ```bash
   # Fix file permissions
   chmod +x docker-compose.yml
   ```

### Logs

- **Application logs:** `docker-compose logs app`
- **Database logs:** `docker-compose logs postgres`
- **All logs:** `docker-compose logs -f`

## Technologies Used

- **Backend:** Node.js, Express.js, TypeORM
- **Database:** PostgreSQL
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **DevOps:** Docker, Docker Compose
- **Development:** Nodemon for hot reload

## License

MIT License - feel free to use this project as a starting point for your own applications.
