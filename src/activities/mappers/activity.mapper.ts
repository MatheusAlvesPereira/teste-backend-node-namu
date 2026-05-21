import { Activity } from '../../database/entities/activity.entity';
import { ActivityResponseDto } from '../dto/activity-response.dto';

export function toActivityResponse(activity: Activity): ActivityResponseDto {
  return {
    id: activity.id,
    program_id: activity.programId,
    title: activity.title,
    description: activity.description,
    day_of_week: activity.dayOfWeek,
    duration_minutes: activity.durationMinutes,
  };
}
