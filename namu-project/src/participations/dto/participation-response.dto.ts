import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParticipationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_name: string;

  @ApiProperty()
  activity_id: number;

  @ApiProperty()
  completed_at: Date;

  @ApiPropertyOptional()
  notes: string | null;
}
