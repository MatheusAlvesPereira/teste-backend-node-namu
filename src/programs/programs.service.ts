import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '../common/utils/paginate';
import { Activity } from '../database/entities/activity.entity';
import { Participation } from '../database/entities/participation.entity';
import { Program } from '../database/entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { ProgramSummaryDto } from './dto/program-summary.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { toProgramResponse } from './mappers/program.mapper';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
    @InjectRepository(Participation)
    private readonly participationsRepository: Repository<Participation>,
  ) {}

  async create(dto: CreateProgramDto) {
    const program = this.programsRepository.create({
      name: dto.name,
      description: dto.description ?? null,
      category: dto.category,
      durationWeeks: dto.duration_weeks,
    });

    const saved = await this.programsRepository.save(program);
    return toProgramResponse(saved);
  }

  async findAll(page = 1, limit = 10) {
    const [programs, total] = await this.programsRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginate(
      programs.map(toProgramResponse),
      total,
      page,
      limit,
    );
  }

  async findOne(id: number) {
    const program = await this.getProgramOrFail(id);
    return toProgramResponse(program);
  }

  async update(id: number, dto: UpdateProgramDto) {
    const program = await this.getProgramOrFail(id);

    if (dto.name !== undefined) program.name = dto.name;
    if (dto.description !== undefined) program.description = dto.description;
    if (dto.category !== undefined) program.category = dto.category;
    if (dto.duration_weeks !== undefined) {
      program.durationWeeks = dto.duration_weeks;
    }

    const saved = await this.programsRepository.save(program);
    return toProgramResponse(saved);
  }

  async remove(id: number): Promise<void> {
    const program = await this.getProgramOrFail(id);
    await this.programsRepository.remove(program);
  }

  async getSummary(programId: number): Promise<ProgramSummaryDto> {
    await this.getProgramOrFail(programId);

    const totalActivities = await this.activitiesRepository.count({
      where: { programId },
    });

    const participationCount = await this.participationsRepository
      .createQueryBuilder('participation')
      .innerJoin('participation.activity', 'activity')
      .where('activity.program_id = :programId', { programId })
      .getCount();

    const topParticipants = await this.participationsRepository
      .createQueryBuilder('participation')
      .innerJoin('participation.activity', 'activity')
      .select('participation.user_name', 'user_name')
      .addSelect('COUNT(participation.id)', 'participation_count')
      .where('activity.program_id = :programId', { programId })
      .groupBy('participation.user_name')
      .orderBy('participation_count', 'DESC')
      .addOrderBy('participation.user_name', 'ASC')
      .limit(5)
      .getRawMany<{ user_name: string; participation_count: string }>();

    return {
      program_id: programId,
      total_activities: totalActivities,
      total_participations: participationCount,
      top_participants: topParticipants.map((row) => ({
        user_name: row.user_name,
        participation_count: Number(row.participation_count),
      })),
    };
  }

  async ensureExists(programId: number): Promise<Program> {
    return this.getProgramOrFail(programId);
  }

  private async getProgramOrFail(id: number): Promise<Program> {
    const program = await this.programsRepository.findOne({ where: { id } });

    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }

    return program;
  }
}
