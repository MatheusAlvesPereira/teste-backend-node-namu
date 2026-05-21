import { Participation } from '../../database/entities/participation.entity';
import { ParticipationResponseDto } from '../dto/participation-response.dto';

export function toParticipationResponse(
  participation: Participation,
): ParticipationResponseDto {
  return {
    id: participation.id,
    user_name: participation.userName,
    activity_id: participation.activityId,
    completed_at: participation.completedAt,
    notes: participation.notes,
  };
}
