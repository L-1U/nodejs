const { DataSource } = require('typeorm');
const { User } = require('./entities/User');
const { Post } = require('./entities/Post');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password123',
    database: process.env.DB_NAME || 'example_db',
    synchronize: false, // We use init.sql for schema
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Post],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource };
