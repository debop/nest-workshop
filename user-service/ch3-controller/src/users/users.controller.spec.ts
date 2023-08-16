import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create user', async () => {
    await controller.create({ name: 'debop', email: 'debop@wrtn.io', password: 'password' });
  });

  it('verify email', async () => {
    await controller.verifyEmail({ signupVerifyToken: 'TEST_TOKEN' });
  });
});
