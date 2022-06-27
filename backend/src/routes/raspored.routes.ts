import express from 'express';
import { RasporedController } from '../controllers/raspored.controller';

let RasporedRouter=express.Router();

RasporedRouter.route('/proveri_termin').post(
    (req,res)=>new RasporedController().proveri_termin(req,res)
)
RasporedRouter.route('/unesi_termin').post(
    (req,res)=>new RasporedController().unesi_termin(req,res)
)
RasporedRouter.route('/proveri_vec_uneto').post(
    (req,res)=>new RasporedController().proveri_vec_uneto(req,res)
)



RasporedRouter.route('/dohvati_raspored_individ').post(
    (req,res)=>new RasporedController().dohvati_raspored_individ(req,res)
)

RasporedRouter.route('/dohvati_raspored_ekipni').post(
    (req,res)=>new RasporedController().dohvati_raspored_ekipni(req,res)
)


export default RasporedRouter;
