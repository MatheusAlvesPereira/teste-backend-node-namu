import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateParticipationDto {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  user_name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  activity_id: number;

  @ApiPropertyOptional({ example: '2025-01-15T08:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  completed_at?: string;

  @ApiPropertyOptional({ example: 'Primeira sessão, muito tranquila.' })
  @IsOptional()
  @IsString()
  notes?: string;
}
