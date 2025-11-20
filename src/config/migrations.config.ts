import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';
import { InitSeeder } from '../database/seeders';

config({ path: '.env' });

const options = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/database/migrations/**/*.ts'],
  seeds: [InitSeeder],
  extra: {
    charset: 'utf8mb4_general_ci',
  },
};

export const source = new DataSource(options as DataSourceOptions & SeederOptions);
