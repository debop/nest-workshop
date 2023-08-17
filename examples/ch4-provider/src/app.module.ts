import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { UsersModule } from './users/users.module';
import { BaseService } from './services/base-service';
import { ServiceA } from './services/service-A';
import { ServiceB } from './services/service-B';
import { ServiceC } from './service-c/service-c';

@Module({
  imports: [UsersModule],
  controllers: [AppController, ApiController],
  providers: [AppService, BaseService, ServiceA, ServiceB, ServiceC],
})
export class AppModule {}
