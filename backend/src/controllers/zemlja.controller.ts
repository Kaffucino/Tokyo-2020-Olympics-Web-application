import express from 'express';
import Zemlja_naziv from '../models/zemlja_naziv';
import Medalja from '../models/medalja';
import Zemlja from '../models/zemlja';


export class ZemljaController {

    dohvati_sve_zemlje(req: express.Request, res: express.Response) {
        Zemlja.find({}, (err, zemlje) => {

            if (err)
                console.log(err);
            else
                res.json(zemlje)

        })

    }
    dohvati_sve_nazive_zemalja(req: express.Request, res: express.Response){
        Zemlja_naziv.find({},(err,zemlje)=>{
            if (err)
                console.log(err);
            else
                res.json(zemlje)

        })
    }

    dohvati_rezultate_zemalja(req: express.Request, res: express.Response) {

        Medalja.find({}, (err, medalje) => {

            if (err)
                console.log(err);
            else
                res.json(medalje)


        })
    }

    unesi_zemlju(req: express.Request, res: express.Response) {

        let ime = req.body.ime;
        Zemlja.findOne({ ime: ime }, (err, zemlja) => {

            if (err)
                console.log(err);
            else {
                if (!zemlja) {
                    let zemlja = new Zemlja(req.body);

                    zemlja.save();

                }

            }

        })



    }
    unesi_medalju(req: express.Request, res: express.Response) {
        let ime = req.body.ime;
        Medalja.findOne({ ime: ime }, (err, medalja) => {
            if (err)
                console.log(err)
            else {

                if (!medalja) {
                    let medalja = new Medalja(req.body);

                    medalja.save();

                }


            }
        })




    }
    azuriraj_rankove(req: express.Request, res: express.Response){
        let zemlje=req.body.zemlje;
        let rank=1;

        zemlje.forEach((element: string) => {
            Medalja.collection.updateOne({ime:element},{$set:{rang:rank}})
            rank++;
        });


    }



    uvecaj_zlato_za_jedan(req: express.Request, res: express.Response) {
        let zemlja = req.body.zemlja;
        Medalja.collection.updateOne({ ime: zemlja }, { $inc: { zlato: 1, br_medalja: 1 } })
    }
    uvecaj_srebro_za_jedan(req: express.Request, res: express.Response) {
        let zemlja = req.body.zemlja;
        Medalja.collection.updateOne({ ime: zemlja }, { $inc: { srebro: 1, br_medalja: 1 } })
    }
    uvecaj_bronzu_za_jedan(req: express.Request, res: express.Response) {
        let zemlja = req.body.zemlja;

        Medalja.collection.updateOne({ ime: zemlja }, { $inc: { bronza: 1, br_medalja: 1 } })
    }


}