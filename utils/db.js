import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
console.log("Connecting with DB URL:", process.env.DRIZZLE_DB_URL);
const sql = neon(process.env.DRIZZLE_DB_URL);
console.log("DB URL:", sql);
export const db = drizzle(sql,{schema});
