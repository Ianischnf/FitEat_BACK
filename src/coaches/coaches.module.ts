import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coach, CoachSchema } from './schema/coach.schema';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Coach.name, schema: CoachSchema }])],
  controllers: [CoachesController],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}
