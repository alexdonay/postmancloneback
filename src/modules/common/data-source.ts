import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: ['./src/migrations/*.{ts,js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});
