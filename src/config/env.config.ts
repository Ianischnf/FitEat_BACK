import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/fiteat_db',
    port: parseInt(process.env.PORT, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
}));
