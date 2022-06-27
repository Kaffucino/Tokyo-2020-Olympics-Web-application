import express from 'express';
import { RezultatController } from '../controllers/rezultat.controller';

let RezultatRouter=express.Router();


RezultatRouter.route('/unesi_rezultat').post(
    (req,res)=>new RezultatController().unesi_rezultat(req,res)
)
RezultatRouter.route('/dohvati_rezultate').post(
    (req,res)=>new RezultatController().dohvati_rezultate(req,res)
)
RezultatRouter.route('/dohvati_serije').post(
    (req,res)=>new RezultatController().dohvati_serije(req,res)
)

RezultatRouter.route('/azuriraj_rank').post(
    (req,res)=>new RezultatController().azuriraj_rank(req,res)
)

RezultatRouter.route('/unesi_rezultat_ekipa').post(
    (req,res)=>new RezultatController().unesi_rezultat_ekipa(req,res)
)

RezultatRouter.route('/dohvati_rezultate_ekipa').post(
    (req,res)=>new RezultatController().dohvati_rezultate_ekipa(req,res)
)


export default RezultatRouter;