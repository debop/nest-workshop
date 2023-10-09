import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const timestamp = new Date().getTime();
    return `Hello World! at ${timestamp}`;
  }
}
