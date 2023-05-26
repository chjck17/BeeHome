import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { NamingStrategy } from './src/common/config/typeorm.config';

require('dotenv').config();
let config: DataSourceOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  extra: {
    options: '-c lock_timeout=60000ms',
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },
  // migrationsRun: true,
  migrations: ['dist/migrations/*.js'],
  logger: 'simple-console',
  logging: true,
  migrationsTransactionMode: 'all',
  namingStrategy: new NamingStrategy(),
  // ssl: true,
};

switch (process.env.NODE_ENV) {
  case 'test':
    break;

  case 'development':
    config = {
      ...config,
      migrationsRun: true,
    };
    break;

  case 'production':
    break;

  // default is local
  default:
    config = {
      ...config,
      migrationsRun: false,
      logging: true,
      synchronize: false,
    };
    break;
}
export const dataSource = new DataSource(config);
