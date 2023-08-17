import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA } from './service-A';
import { ServiceB } from './service-B';
import { BaseService } from './base-service';

describe('ServiceB', () => {
  let provider: ServiceB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA, ServiceB, BaseService],
    }).compile();

    provider = module.get<ServiceB>(ServiceB);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('getHello', () => {
    expect(provider.getHello()).toEqual('Hello World A!');
  });
});
