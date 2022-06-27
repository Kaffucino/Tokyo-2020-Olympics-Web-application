import express from 'express';
import Rezultati_ekipa from '../models/rezultati_ekipa';
import Rezultat from '../models/rezultat';

export class RezultatController{

    unesi_rezultat(req:express.Request,res:express.Response){
        
        let idT=req.body.idT;
        let ucesnik=req.body.ucesnik;
        let faza=req.body.faza;
        let rezultat2=req.body.rezultat;
        let rank=req.body.rank;
        Rezultat.findOne({'idT':parseInt(idT),'ucesnik':parseInt(ucesnik),'faza':faza,'rezultat':rezultat2,'rank':rank},(err,rez)=>{

            if(err)
            console.log(err);
            else{

                if(!rez){
                    let rezultat=new Rezultat(req.body);
                    rezultat.save().catch().then();
                }

            }

        })

        
            
    }
    dohvati_rezultate(req:express.Request,res:express.Response){
        let idT=req.body.idT;
       
        Rezultat.find({'idT':parseInt(idT),'rank':{$in:[1,2,3]}},(err,rezultati)=>{
            if(err)
            console.log(err);
            else
            res.json(rezultati);
        })

    }

    dohvati_serije(req:express.Request,res:express.Response){
        let idT=req.body.idT;
       
        Rezultat.find({'idT':parseInt(idT)},(err,rezultati)=>{
            if(err)
            console.log(err);
            else
            res.json(rezultati);
        })
    }

    // azuriraj_rank(req:express.Request,res:express.Response){
    //     let idT=req.body.idT;
    //     let idS=req.body.idS;
    //     let rank=req.body.rank;
    //     let faza=req.body.faza;
        

    //     Rezultat.collection.updateOne({'idT':parseInt(idT),'ucesnik':parseInt(idS),'faza':faza},{$set:{'rank':parseInt(rank)}}).then()
            
        

    // }

     azuriraj_rank(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        let ucesnici=req.body.ucesnici;
        let index=req.body.index;
        let faza=req.body.faza;

        let rank=1;
        let cnt=0;
        ucesnici.forEach((element: string) => {

            Rezultat.collection.updateOne({idT:parseInt(idT),ucesnik: parseInt(element),faza:faza},{$set:{rank:rank}})
            cnt++;
            if(cnt!=index)
            rank++;

        });

            
        

    }




    unesi_rezultat_ekipa(req:express.Request,res:express.Response){
        let rezultat=new Rezultati_ekipa(req.body);
        rezultat.save().catch();
    }

    dohvati_rezultate_ekipa(req:express.Request,res:express.Response){
        
        let idT=req.body.idT;
        let faza=req.body.faza;
        Rezultati_ekipa.find({'idT':parseInt(idT),'faza':faza},(err,rezultati)=>{
            if(err)
            console.log(err);
            else
            res.json(rezultati)
        })

    }



}