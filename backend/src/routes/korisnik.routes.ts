import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

let KorisnikRouter=express.Router();

KorisnikRouter.route('/prijava').post(
    (req,res)=>new KorisnikController().prijava(req,res)
)
KorisnikRouter.route('/dohvati_vodju').post(
    (req,res)=>new KorisnikController().dohvati_vodju(req,res)
)

KorisnikRouter.route('/dohvati_delegate').get(
    (req,res)=>new KorisnikController().dohvati_delegate(req,res)
)


KorisnikRouter.route('/dohvati_korisnika').post(
    (req,res)=>new KorisnikController().dohvati_korisnika(req,res)
)
KorisnikRouter.route('/dohvati_korisnika2').post(
    (req,res)=>new KorisnikController().dohvati_korisnika2(req,res)
)
KorisnikRouter.route('/unesi_zahtev_registracija').post(
    (req,res)=>new KorisnikController().unesti_zahtev_registracija(req,res)
)

KorisnikRouter.route('/azuriraj_lozinku').post(
    (req,res)=>new KorisnikController().azuriraj_lozinku(req,res)
)
KorisnikRouter.route("/dohvati_zahteve_za_registraciju").get(
    (req,res)=>new KorisnikController().dohvati_zahteve_za_registraciju(req,res)
)
KorisnikRouter.route("/odobri_korisnika").post(
    (req,res)=>new KorisnikController().odobri_korisnika(req,res)
)

export default KorisnikRouter;