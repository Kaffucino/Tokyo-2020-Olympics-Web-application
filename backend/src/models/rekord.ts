import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Rekord=new Schema(

    {
        sport:{
            type:String
        },
        disciplina:{
            type:String
        },
        pol:{
            type:String
        },
        godina:{
            type:String
        },
        mesto:{
            type:String
        },
        takmicar:{
            type:String
        },
        nacionalnost:{
            type:String
        },
        rekord:{
            type:String
        }

      
    }
)
export default mongoose.model('Rekord',Rekord,'rekordi');