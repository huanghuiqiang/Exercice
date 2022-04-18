/*
 * @Author: huanghq 
 * @Date: 2022-04-15 17:09:45 
 * @Last Modified by: huanghq
 * @Last Modified time: 2022-04-18 10:08:51
 * 享元模式
 */

 interface Shape {
   draw(): void;
 }

 // 创建接口实体类
 class Circle implements Shape {
    color: string;
    x: number;
    y: number;
    radius: number;

    public Circle(color: string): void {
      this.color = color;
    }

    public setX(x: number): void {
      this.x = x;
    }

    public setY(y: number): void {
      this.y = y;
    }

    public setRadius(radius: number): void {
      this.radius = radius;
    }

     public draw(): void {
       console.log("color:", this.color,  this.x, this.y);
     }

 }