import express from 'express';
import Delegat from '../models/delegat';
import Format from '../models/format';
import takmicenje from '../models/takmicenje';
import Takmicenje from '../models/takmicenje';
import Medalja from '../models/medalja'
import Nosilac from '../models/nosilac';
export class TakmicenjeController{

    unesi_takmicenje(req:express.Request,res:express.Response){
        let idT=1;
        Takmicenje.find({},(err,takmicenja)=>{

            if(err)
            console.log(err);
            else{
                
                if(takmicenja)
                idT=takmicenja.length+1;
                
                req.body.idT=idT;

                let takmicenje=new Takmicenje(req.body);
                takmicenje.save();


            }


        })


    }
    oformi_takmicenje(req:express.Request,res:express.Response){
        let sport=req.body.sport;
        let disc=req.body.disciplina;
        let pol=req.body.pol;

        Takmicenje.collection.updateOne({'sport':sport,'disciplina':disc,'pol':pol},{$set:{'status':"formirano"}})
    }

    promeni_status_takmicenja(req:express.Request,res:express.Response){

        let idT=req.body.idT;
        let status=req.body.status;

        Takmicenje.collection.updateOne({'idT':parseInt(idT)},{$set:{'status':status}})

    }


    zavrsi_takmicenje(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        Takmicenje.collection.updateOne({'idT':parseInt(idT)},{$set:{'status':"zavrseno"}})


    }


    dohvati_takmicenje(req:express.Request,res:express.Response){

        let sport=req.body.sport;
        let disciplina=req.body.disciplina;
        let pol=req.body.pol;
        Takmicenje.findOne({'sport':sport,'disciplina':disciplina,'pol':pol},(err,takmicenje)=>{
            if(err)
            console.log(err);
            else
            res.json(takmicenje)
        })

    }

    dohvati_takmicenje_idT(req:express.Request,res:express.Response){

        let idT=req.body.idT;
        Takmicenje.findOne({'idT':parseInt(idT)},(err,takmicenje)=>{
            if(err)
            console.log(err);
            else
            res.json(takmicenje)
        })

    }

    dohvati_sva_takmicenja(req:express.Request,res:express.Response){
        Takmicenje.find({},(err,takmicenja)=>{
            if(err)
            console.log(err);
            else
            res.json(takmicenja);
        })

    }
    dohvati_format_takmicenja(req:express.Request,res:express.Response){
        let sport=req.body.sport;
        let disciplina=req.body.disciplina;

        Format.findOne({'sport':sport,'disciplina':disciplina},(err,format)=>{

            if(err)
            console.log(err);
            else
            res.json(format);

        })

    }
    dohvati_delegate_takmicenja(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        Delegat.findOne({'idT':parseInt(idT)},(err,delegati)=>{

            if(err)
            console.log(err);
            else
            res.json(delegati);

        })

    }
    dodaj_delegata(req:express.Request,res:express.Response){
        let idT=req.body.idT;
        let korime=req.body.delegati;

    
         Delegat.collection.updateOne({'idT':parseInt(idT)},{$push:{'delegati':korime}})


    }
    dodaj_delegata_novo(req:express.Request,res:express.Response){
    
       
    let delegat=new Delegat(req.body);
    delegat.save();
               


    }
    dohvati_takmicenja_delegata(req:express.Request,res:express.Response){

        let korime=req.body.korime;
        Delegat.find({'delegati':korime},(err,takmicenja)=>{

            if(err)
            console.log(err);
            else
            res.json(takmicenja);

        })

    }
    dohvati_medalje(req:express.Request,res:express.Response){
        
        Medalja.find({},(err,medalje)=>{
            if(err)
            console.log(err);
            else
            res.json(medalje);
        })
    }
    // azuriraj_medalje_i_rank(req:express.Request,res:express.Response){
    //     let zemlja=req.body.zemlja;
    //     let zlato=req.body.zlato;
    //     let srebro=req.body.srebro;
    //     let bronza=req.body.bronza;
    //     let br_medalja=req.body.br_medalja;
    //     let rank=req.body.rank;

    //     Medalja.collection.updateOne({'ime':zemlja},{$set:{'zlato':zlato,'srebro':srebro,'bronza':bronza,'br_medalja':br_medalja,'rang':rank}})

    // }

    azuriraj_medalje_i_rank(req:express.Request,res:express.Response){
      
      let medalje=req.body.medalje;
      let zlato=req.body.zlato;
      let srebro=req.body.srebro;
      let bronza=req.body.bronza;

      Medalja.collection.updateOne({ime:zlato},{$inc:{zlato:1,br_medalja:1}})  
      Medalja.collection.updateOne({ime:srebro},{$inc:{srebro:1,br_medalja:1}})  
      Medalja.collection.updateOne({ime:bronza},{$inc:{bronza:1,br_medalja:1}})  

        let rank=1;
        

        medalje.forEach((element: string) => {
            Medalja.collection.updateOne({ime:element},{$set:{rang:rank}})
            rank++;
            
        });





    }
    dodeli_nosioce(req:express.Request,res:express.Response){
        
        let niz=req.body.nosioci
        let nosioci:number[]=[];
        niz.forEach((element: string) => {
            nosioci.push(parseInt(element))
        });

        req.body.nosioci=nosioci

        let nosilac=new Nosilac(req.body);
        nosilac.save();
    }
    dohvati_nosioice(req:express.Request,res:express.Response){
        
        let idT=req.body.idT;

        Nosilac.findOne({idT:parseInt(idT)},(err,nosilac)=>{
            if(err)
            console.log(err);
            else
            res.json(nosilac);
        })
    }

    end_takmicenje(req:express.Request,res:express.Response){
        let idT=req.body.idT;

        Takmicenje.collection.updateOne({'idT':parseInt(idT)},{$set:{'status':'end'}}).catch()
        
    }


}