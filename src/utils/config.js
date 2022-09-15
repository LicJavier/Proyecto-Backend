import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const config2 = {
    db:{
        client: 'better-sqlite3',
        connection: {
            filename: path.join( __dirname, '../../DB/mensajes.db3')
        },
        useNullAsDefault: true
    }
}

export const config ={
    db: {
        client : 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'ecommerce'
        }
    }
}