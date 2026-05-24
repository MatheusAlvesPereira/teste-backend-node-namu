import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from './activity.entity';

@Entity('participations')
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name', length: 255 })
  userName: string;

  @Column({ name: 'activity_id' })
  activityId: number;

  @CreateDateColumn({ name: 'completed_at' })
  completedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @ManyToOne(() => Activity, (activity) => activity.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;
}
