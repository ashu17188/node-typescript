
export const environment = process.env.NODE_ENV;
export const port = process.env.SERVER_PORT || 8080;

export const db = {
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export const MONGODB_URI =  process.env.MONGODB_URI || '';


