import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '../common/utils/paginate';
import { Activity } from '../database/entities/activity.entity';
import { ProgramsService } from '../programs/programs.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { toActivityResponse } from './mappers/activity.mapper';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
    private readonly programsService: ProgramsService,
  ) {}

  async create(programId: number, dto: CreateActivityDto) {
    await this.programsService.ensureExists(programId);

    const activity = this.activitiesRepository.create({
      programId,
      title: dto.title,
      description: dto.description ?? null,
      dayOfWeek: dto.day_of_week,
      durationMinutes: dto.duration_minutes,
    });

    const saved = await this.activitiesRepository.save(activity);
    return toActivityResponse(saved);
  }

  async findAllByProgram(programId: number, page = 1, limit = 10) {
    await this.programsService.ensureExists(programId);

    const [activities, total] = await this.activitiesRepository.findAndCount({
      where: { programId },
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginate(
      activities.map(toActivityResponse),
      total,
      page,
      limit,
    );
  }

  async findOne(programId: number, activityId: number) {
    const activity = await this.getActivityOrFail(programId, activityId);
    return toActivityResponse(activity);
  }

  async update(
    programId: number,
    activityId: number,
    dto: UpdateActivityDto,
  ) {
    const activity = await this.getActivityOrFail(programId, activityId);

    if (dto.title !== undefined) activity.title = dto.title;
    if (dto.description !== undefined) activity.description = dto.description;
    if (dto.day_of_week !== undefined) activity.dayOfWeek = dto.day_of_week;
    if (dto.duration_minutes !== undefined) {
      activity.durationMinutes = dto.duration_minutes;
    }

    const saved = await this.activitiesRepository.save(activity);
    return toActivityResponse(saved);
  }

  async remove(programId: number, activityId: number): Promise<void> {
    const activity = await this.getActivityOrFail(programId, activityId);
    await this.activitiesRepository.remove(activity);
  }

  async ensureExists(activityId: number): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({
      where: { id: activityId },
    });

    if (!activity) {
      throw new NotFoundException(`Activity with id ${activityId} not found`);
    }

    return activity;
  }

  private async getActivityOrFail(
    programId: number,
    activityId: number,
  ): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({
      where: { id: activityId, programId },
    });

    if (!activity) {
      throw new NotFoundException(
        `Activity with id ${activityId} not found for program ${programId}`,
      );
    }

    return activity;
  }
}
