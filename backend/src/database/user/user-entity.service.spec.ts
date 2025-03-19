import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntityService } from './user-entity.service';
import { UserEntity } from './user.entity';

describe(UserEntityService.name, () => {
  let service: UserEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserEntityService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserEntityService>(UserEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
