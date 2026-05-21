import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '../common/utils/paginate';
import { Participation } from '../database/entities/participation.entity';
import { ActivitiesService } from '../activities/activities.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { toParticipationResponse } from './mappers/participation.mapper';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectRepository(Participation)
    private readonly participationsRepository: Repository<Participation>,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async create(dto: CreateParticipationDto) {
    await this.activitiesService.ensureExists(dto.activity_id);

    const participation = this.participationsRepository.create({
      userName: dto.user_name,
      activityId: dto.activity_id,
      completedAt: dto.completed_at ? new Date(dto.completed_at) : undefined,
      notes: dto.notes ?? null,
    });

    const saved = await this.participationsRepository.save(participation);
    return toParticipationResponse(saved);
  }

  async findAll(page = 1, limit = 10) {
    const [participations, total] =
      await this.participationsRepository.findAndCount({
        order: { completedAt: 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

    return paginate(
      participations.map(toParticipationResponse),
      total,
      page,
      limit,
    );
  }

  async findOne(id: number) {
    const participation = await this.participationsRepository.findOne({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException(`Participation with id ${id} not found`);
    }

    return toParticipationResponse(participation);
  }
}
