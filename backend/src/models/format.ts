import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Format=new Schema(

    {
        sport:{
            type:String
        },
        disciplina:{
            type:String
        },
        vrsta:{
            type:String
        },     
        tacno:{
            type:Boolean
        }
        ,
        format:{
            type:String
        },
        pokusaji:{
            type:Number
        }
      
    }
)
export default mongoose.model('Format',Format,'formati');