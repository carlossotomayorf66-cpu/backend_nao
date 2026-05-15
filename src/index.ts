import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './infrastructure/routes.js';
import { testConnection } from './infrastructure/database/mysql.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Probar conexión a DB
testConnection();

// Rutas de la API
app.use('/api', routes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API de Empresa Gaby funcionando correctamente' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor de Empresa Gaby corriendo en: http://localhost:${PORT}
  🛠️  Entorno: ${process.env.NODE_ENV}
  `);
});
