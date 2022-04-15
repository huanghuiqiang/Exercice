

/**
 * 元组转成数组
 * @param elements 
 * @returns elements
 */
function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}


export {
  tuplify
}
