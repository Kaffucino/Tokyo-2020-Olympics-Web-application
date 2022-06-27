import express, { json } from 'express'
import Rekord from '../models/rekord';
import Lokacija from '../models/lokacija';
import Sport from '../models/sport';
import Sportista from '../models/sportista';
import Ekipa from '../models/ekipa';
import Zemlja from '../models/zemlja';

export class SportistaController{

    dohvati_rekorde(req:express.Request,res:express.Response){
        let sport=req.body.sport;
        Rekord.find({'sport':sport},(err,rekordi)=>{
            if(err)
            console.log(err);
            else
            res.json(rekordi);
        })
    }

    dohvati_sportiste_na_osnovu_zemlje(req:express.Request,res:express.Response){
        let zemlja=req.body.zemlja;
        Sportista.find({'zemlja':zemlja},(err,sportisti)=>{
            if(err)
            console.log(err);
            else
            res.json(sportisti);
        })

    }
    dohvati_sportiste_na_osnovu_sporta(req:express.Request,res:express.Response){
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;

        if(!pol)
        Sportista.find({'sport':sport,'disciplina':disciplina},(err,sportisti)=>{
            if(err)
            console.log(err);
            else
            res.json(sportisti);
        })
        else
        Sportista.find({'sport':sport,'disciplina':disciplina,'pol':pol},(err,sportisti)=>{
            if(err)
            console.log(err);
            else
            res.json(sportisti);
        })

    }
    azuriraj_rankove_ekipa(req:express.Request,res:express.Response){
        let ekipe=req.body.ekipe;
        var rank=1;
        ekipe.forEach((element: string) => {
            Ekipa.collection.findOneAndUpdate({'idE':parseInt(element)},{$set:{rank:rank}})
            rank++;
        });


    }
    dohvati_ekipe_na_osnovu_sporta(req:express.Request,res:express.Response){
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;

        Ekipa.find({'sport':sport,'disciplina':disciplina,'pol':pol},(err,sportisti)=>{
            if(err)
            console.log(err);
            else
            res.json(sportisti);
        })

    }


    unesi_sport(req:express.Request,res:express.Response){

        let naziv=req.body.naziv;
        let disciplina=req.body.disciplina;

        Sport.collection.updateOne({'naziv':naziv,'disciplina':disciplina},{$set:{'status':true}})


    }
    unesi_sportistu(req:express.Request,res:express.Response){
        let idS=1;
        Sportista.find({},(err,sportisti)=>{
            if(err)
            console.log(err);
            else{
                if(sportisti)
                idS=sportisti.length+1;

                req.body.idS=idS;

                let sportista=new Sportista(req.body);
                sportista.save();

            }
            
        })
        
    }
    promeni_status_na_rangiran(req:express.Request,res:express.Response){
        let idS=req.body.idS;
        Sportista.collection.updateOne({'idS':parseInt(idS)},{$set:{'status':"rangiran"}}).catch().then()

    }
        // prihvati_sportistu(req:express.Request,res:express.Response){
        //             let idS=req.body.idS;
        //             let zemlja=req.body.zemlja;
        //             Sportista.collection.updateOne({'idS':parseInt(idS)},{$set:{'status':"ucestvuje"}}).catch();
        //             Zemlja.collection.updateOne({'ime':zemlja},{$inc:{br_sportista:1}})

        // }

    prihvati_sportiste(req:express.Request,res:express.Response){
        let sportisti=req.body.sportisti;
        let zemlje=req.body.zemlje;
        
        Sportista.collection.updateMany({idS:{$in:sportisti}},{$set:{status:'ucestvuje'}})
        Zemlja.collection.updateMany({ime:{$in:zemlje}},{$inc:{br_sportista:1}})
        

    }



    prihvati_ekipu(req:express.Request,res:express.Response){
        let idE=req.body.idE;
        let zemlja=req.body.zemlja;
        let broj=req.body.broj;
        Ekipa.collection.updateOne({'idE':parseInt(idE)},{$set:{'status':'ucestvuje'}})
        Zemlja.collection.updateOne({'ime':zemlja},{$inc:{br_sportista:parseInt(broj)}})
    }

    unesi_ekipu(req:express.Request,res:express.Response){

        let idE=1;
        Ekipa.find({},(err,ekipe)=>{

            if(err)
            console.log(err);
            else{
                if(ekipe)
                idE=ekipe.length+1;

                req.body.idE=idE;
                let ekipa=new Ekipa(req.body);
                ekipa.save();
            }

        })


    }
    unesite_clana_ekipe(req:express.Request,res:express.Response){
        let idS=req.body.idS;
        let zemlja=req.body.zemlja;
        let pol=req.body.pol;
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;

        Ekipa.collection.updateOne({'zemlja':zemlja,'pol':pol,'sport':sport,'disciplina':disciplina},{$push:{'clanovi':parseInt(idS)}})

    }

    dodeli_grupu_ekipama(req:express.Request,res:express.Response){

        let ekipe=req.body.ekipe;
        let grupa=req.body.grupa;
        Ekipa.collection.updateMany({idE:{$in:ekipe}},{$set:{grupa:grupa}})

    }
    eliminisi_ekipe(req:express.Request,res:express.Response){
        let ekipe=req.body.ekipe;
        Ekipa.collection.updateMany({idE:{$in:ekipe}},{$set:{status:"eliminisana"}})

    }
    eliminisi_sportiste(req:express.Request,res:express.Response){
        let sportisti=req.body.sportisti;
        Sportista.collection.updateMany({idS:{$in:sportisti}},{$set:{status:"eliminisan"}})

    }
    za_trece_mesto(req:express.Request,res:express.Response){
        let ekipe=req.body.ekipe;
        Ekipa.collection.updateMany({idE:{$in:ekipe}},{$set:{status:"trece"}})

    }
    dodeli_ekipi_medalju(req:express.Request,res:express.Response){
        let ekipa=req.body.ekipa;
        let medalja=req.body.medalja;
        Ekipa.collection.updateOne({idE:parseInt(ekipa)},{$set:{status:medalja}})
    }

    dohvati_sportistu(req:express.Request,res:express.Response){

        let ime_prezime=req.body.ime_prezime;
        let zemlja=req.body.zemlja;
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        Sportista.findOne({'ime_i_prezime':ime_prezime,'zemlja':zemlja,'sport':sport,'disciplina':disciplina,'pol':pol},(err,sportista)=>{
            if(err)
            console.log(err);
            else
            res.json(sportista);
        })

    }
    dohvati_sve_sportiste(req:express.Request,res:express.Response){
        Sportista.find({},(err,sportisti)=>{
            if(err)
            console.log(err);
            else
            res.json(sportisti);
        })
    }
    dohvati_sportistu_idS(req:express.Request,res:express.Response){

        let idS=req.body.idS;
        Sportista.findOne({'idS':parseInt(idS)},(err,sportista)=>{
            if(err)
            console.log(err);
            else
            res.json(sportista);
        })

    }
    dodeli_medalju(req:express.Request,res:express.Response){
        let idS=req.body.idS;
        Sportista.updateOne({'idS':parseInt(idS)},{$set:{'medalja':true}}).catch()

    }
   
   

    dohvati_sportistu2(req:express.Request,res:express.Response){

        let ime_prezime=req.body.ime_prezime;
        let zemlja=req.body.zemlja;
        let pol=req.body.pol;
        if(zemlja!=""){
        Sportista.findOne({'ime_i_prezime':ime_prezime,'zemlja':zemlja,'pol':pol},(err,sportista)=>{
            if(err)
            console.log(err);
            else
            res.json(sportista);
        })
        }else{
            Sportista.findOne({'ime_i_prezime':ime_prezime,'pol':pol},(err,sportista)=>{
                if(err)
                console.log(err);
                else
                res.json(sportista);
            })

        }


    }
    za_trece_mesto_sportisti(req:express.Request,res:express.Response){
        let sportisti=req.body.sportisti;
        console.log(sportisti)
        Sportista.collection.updateMany({idS:{$in:sportisti}},{$set:{status:"trece"}})

    }

    dohvati_ekipu(req:express.Request,res:express.Response){

        let zemlja=req.body.zemlja;
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;

        Ekipa.findOne({'zemlja':zemlja,'sport':sport,'disciplina':disciplina,'pol':pol},(err,ekipa)=>{
            if(err)
            console.log(err);
            else
            res.json(ekipa);
        })

    }

    dohvati_sportove(req:express.Request,res:express.Response){

        Sport.find({},(err,sportovi)=>{

            if(err)
            console.log(err);
            else
            res.json(sportovi);

        })
    }
    dohvati_sport(req:express.Request,res:express.Response){
        let naziv=req.body.naziv;
        let disciplina=req.body.disciplina;

        Sport.findOne({"naziv":naziv,"disciplina":disciplina},(err,sport)=>{

            if(err)
            console.log(err);
            else
            res.json(sport);

        })
    }
    dohvati_lokacije(req:express.Request,res:express.Response){
        Lokacija.find({},(err,lokacije)=>{
            if(err)
            console.log(err);
            else
            res.json(lokacije);
        })
    }

    nadji_sportistu_ime_zemlja_sport(req:express.Request,res:express.Response){
        let ime_i_prezime=req.body.ime_i_prezime;
        let zemlja=req.body.zemlja;
        let sport=req.body.sport;

        if(ime_i_prezime==null && zemlja==null && sport==null){

            Sportista.find({},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }else if(ime_i_prezime!=null && zemlja==null && sport==null){
            Sportista.find({'ime_i_prezime':{$regex:ime_i_prezime}},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })
        }else if(ime_i_prezime!=null && zemlja!=null && sport==null){
            Sportista.find({'ime_i_prezime':ime_i_prezime,'zemlja':zemlja},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }else if(ime_i_prezime!=null && zemlja==null && sport!=null){
            Sportista.find({'ime_i_prezime':ime_i_prezime,'sport':sport},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }    else if(ime_i_prezime!=null && zemlja!=null && sport!=null){
            Sportista.find({'ime_i_prezime':ime_i_prezime,'zemlja':zemlja,'sport':sport},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }else if(ime_i_prezime==null && zemlja!=null && sport==null){
            Sportista.find({'zemlja':zemlja},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }else if(ime_i_prezime==null && zemlja!=null && sport!=null){
            Sportista.find({'zemlja':zemlja,'sport':sport},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }else if(ime_i_prezime==null && zemlja==null && sport!=null){
            Sportista.find({'sport':sport},(err,sportisti)=>{

                if(err)
                console.log(err);
                else
                res.json(sportisti)
            })

        }

        

    }
    
}