import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Zemlja_naziv=new Schema(

    {
        ime:{
            type:String
        }
        
      
    }
)
export default mongoose.model('Zemlja_naziv',Zemlja_naziv,'zemlje_nazivi');