import { Test, TestingModule } from '@nestjs/testing';
import { ServiceC } from './service-c';

describe('ServiceC', () => {
  let provider: ServiceC;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceC],
    }).compile();

    provider = module.get<ServiceC>(ServiceC);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('getHello', () => {
    expect(provider.getHello()).toBe('Hello World C!');
  });
});
