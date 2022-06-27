import express from 'express'
import { ZemljaController } from '../controllers/zemlja.controller';

let ZemljaRouter=express.Router();

ZemljaRouter.route("/dohvati_sve_zemlje").get(
    (req,res)=>new ZemljaController().dohvati_sve_zemlje(req,res)

)

ZemljaRouter.route("/dohvati_sve_nazive_zemalja").get(
    (req,res)=>new ZemljaController().dohvati_sve_nazive_zemalja(req,res)

)


ZemljaRouter.route("/dohvati_sve_rezultate").get(
    (req,res)=>new ZemljaController().dohvati_rezultate_zemalja(req,res)

)

ZemljaRouter.route("/unesi_zemlju").post(
    (req,res)=>new ZemljaController().unesi_zemlju(req,res)

)

ZemljaRouter.route("/azuriraj_rankove").post(
    (req,res)=>new ZemljaController().azuriraj_rankove(req,res)

)


ZemljaRouter.route("/unesi_medalju").post(
    (req,res)=>new ZemljaController().unesi_medalju(req,res)

)
ZemljaRouter.route("/uvecaj_zlato_za_jedan").post(
    (req,res)=>new ZemljaController().uvecaj_zlato_za_jedan(req,res)

)
ZemljaRouter.route("/uvecaj_srebro_za_jedan").post(
    (req,res)=>new ZemljaController().uvecaj_srebro_za_jedan(req,res)

)
ZemljaRouter.route("/uvecaj_bronzu_za_jedan").post(
    (req,res)=>new ZemljaController().uvecaj_bronzu_za_jedan(req,res)

)



export default ZemljaRouter;