import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeDB = async () => {
  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    
    // Read the schema.sql file
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema script...');
    await pool.query(sql);
    
    console.log('✅ Database schema created successfully!');
  } catch (error) {
    console.error('❌ Error executing schema:', error.message);
  } finally {
    pool.end();
  }
};

initializeDB();
