// db.js
import 'dotenv/config'; // Carrega o DATABASE_URL do .env
import { neon } from '@neondatabase/serverless';

// Exporta a conexão para ser usada em outros arquivos
export const sql = neon(process.env.DATABASE_URL);