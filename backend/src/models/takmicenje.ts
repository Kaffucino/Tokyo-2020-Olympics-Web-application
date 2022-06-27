import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Takmicenje=new Schema(

    {
        idT:{
            type:Number
        },
        sport:{
            type:String
        },
        disciplina:{
            type:String
        },
        pol:{
            type:String
        },
        datum_pocetak:{
            type:String
        },
        datum_kraj:{
            type:String
        },
        lokacije:{
            type:Array
        },
        konkurencija:{
            type:String
        },
        status:{
            type:String
        }
      
    }
)
export default mongoose.model('Takmicenje',Takmicenje,'takmicenja');