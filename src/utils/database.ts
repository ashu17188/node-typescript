import { createPool, Pool } from 'mysql2/promise'
import {db} from '../config';
export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: db.host,
        user: db.user,
        password: db.password,
        database: db.schema,
        connectionLimit: 10
    });
    return connection;
}