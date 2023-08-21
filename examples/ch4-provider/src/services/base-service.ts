import { ServiceA } from './service-A';
import { Inject } from '@nestjs/common';

// @Injectable()이 선언되어 있지 않습니다. BaseService 클래스를 직접 참조하지 않기 때문입니다.
export class BaseService {
  // 상속관계에서 생성자 기반 주입을 받을 때
  // constructor(private readonly serviceA: ServiceA) {}

  // 상속관계에서 속성 기반 주입을 받을 때
  @Inject(ServiceA)
  private readonly serviceA: ServiceA;

  getHello(): string {
    return 'Hello World BASE!';
  }

  doSomeFuncFromA(): string {
    console.log('Call BaseService.doSomeFuncFromA()');
    return this.serviceA.getHello();
  }
}
