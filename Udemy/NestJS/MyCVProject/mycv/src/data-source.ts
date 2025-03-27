import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'mysql',
  synchronize: false,
  database: 'mycv_db',
  host: 'localhost',
  port: 3306,
  username: 'mycv',
  password: 'mycv',
  entities: [__dirname + '/src/**/*.entity*{.js,.ts}'],
  migrations: [__dirname + '/migrations/*.js'],
  subscribers: [__dirname + '/dist/subscribers/**/*.ts'],
} as DataSourceOptions);
