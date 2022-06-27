import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Rezultat_ekipa=new Schema(

    {
        idT:{
            type:Number
        },
        TIM1:{
            type:Number
        },
        TIM2:{
            type:Number
        },
        faza:{
            type:String
        },
        rezultat:{
            type:String
        }
      
    }
)
export default mongoose.model('Rezultat_ekipa',Rezultat_ekipa,'rezultati_ekipa');