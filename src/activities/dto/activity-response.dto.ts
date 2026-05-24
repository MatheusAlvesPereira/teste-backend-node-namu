import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class ActivityResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  program_id: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty({ enum: DayOfWeek })
  day_of_week: DayOfWeek;

  @ApiProperty()
  duration_minutes: number;
}
