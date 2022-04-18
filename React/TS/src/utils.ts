

/**
 * 元组转成数组
 * @param elements 
 * @returns elements
 */
function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}

/**
 * 接口重构类型
 */
interface NewableFunction extends Function {
    /**
     * Calls the function with the specified object as the this value and the elements of specified array as the arguments.
     * @param thisArg The object to be used as the this object.
     * @param args An array of argument values to be passed to the function.
     */
    apply<T>(this: new () => T, thisArg: T): void;
    apply<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, args: A): void;

    bind<T>(this: T, thisArg: any): T;
    bind<A0, A extends any[], R>(this: new (arg0: A0, ...args: A) => R, thisArg: any, arg0: A0): new (...args: A) => R;
    bind<A0, A1, A extends any[], R>(this: new (arg0: A0, arg1: A1, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1): new (...args: A) => R;
    bind<A0, A1, A2, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2): new (...args: A) => R;
    bind<A0, A1, A2, A3, A extends any[], R>(this: new (arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2, arg3: A3): new (...args: A) => R;
    bind<AX, R>(this: new (...args: AX[]) => R, thisArg: any, ...args: AX[]): new (...args: AX[]) => R;
}

 
export {
  tuplify, 
  NewableFunction
}
