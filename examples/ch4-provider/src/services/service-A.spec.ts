import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA } from './service-A';
import { ServiceB } from './service-B';
import { BaseService } from './base-service';

describe('ServiceA', () => {
  let provider: ServiceA;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA, ServiceB, BaseService],
    }).compile();

    provider = module.get<ServiceA>(ServiceA);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('getHello', () => {
    expect(provider.getHello()).toEqual('Hello World A!');
  });
});
