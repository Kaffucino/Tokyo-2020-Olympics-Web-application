import { Lokacija } from "./lokacija";

export class Takmicenje{
    idT:number;
    sport:string;
    disciplina:string;
    pol:string;
    datum_pocetak:string;
    datum_kraj:string;
    lokacije:Array<Lokacija>;
    konkurencija:string;
    status:string;

    izabrano:boolean;

}