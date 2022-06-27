import express from 'express';
import Raspored from '../models/raspored';

export class RasporedController{

    proveri_termin(req:express.Request,res:express.Response){

        let datum=req.body.datum;
        let vreme=req.body.vreme;
        let lokacija=req.body.lokacija;

        Raspored.findOne({'datum':datum,'vreme':vreme,'lokacija':lokacija},(err,termin)=>{
            if(err)
            console.log(err);
            else
            res.json(termin);
        })


    }
    unesi_termin(req:express.Request,res:express.Response){
        let raspored=new Raspored(req.body);
        raspored.save();
    }

    proveri_vec_uneto(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        let faza=req.body.faza;
        Raspored.findOne({'idT':parseInt(idT),'faza':faza},(err,raspored)=>{
            if(err)
            console.log(err);
            else
            res.json(raspored);
        })
    }
   

    dohvati_raspored_individ(req:express.Request,res:express.Response){

        let idT=req.body.idT;

        Raspored.findOne({'idT':parseInt(idT)},(err,raspored)=>{
            if(err)
            console.log(err);
            else
            res.json(raspored);
        })

    }
    dohvati_raspored_ekipni(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        let faza=req.body.faza;
        Raspored.find({'idT':parseInt(idT),'faza':faza},(err,raspored)=>{
            if(err)
            console.log(err);
            else
            res.json(raspored);
        })

    }

}