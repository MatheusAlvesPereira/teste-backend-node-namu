import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayOfWeek } from '../../activities/enums/day-of-week.enum';
import { Participation } from './participation.entity';
import { Program } from './program.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'program_id' })
  programId: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    name: 'day_of_week',
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek: DayOfWeek;

  @Column({ name: 'duration_minutes' })
  durationMinutes: number;

  @ManyToOne(() => Program, (program) => program.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @OneToMany(() => Participation, (participation) => participation.activity)
  participations: Participation[];
}
