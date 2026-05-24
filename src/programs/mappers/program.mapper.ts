import { Program } from '../../database/entities/program.entity';
import { ProgramResponseDto } from '../dto/program-response.dto';

export function toProgramResponse(program: Program): ProgramResponseDto {
  return {
    id: program.id,
    name: program.name,
    description: program.description,
    category: program.category,
    duration_weeks: program.durationWeeks,
    created_at: program.createdAt,
    updated_at: program.updatedAt,
  };
}
