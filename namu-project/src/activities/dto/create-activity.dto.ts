import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateActivityDto {
  @ApiProperty({ example: 'Respiração Consciente' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'Exercício de respiração para acalmar a mente.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: DayOfWeek, example: DayOfWeek.SEGUNDA })
  @IsEnum(DayOfWeek)
  day_of_week: DayOfWeek;

  @ApiProperty({ example: 15, minimum: 1 })
  @IsInt()
  @Min(1)
  duration_minutes: number;
}
