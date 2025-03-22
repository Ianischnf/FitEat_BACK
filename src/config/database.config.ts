import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseModule = [
  // Charge les variables d'environnement globalement
  ConfigModule.forRoot({
    isGlobal: true,
  }),

  // Configure la connexion à MongoDB
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get<string>('MONGO_URI'); // <- Directement depuis le .env
      console.log('📦 URI utilisée :', uri); // Log pour déboguer
      return {
        uri,
        // Plus besoin de useNewUrlParser ou useUnifiedTopology (deprecated)
      };
    },
  }),
];
