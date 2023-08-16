import { BadRequestException } from '@nestjs/common';

function deco(value: string) {
  console.log('decorator called');
  return function (target: any, propertyKey: string, description: PropertyDescriptor) {
    console.log(value);
  };
}

class TestClass {
  @deco('HELLO')
  test() {
    console.log('테스트 함수 실행');
  }
}

const t = new TestClass();
t.test();

//
// Class Decorator
//

function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = 'http://www.example.com/report';
  };
}

@reportableClassDecorator
class BugReport {
  type = 'report';
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

const bug = new BugReport('Needs dark mode');
console.log(bug);

//
// Method Decorator
//
function HandleError() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      try {
        original.apply(this, args);
      } catch (e) {
        console.error(`Error from ${propertyKey}: ${e}`);
      }
    };
  };
}

class Greeter {
  @HandleError()
  hello() {
    throw new Error('테스트 에러');
  }
}

const g = new Greeter();
g.hello();

//
// Accessor decorator
//
function Enumerable(enumeable: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = enumeable;
  };
}

class Person {
  constructor(private name: string) {}

  @Enumerable(true)
  get getName() {
    return this.name;
  }

  @Enumerable(false)
  set setName(name: string) {
    this.name = name;
  }
}

const person = new Person('Debop');
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

//
// 속성 Decorator
//
function Format(formatString: string) {
  return function (target: any, propertyKey: string): any {
    let value = target[propertyKey];

    function getter(): string {
      return `${formatString} ${value}`;
    }

    function setter(newVal: string) {
      value = newVal;
    }

    return {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    };
  };
}

class Greeter2 {
  @Format('Hello')
  greeting: string;
}

const g2 = new Greeter2();
g2.greeting = 'World';
console.log(g2.greeting);

//
// Parameter Decorator
//
function MinLength(min: number) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    target.validators = {
      minLength: function (args: string[]) {
        return args[parameterIndex].length > min;
      },
    };
  };
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    Object.keys(target.validators).forEach((key) => {
      if (!target.validators[key](args)) {
        throw new BadRequestException();
      }
    });
    method.apply(this, args);
  };
}

class User3 {
  private name: string;

  @Validate
  setName(@MinLength(3) name: string) {
    this.name = name;
  }
}

const u3 = new User3();
u3.setName('Debop');
console.log('-------------------');
u3.setName('De');
