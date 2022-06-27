import express from 'express'
import { SportistaController } from '../controllers/sportista.controller';

let SportistaRouter=express.Router();

SportistaRouter.route('/nadji_sportistu_ime_zemlja_sport').post(
    (req,res)=>new SportistaController().nadji_sportistu_ime_zemlja_sport(req,res)
)




SportistaRouter.route('/dohvati_sportistu').post(
    (req,res)=>new SportistaController().dohvati_sportistu(req,res)
)


SportistaRouter.route('/dohvati_sportistu2').post(
    (req,res)=>new SportistaController().dohvati_sportistu2(req,res)
)
SportistaRouter.route('/dohvati_sportistu_idS').post(
    (req,res)=>new SportistaController().dohvati_sportistu_idS(req,res)
)

SportistaRouter.route('/dodeli_medalju').post(
    (req,res)=>new SportistaController().dodeli_medalju(req,res)
)

SportistaRouter.route('/dohvati_ekipu').post(
    (req,res)=>new SportistaController().dohvati_ekipu(req,res)
)

SportistaRouter.route('/dohvati_sportiste_na_osnovu_zemlje').post(
    (req,res)=>new SportistaController().dohvati_sportiste_na_osnovu_zemlje(req,res)
)



SportistaRouter.route('/dohvati_sportiste_na_osnovu_sporta').post(
    (req,res)=>new SportistaController().dohvati_sportiste_na_osnovu_sporta(req,res)
)

SportistaRouter.route('/dohvati_ekipe_na_osnovu_sporta').post(
    (req,res)=>new SportistaController().dohvati_ekipe_na_osnovu_sporta(req,res)
)
SportistaRouter.route('/promeni_status_na_rangiran').post(
    (req,res)=>new SportistaController().promeni_status_na_rangiran(req,res)
)

SportistaRouter.route('/unesi_sport').post(
    (req,res)=>new SportistaController().unesi_sport(req,res)
)
SportistaRouter.route('/dohvati_rekorde').post(
    (req,res)=>new SportistaController().dohvati_rekorde(req,res)
)
SportistaRouter.route('/dohvati_sportove').get(
    (req,res)=>new SportistaController().dohvati_sportove(req,res)
)

SportistaRouter.route('/dohvati_sve_sportiste').get(
    (req,res)=>new SportistaController().dohvati_sve_sportiste(req,res)
)

SportistaRouter.route('/dodeli_grupu_ekipama').post(
    (req,res)=>new SportistaController().dodeli_grupu_ekipama(req,res)
)

SportistaRouter.route('/eliminisi_ekipe').post(
    (req,res)=>new SportistaController().eliminisi_ekipe(req,res)
)
SportistaRouter.route('/eliminisi_sportiste').post(
    (req,res)=>new SportistaController().eliminisi_sportiste(req,res)
)

SportistaRouter.route('/za_trece_mesto').post(
    (req,res)=>new SportistaController().za_trece_mesto(req,res)
)

SportistaRouter.route('/za_trece_mesto_sportisti').post(
    (req,res)=>new SportistaController().za_trece_mesto_sportisti(req,res)
)

SportistaRouter.route('/dodeli_medalju').post(
    (req,res)=>new SportistaController().dodeli_medalju(req,res)
)
SportistaRouter.route('/dodeli_ekipi_medalju').post(
    (req,res)=>new SportistaController().dodeli_ekipi_medalju(req,res)
)




SportistaRouter.route('/dohvati_sport').post(
    (req,res)=>new SportistaController().dohvati_sport(req,res)
)
SportistaRouter.route('/dohvati_lokacije').get(
    (req,res)=>new SportistaController().dohvati_lokacije(req,res)
)
SportistaRouter.route('/unesi_sportistu').post(
    (req,res)=>new SportistaController().unesi_sportistu(req,res)
)

SportistaRouter.route('/prihvati_sportiste').post(
    (req,res)=>new SportistaController().prihvati_sportiste(req,res)
)
SportistaRouter.route('/prihvati_ekipu').post(
    (req,res)=>new SportistaController().prihvati_ekipu(req,res)
)

SportistaRouter.route('/azuriraj_rankove_ekipa').post(
    (req,res)=>new SportistaController().azuriraj_rankove_ekipa(req,res)
)


SportistaRouter.route('/unesi_ekipu').post(
    (req,res)=>new SportistaController().unesi_ekipu(req,res)
)

SportistaRouter.route('/unesite_clana_ekipe').post(
    (req,res)=>new SportistaController().unesite_clana_ekipe(req,res)
)

export default SportistaRouter;