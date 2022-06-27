import express from 'express';
import Korisnik from '../models/korisnik';

export class KorisnikController{

    prijava(req:express.Request,res:express.Response){

        let korime=req.body.korime;
        let lozinka=req.body.lozinka;

        Korisnik.findOne({'korime':korime,'lozinka':lozinka},(err,korisnik)=>{

            if(err)
            console.log(err);
            else
            res.json(korisnik);

            

        })
    }
    dohvati_vodju(req:express.Request,res:express.Response){
       
        let zemlja=req.body.zemlja;
        Korisnik.findOne({'zemlja':zemlja,'tip':"vodja",'status':"prihvacen"},(err,korisnik)=>{
            if(err)
            console.log(err);
            else
            res.json(korisnik);

        })

    }
    dohvati_delegate(req:express.Request,res:express.Response){
        Korisnik.find({'tip':'delegat','status':'prihvacen'},(err,delegati)=>{
            if(err)
            console.log(err);
            else
            res.json(delegati);
        })
    }

    dohvati_korisnika(req:express.Request,res:express.Response){
       
        let korime=req.body.korime;
        Korisnik.findOne({'korime':korime},(err,korisnik)=>{
            if(err)
            console.log(err);
            else
            res.json(korisnik);

        })

    }
    dohvati_korisnika2(req:express.Request,res:express.Response){
       
        let korime=req.body.korime;
        let lozinka=req.body.lozinka;
        Korisnik.findOne({'korime':korime,'lozinka':lozinka,'status':"prihvacen"},(err,korisnik)=>{
            if(err)
            console.log(err);
            else
            res.json(korisnik);

        })

    }

    unesti_zahtev_registracija(req:express.Request,res:express.Response){
            let korisnik=new Korisnik(req.body)
            korisnik.save();
    }

    azuriraj_lozinku(req:express.Request,res:express.Response){

        let korime=req.body.korime;
        let lozinka=req.body.lozinka;
        Korisnik.collection.updateOne({"korime":korime},{$set:{"lozinka":lozinka}})

    }

    dohvati_zahteve_za_registraciju(req:express.Request,res:express.Response){
        Korisnik.find({'status':"cekanje"},(err,korisnici)=>{
            if(err)
            console.log(err);
            else
            res.json(korisnici);
        })

    }
    odobri_korisnika(req:express.Request,res:express.Response){
        let korime=req.body.korime;

        Korisnik.collection.updateOne({'korime':korime},{$set:{'status':"prihvacen"}})

    }

}