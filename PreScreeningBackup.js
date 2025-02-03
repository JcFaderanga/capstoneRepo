class Person {
    constructor(name, age) {
      this.name = name; // Property
      this.age = age;   // Property
    }
  
    greet() { // Method
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
  }
  
  // Creating an object (instance) of the class
  const person1 = new Person("John", 25);
  person1.greet(); // Output: Hello, my name is John and I am 25 years old.
  