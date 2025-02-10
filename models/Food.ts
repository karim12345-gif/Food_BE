import mongoose, {Schema, Document, Model} from "mongoose"


interface IFoodDoc extends Document {
    vandorId:string;
    name: string;
    description: string;
    category: string;
    foodType:string;
    readyTime:string;
    pickUpTime:string
    available: boolean;
    price: number;
    rating:number;
    images:string[];
}


const FoodSchema = new Schema({
    vandorId:{type: String},
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {type:String},
    foodType:{type:String, required:true},
    readyTime:{type:String, required:true},
    pickUpTime:{type:String, required:true},
    available: { type: Boolean, required: true },
    price: { type: Number, required: true },
    rating: { type: Number },
    images: [{ type: String }]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    },
    timestamps: true
})


const Food = mongoose.model<IFoodDoc>('food',FoodSchema);

export { Food };    // Export the Food model