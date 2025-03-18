import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbOptionsFactory } from './db-options-factory';
import { UserEntity } from './user/user.entity';
import { UserEntityService } from './user/user-entity.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: dbOptionsFactory,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserEntityService],
  exports: [UserEntityService],
})
export class DatabaseModule {}
