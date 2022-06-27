import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Ekipa=new Schema(

    {   
        idE:{
            type:Number
        },
        zemlja:{
            type:String
        },
        pol:{
            type:String
        },
        sport:{
            type:String
        },
        disciplina:{
            type:String
        },
        clanovi:{
            type:Array
        },
        status:{
            type:String
        },
        grupa:{
            type:String
        },
        rank:{
            type:Number
        }
      
    }
)
export default mongoose.model('Ekipa',Ekipa,'ekipe');