import type { Action } from "@reduxjs/toolkit"

export type Admin = boolean
export type Username = string

export type MyCar = {
    dateOfMaking : number,
    color : string ,
    cost : number,
    anyRepairingCost : number
}


export type Password = string

export  type Negate = (a : number) => number


export interface Rectangle {
    length: number,
    breadth: number,
    diagonal?: number
}

export interface Circle {
    radius: number,
    area?: number
}



 export  interface User {
   
    userId : string,
    username: string,
    email: string,
    role: number,
    createdAt?: Date,
    updatedAt?: Date,
    loading? : boolean,
    profilePicUrl? : string,
    phone? : string
  
}




export interface userForm {
    username ? :  string 
    email : string
    password : string
}



export interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  oldPrice: string;
  sold: number;
  rating: number;
  onSale: boolean;
  category : string
}



export type Dispatch = React.Dispatch<Action>;



export type ApiResult<T> = {
  payload?: T;
  message: string;
};