import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoachesModule } from './coaches/coaches.module';
import { AuthModule } from './auth/auth.module';
import envConfig from './config/env.config';
import { DatabaseModule } from './config/database.config';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }), // ✅ Charge le fichier env.config.ts
    ...DatabaseModule, // ✅ Utilise ConfigService dans database.config.ts
    UsersModule,
    CoachesModule,
    AuthModule,
    RegisterModule
  ],
})
export class AppModule {}
