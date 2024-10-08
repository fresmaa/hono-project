import { Client } from 'pg';

export const client = new Client({
  host: process.env.DB_HOST!,
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  port: Number(process.env.DB_PORT!),
});
