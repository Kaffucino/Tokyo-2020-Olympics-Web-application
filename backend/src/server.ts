import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import KorisnikRouter from './routes/korisnik.routes';
import ZemljaRouter from './routes/zemlja.routes';
import SportistaRouter from './routes/sportista.routes';
import TakmicenjeRouter from './routes/takmicenje.routes';
import RasporedRouter from './routes/raspored.routes';
import RezultatRouter from './routes/rezultat.routes';


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/olimpijada');

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('mongo ok');
});


const router=express.Router();

router.use('/korisnici',KorisnikRouter)
router.use('/zemlje',ZemljaRouter)
router.use('/sportisti',SportistaRouter)
router.use('/takmicenja',TakmicenjeRouter)
router.use('/rasporedi',RasporedRouter)
router.use('/rezultati',RezultatRouter)

app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));