import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Delegat=new Schema(

    {
       idT:{
           type:Number
       },
       delegati:{
           type:Array
       }
      
    }
)
export default mongoose.model('Delegat',Delegat,'delegati');