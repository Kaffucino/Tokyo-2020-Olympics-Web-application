import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Sport=new Schema(

    {
        naziv:{
            type:String
        },
        disciplina:{
            type:String
        },
        vrsta:{
            type:String
        },
        min_max:{
            type:String
        },
        status:{
            type:Boolean
        }
      
    }
)
export default mongoose.model('Sport',Sport,'sportovi');