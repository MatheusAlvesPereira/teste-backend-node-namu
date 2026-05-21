import { ApiProperty } from '@nestjs/swagger';

export class TopParticipantDto {
  @ApiProperty({ example: 'Ana Silva' })
  user_name: string;

  @ApiProperty({ example: 2 })
  participation_count: number;
}

export class ProgramSummaryDto {
  @ApiProperty({ example: 1 })
  program_id: number;

  @ApiProperty({ example: 2 })
  total_activities: number;

  @ApiProperty({ example: 3 })
  total_participations: number;

  @ApiProperty({ type: [TopParticipantDto] })
  top_participants: TopParticipantDto[];
}
