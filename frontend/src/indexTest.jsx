

//   // const x = 3      // type infer 

// import type { Admin, Circle, Negate, Rectangle, Username } from "./assets/types/Types"



//   const isAdmin: Admin = false
//   const username: Username = "gjhgcjahsg"


//   const myRectangle: Rectangle = {

//     length: 3,
//     breadth: 2,
//   }

//   const Mycircle: Circle = {
//     radius: 0,
//   }

//   interface Car {
//     dateOfMake: Date, 
//     color: string,
//     engineCapcity: number
//   }


//   const mycar: Car = {
//     dateOfMake: new Date,
//     color: "red",
//     engineCapcity: 2000
//   }

//   const myCar2 : Car = {
//     dateOfMake: new Date,
//     color: "",
//     engineCapcity: 0
//   }



//   const myCar3 : Car ={
//     dateOfMake: new Date,
//     color: "",
//     engineCapcity: 0
//   }


//   const arr = []


//   arr.push(8)
//   arr.push('jhdgjhfdsg')




//   const myNUmArr: number[] = [4, 5, 6, 7, 0, 5]
//   myNUmArr.push(67)


//   const myArr: string[] = ["apple", "mango", "bananana"]


//   myArr.length
//   myArr.includes("banana")
//   myArr.push("jhgdsahjg")



//   let User: readonly [string, boolean, number, number, boolean]

//   User = ["jfdksj", false, 5, 6, false]


//   let TwoDCoordniates: [x: number, y: number] = [5, 6]




//   TwoDCoordniates = [3, 4]





//   let ThreeDCoordniates: [x: number, y: number, z: number] = [3, 4, 7]


//   const [x, y, z] = ThreeDCoordniates

//   console.log(x + y + z)








//   function add(a: number, b: number): number {
//     return a + b
//   }

//   add(3, 6)


//   const myFunction: Negate = (a: number) => {
//     if (a > 0) {
//       return -a
//     } else {
//       return a
//     }

//   }



//   myFunction(-5)


// class Person {
//   private name: string;

//   public constructor(name: string) {
//     this.name = name;
//   }

//   public getName(): string {
//     return this.name;
//   }
// }


// const person1 = new Person("tehleeem ")


// person1.getName()


// interface Shape {
//   getArea: () => number;
// }



// class RectangleClass implements Shape {
//   public width : number
//   public height : number

//   public constructor( width: number,  height: number) {
//     this.width =  width
//     this.height = height
//   }

//   public getArea(): number {
//     return this.width * this.height;
//   }
// }




// class SquareClass extends RectangleClass{


 
// }

// const rectangle = new RectangleClass(4 , 8)
// const area  =  rectangle.getArea()

// console.log(area)



// type heroSectionProps =  {
//     username : string

// }







    // const [admin, setIsAdmin] = useState<boolean>(false)

    // const [user, setUser] = useState<User>()
    // const  [product , setProduct] = useState()

    // const [post, setPost] = useState<string>("")


    // const [count, setCount] = useState<number>(0);


    // const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');


    // // setIsAdmin(3) // u cant pass number into boolean 

    // //  setCount("sdnjfbvsdjh")   // u cant pass string in  number 


    // setCount((count) => count + 1)    // correct

    // setStatus("loading")


    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e)
    // }


    // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {


    //     console.log(e)
    // }

    // interface User {

    //     username: string,
    //     email: string,
    //     profilePic: string,
    //     isAdmin: boolean,
    //     Role: string

    // }



    // const fetchUserData = async (url: string): Promise<User> => {
    //     const res = await fetch(url);
    //     if (res.status === 200) {
    //         return await res.json() as Promise<User>
    //     } else {
    //         throw new Error("Network Error !")
    //     }
    // }


    // const fetchProductData =  async (url) =>{

    //     const res = await fetch(url)
    //       if (res.status === 200) {
    //         return await res.json() 

    // }

    // useEffect(()=>{

    //     (()=>{

    //         const productData =  await fetchProductData()

    //         setProduct(productData)


    //     })()


    // })



    // useEffect(
    //     () => {
    //         (async () => {
    //             const data = await fetchUserData("sjhfgbsjhfgshdjgf")
    //             setUser(data)
    //         })()
    //     }
    // )
