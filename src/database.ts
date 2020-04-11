import { createPool, Pool } from 'mysql2/promise'

export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'mydsn',
        connectionLimit: 10
    });
    return connection;
}