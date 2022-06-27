import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Raspored=new Schema(

    {
        idT:{
            type:Number
        },
        datum:{
            type:String
        },
        vreme:{
            type:String
        },
        lokacija:{
            type:String
        },
        faza:{
            type:String
        },
        zavrseno:{
            type:Boolean
        }
      
    }
)
export default mongoose.model('Raspored',Raspored,'rasporedi');