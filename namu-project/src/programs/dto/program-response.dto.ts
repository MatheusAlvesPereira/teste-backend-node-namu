import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProgramCategory } from '../enums/program-category.enum';

export class ProgramResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty({ enum: ProgramCategory })
  category: ProgramCategory;

  @ApiProperty()
  duration_weeks: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
