import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Rezultat=new Schema(

    {
        idT:{
            type:Number
        },
        ucesnik:{
            type:Number
        },
        faza:{
            type:String
        },
        rezultat:{
            type:String
        },
        rank:{
            type:Number
        }
      
    }
)
export default mongoose.model('Rezultat',Rezultat,'rezultati');