import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const dbUrl = process.env.DRIZZLE_DB_URL;

if (!dbUrl) {
    throw new Error("DRIZZLE_DB_URL environment variable is not configured.");
}

const sql = neon(dbUrl);
export const db = drizzle(sql, { schema });

