import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Zemlja=new Schema(

    {
        ime:{
            type:String
        },
        zastava:{
            type:String
        },
        br_sportista:{
            type:Number
        }
      
    }
)
export default mongoose.model('Zemlja',Zemlja,'zemlje');