import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesModule } from '../activities/activities.module';
import { Participation } from '../database/entities/participation.entity';
import { ParticipationsController } from './participations.controller';
import { ParticipationsService } from './participations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participation]), ActivitiesModule],
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
})
export class ParticipationsModule {}
