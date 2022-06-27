import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Nosilac=new Schema(

    {
        idT:{
            type:Number
        },
        nosioci:{
            type:Array
        }
      
    }
)
export default mongoose.model('Nosilac',Nosilac,'nosioci');