import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CoachesModule } from '../coaches/coaches.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RegisterController } from './register-controller';
import { RegisterService } from './register-service';

@Module({
  imports: [
    UsersModule,
    CoachesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, JwtStrategy],
})
export class RegisterModule {}
