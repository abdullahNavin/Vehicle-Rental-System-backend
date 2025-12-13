import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
    port: process.env.PORT || 5000,
    connectionString: process.env.CONNECTION_STRING || '',
    jwtSecret:process.env.JWT_SECRET
}

export default config;