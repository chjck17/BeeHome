import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { NamingStrategy } from './src/common/config/typeorm.config';

require('dotenv').config();
const config: DataSourceOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  logger: 'simple-console',
  logging: false,
  migrationsTransactionMode: 'all',
  namingStrategy: new NamingStrategy(),
};

export const dataSource = new DataSource(config);
