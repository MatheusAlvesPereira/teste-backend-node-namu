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
import { ProgramCategory } from '../enums/program-category.enum';

export class CreateProgramDto {
  @ApiProperty({ example: 'Mindfulness para Iniciantes' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'Programa de meditação guiada para iniciantes.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ProgramCategory, example: ProgramCategory.MEDITACAO })
  @IsEnum(ProgramCategory)
  category: ProgramCategory;

  @ApiProperty({ example: 4, minimum: 1 })
  @IsInt()
  @Min(1)
  duration_weeks: number;
}
