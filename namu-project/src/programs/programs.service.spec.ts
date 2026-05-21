import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../database/entities/activity.entity';
import { Participation } from '../database/entities/participation.entity';
import { Program } from '../database/entities/program.entity';
import { ProgramCategory } from './enums/program-category.enum';
import { ProgramsService } from './programs.service';

describe('ProgramsService', () => {
  let service: ProgramsService;
  let programsRepository: jest.Mocked<Partial<Repository<Program>>>;
  let activitiesRepository: jest.Mocked<Partial<Repository<Activity>>>;
  let participationsRepository: jest.Mocked<Partial<Repository<Participation>>>;

  const mockProgram: Program = {
    id: 1,
    name: 'Mindfulness',
    description: 'Desc',
    category: ProgramCategory.MEDITACAO,
    durationWeeks: 4,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-02'),
    activities: [],
  };

  beforeEach(async () => {
    programsRepository = {
      create: jest.fn().mockImplementation((data) => ({ ...mockProgram, ...data })),
      save: jest.fn().mockResolvedValue(mockProgram),
      findAndCount: jest.fn().mockResolvedValue([[mockProgram], 1]),
      findOne: jest.fn().mockResolvedValue(mockProgram),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    activitiesRepository = {
      count: jest.fn().mockResolvedValue(2),
    };

    const queryBuilder = {
      innerJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(3),
      getRawMany: jest.fn().mockResolvedValue([
        { user_name: 'Ana Silva', participation_count: '2' },
        { user_name: 'Carlos Santos', participation_count: '1' },
      ]),
    };

    participationsRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramsService,
        { provide: getRepositoryToken(Program), useValue: programsRepository },
        { provide: getRepositoryToken(Activity), useValue: activitiesRepository },
        {
          provide: getRepositoryToken(Participation),
          useValue: participationsRepository,
        },
      ],
    }).compile();

    service = module.get(ProgramsService);
  });

  it('should create a program with mapped response', async () => {
    const result = await service.create({
      name: 'Mindfulness',
      category: ProgramCategory.MEDITACAO,
      duration_weeks: 4,
    });

    expect(result).toEqual({
      id: 1,
      name: 'Mindfulness',
      description: 'Desc',
      category: ProgramCategory.MEDITACAO,
      duration_weeks: 4,
      created_at: mockProgram.createdAt,
      updated_at: mockProgram.updatedAt,
    });
  });

  it('should throw when program is not found', async () => {
    programsRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('should build summary with totals and top participants', async () => {
    const summary = await service.getSummary(1);

    expect(summary).toEqual({
      program_id: 1,
      total_activities: 2,
      total_participations: 3,
      top_participants: [
        { user_name: 'Ana Silva', participation_count: 2 },
        { user_name: 'Carlos Santos', participation_count: 1 },
      ],
    });

    expect(participationsRepository.createQueryBuilder).toHaveBeenCalled();
    expect(activitiesRepository.count).toHaveBeenCalledWith({ where: { programId: 1 } });
  });
});
