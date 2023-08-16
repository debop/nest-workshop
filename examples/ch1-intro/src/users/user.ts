interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John',
  age: 30,
};

class User2 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const user2: User2 = new User2('John', 30);
