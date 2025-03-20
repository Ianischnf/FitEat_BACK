import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseModule = [
    ConfigModule.forRoot({ isGlobal: true }),  // ✅ Charge les variables d'environnement
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/fiteat_db',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }),
    }),
];
