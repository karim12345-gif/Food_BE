export interface ICreateFoodInput {
    name: string;
    description: string;
    category: string;
    foodType:string;
    readyTime:string;
    pickUpTime:string
    available: boolean;
    price: number;
}