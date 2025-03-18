import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}
  async getList(): Promise<{ items: UserEntity[] }> {
    const items = await this.userEntityRepository.find();

    return { items };
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({ where: { username } });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return this.userEntityRepository.save(user);
  }
}
