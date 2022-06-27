import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Korisnik=new Schema(

    {
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        korime:{
            type:String
        },
        lozinka:{
            type:String
        },
        tip:{
            type:String
        },
        zemlja:{
            type:String
        },
        eposta:{
            type:String
        },
        status:{
            type:String
        }
    }
)
export default mongoose.model('Korisnik',Korisnik,'korisnici');