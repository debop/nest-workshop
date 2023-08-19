import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceA {
  getHello(): string {
    console.log('Call ServiceA.getHello()');
    return 'Hello World A!';
  }
}
