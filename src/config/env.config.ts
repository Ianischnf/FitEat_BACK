import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    mongoUri: process.env.MONGO_URI   as string || 'mongodb://localhost:27017/fiteat_db',
    port: parseInt(process.env.PORT   as string, 10) || 3000,
    jwtSecret: process.env.JWT_SECRET as string|| 'default_secret_key',
}));
