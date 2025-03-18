import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { dbOptionsFactory } from './db-options-factory';

config();

const configService: ConfigService = new ConfigService();

export const dataSource: DataSource = new DataSource({
  ...dbOptionsFactory(configService),
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
