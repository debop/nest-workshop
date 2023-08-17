import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceC {
  getHello(): string {
    return 'Hello World C!';
  }
}
