
const a = 10;
const b: string = "";
const c: object = {};


function test() {
  const response: string = 'this is a string';
  const age: number = 10;
  
  return tuplify(response, age);
}

const item = test();

const [response] = item;


function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}

// const res = tuplify(['234', 234])
