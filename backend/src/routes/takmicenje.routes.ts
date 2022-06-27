import express from 'express';
import { TakmicenjeController } from '../controllers/takmicenje.controller';

let TakmicenjeRouter=express.Router();

TakmicenjeRouter.route('/unesi_takmicenje').post(
    (req,res)=>new TakmicenjeController().unesi_takmicenje(req,res)
)

TakmicenjeRouter.route('/end_takmicenje').post(
    (req,res)=>new TakmicenjeController().end_takmicenje(req,res)
)

TakmicenjeRouter.route('/promeni_status_takmicenja').post(
    (req,res)=>new TakmicenjeController().promeni_status_takmicenja(req,res)
)


TakmicenjeRouter.route('/dohvati_takmicenje').post(
    (req,res)=>new TakmicenjeController().dohvati_takmicenje(req,res)
)

TakmicenjeRouter.route('/azuriraj_medalje_i_rank').post(
    (req,res)=>new TakmicenjeController().azuriraj_medalje_i_rank(req,res)
)

TakmicenjeRouter.route('/dodeli_nosioce').post(
    (req,res)=>new TakmicenjeController().dodeli_nosioce(req,res)
)

TakmicenjeRouter.route('/dohvati_nosioice').post(
    (req,res)=>new TakmicenjeController().dohvati_nosioice(req,res)
)


TakmicenjeRouter.route('/dohvati_medalje').get(
    (req,res)=>new TakmicenjeController().dohvati_medalje(req,res)
)


TakmicenjeRouter.route('/dohvati_takmicenje_idT').post(
    (req,res)=>new TakmicenjeController().dohvati_takmicenje_idT(req,res)
)

TakmicenjeRouter.route('/oformi_takmicenje').post(
    (req,res)=>new TakmicenjeController().oformi_takmicenje(req,res)
)

TakmicenjeRouter.route('/zavrsi_takmicenje').post(
    (req,res)=>new TakmicenjeController().zavrsi_takmicenje(req,res)
)

TakmicenjeRouter.route('/dohvati_format').post(
    (req,res)=>new TakmicenjeController().dohvati_format_takmicenja(req,res)
)

TakmicenjeRouter.route('/dohvati_delegate').post(
    (req,res)=>new TakmicenjeController().dohvati_delegate_takmicenja(req,res)
)

TakmicenjeRouter.route('/dohvati_takmicenja_delegata').post(
    (req,res)=>new TakmicenjeController().dohvati_takmicenja_delegata(req,res)
)


TakmicenjeRouter.route('/dodaj_delegata').post(
    (req,res)=>new TakmicenjeController().dodaj_delegata(req,res)
)
TakmicenjeRouter.route('/dodaj_delegata_novo').post(
    (req,res)=>new TakmicenjeController().dodaj_delegata_novo(req,res)
)


TakmicenjeRouter.route('/dohvati_sva_takmicenja').get(
    (req,res)=>new TakmicenjeController().dohvati_sva_takmicenja(req,res)
)

export default TakmicenjeRouter;