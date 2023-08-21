import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('/users?offset=1&limit=10 (GET)', () => {
    return request(app.getHttpServer()).get('/users?offset=1&limit=10').expect(200);
  });

  // Validation -> BadRequestException
  it('/users?offset=abc&limit=abc (GET)', () => {
    return request(app.getHttpServer()).get('/users?offset=abc&limit=abc').expect(400);
  });
});
