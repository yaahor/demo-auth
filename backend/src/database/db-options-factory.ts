import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export function dbOptionsFactory(
  configService: ConfigService,
): TypeOrmModuleOptions & PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: configService.getOrThrow('DATABASE_HOST'),
    port: configService.getOrThrow('DATABASE_PORT'),
    username: configService.getOrThrow('DATABASE_USER'),
    password: configService.getOrThrow('DATABASE_PASSWORD'),
    database: configService.getOrThrow('DATABASE_DATABASE'),
    entities: ['dist/backend/src/database/**/*.entity.js'],
    migrations: ['dist/backend/src/database/migrations/*.js'],
    synchronize: false,
    migrationsRun: true,
  };
}
