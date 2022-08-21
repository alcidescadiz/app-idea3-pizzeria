import 'dotenv/config'
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // @ts-ignore
    port: process.env.PORTPOSTGRES,
    ssl: {  rejectUnauthorized : false  }
});