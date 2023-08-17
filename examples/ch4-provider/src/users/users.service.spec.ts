import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all', () => {
    expect(service.findAll()).toBe(`This action returns all users`);
  });

  it('find one', () => {
    expect(service.findOne(1)).toBe(`This action returns a #1 user`);
    expect(service.findOne(3)).toBe(`This action returns a #3 user`);
  });

  it('update user', async () => {
    expect(service.update(1, { name: 'test', email: 'test@example.com' })).toBe(
      `This action updates a #1 user. update: {"name":"test","email":"test@example.com"}`,
    );
  });
});
