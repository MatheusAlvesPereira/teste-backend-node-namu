import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { Participation } from './entities/participation.entity';
import { Program } from './entities/program.entity';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'namu_wellness',
  entities: [Program, Activity, Participation],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
