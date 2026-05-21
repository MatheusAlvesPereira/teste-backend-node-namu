import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActivitiesModule } from './activities/activities.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { ParticipationsModule } from './participations/participations.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
    ProgramsModule,
    ActivitiesModule,
    ParticipationsModule,
  ],
})
export class AppModule {}
