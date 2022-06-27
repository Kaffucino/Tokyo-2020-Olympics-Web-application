import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Medalja=new Schema(

    {
        rang:{
            type:Number
        },
        ime:{
            type:String
        },
        zlato:{
            type:Number
        },
        srebro:{
            type:Number
        },
        bronza:{
            type:Number
        },
        br_medalja:{
            type:Number
        }
      
    }
)
export default mongoose.model('Medalja',Medalja,'medalje');