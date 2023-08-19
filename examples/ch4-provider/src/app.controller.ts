import { Controller, Get } from '@nestjs/common';
import { ServiceB } from './services/service-B';

@Controller()
export class AppController {
  constructor(private readonly serviceB: ServiceB) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/serviceB')
  getHelloFromServiceB(): string {
    return this.serviceB.getHello();
  }
}
