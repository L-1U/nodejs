-- Initialize database with sample data
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (passwords are hashed versions of 'password123')
INSERT INTO users (name, email, password) VALUES 
    ('John Doe', 'john@example.com', '$2b$10$rOCVZyNQ5oGhYb8WvDjrXeKJ9oGhYb8WvDjrXeKJ9oGhYb8WvDjrXe'),
    ('Jane Smith', 'jane@example.com', '$2b$10$rOCVZyNQ5oGhYb8WvDjrXeKJ9oGhYb8WvDjrXeKJ9oGhYb8WvDjrXe'),
    ('Bob Johnson', 'bob@example.com', '$2b$10$rOCVZyNQ5oGhYb8WvDjrXeKJ9oGhYb8WvDjrXeKJ9oGhYb8WvDjrXe');

INSERT INTO posts (title, content, user_id) VALUES 
    ('First Post', 'This is the content of the first post', 1),
    ('Second Post', 'This is the content of the second post', 2),
    ('Third Post', 'This is the content of the third post', 1);
