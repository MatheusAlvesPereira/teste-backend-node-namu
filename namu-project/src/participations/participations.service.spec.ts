import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivitiesService } from '../activities/activities.service';
import { Participation } from '../database/entities/participation.entity';
import { ParticipationsService } from './participations.service';

describe('ParticipationsService', () => {
  let service: ParticipationsService;
  let participationsRepository: jest.Mocked<Partial<Repository<Participation>>>;
  let activitiesService: { ensureExists: jest.Mock };

  const mockParticipation: Participation = {
    id: 10,
    userName: 'Ana Silva',
    activityId: 1,
    completedAt: new Date('2025-01-15T08:00:00.000Z'),
    notes: 'Ótima sessão',
    activity: null as never,
  };

  beforeEach(async () => {
    participationsRepository = {
      create: jest.fn().mockReturnValue(mockParticipation),
      save: jest.fn().mockResolvedValue(mockParticipation),
      findOne: jest.fn().mockResolvedValue(mockParticipation),
    };

    activitiesService = {
      ensureExists: jest.fn().mockResolvedValue({ id: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipationsService,
        {
          provide: getRepositoryToken(Participation),
          useValue: participationsRepository,
        },
        { provide: ActivitiesService, useValue: activitiesService },
      ],
    }).compile();

    service = module.get(ParticipationsService);
  });

  it('should reject participation when activity does not exist', async () => {
    activitiesService.ensureExists.mockRejectedValue(
      new NotFoundException('Activity with id 99 not found'),
    );

    await expect(
      service.create({
        user_name: 'Ana Silva',
        activity_id: 99,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should register participation for existing activity', async () => {
    const result = await service.create({
      user_name: 'Ana Silva',
      activity_id: 1,
      notes: 'Ótima sessão',
    });

    expect(activitiesService.ensureExists).toHaveBeenCalledWith(1);
    expect(result.user_name).toBe('Ana Silva');
    expect(result.activity_id).toBe(1);
  });
});
