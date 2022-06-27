import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ekipa } from '../models/ekipa';
import { Lokacija } from '../models/lokacija';
import { Nosilac } from '../models/nosilac';
import { Raspored } from '../models/raspored';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { RasporedService } from '../raspored.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-raspored',
  templateUrl: './raspored.component.html',
  styleUrls: ['./raspored.component.css']
})
export class RasporedComponent implements OnInit {

  constructor(private aktivnaRuta:ActivatedRoute,private ruter:Router,private takmicenjeServis:TakmicenjeService
    ,private rasporedServis:RasporedService,private sportistaServis:SportistaService) { }
  
  idT:number;
  takmicenje:Takmicenje;
  datum_pocetak:Date;
  datum_kraj:Date;
  lokacije:Lokacija[];
  poruka_datum:string;

  poruka:string;
  datum:string;
  vreme:string;
  random_algoritam:boolean;
  faza:string;  
  lokacija:string;
  
  brojac:number;
  potrebno:number;

  ekipe:Ekipa[];  
  sportisti:Sportista[];
  nosioci:number;



  ngOnInit(): void {
    this.lokacije=[];
    this.ekipe=[];
    this.sportisti=[];
    this.random_algoritam=false;
    this.takmicenje=new Takmicenje();
    this.nosioci=-1;

    this.idT=parseInt(this.aktivnaRuta.snapshot.paramMap.get('idT'));
     this.takmicenjeServis.dohvati_takmicenje_idT(this.idT).subscribe((tak:Takmicenje)=>{
       this.takmicenje=tak;
      
       if(this.takmicenje.konkurencija!="individ" && this.takmicenje.sport!="Tenis"){
        this.sportistaServis.dohvati_ekipe_na_osnovu_sporta(tak.sport,tak.disciplina,tak.pol).subscribe((eki:Ekipa[])=>{

          for(let i=0;i<eki.length;i++)
          if(eki[i].status=="ucestvuje" )
          this.ekipe.push(eki[i]);
         

        })
        
       }else if(this.takmicenje.konkurencija=="individ" && this.takmicenje.sport!="Tenis"){
        this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(tak.sport,tak.disciplina,tak.pol).subscribe((spo:Sportista[])=>{
          for(let i=0;i<spo.length;i++)
          if(spo[i].status=="ucestvuje")
          this.sportisti.push(spo[i]);
        })

       }else if(this.takmicenje.sport=="Tenis"){

        this.takmicenjeServis.dohvati_nosioice(this.idT).subscribe((nos:Nosilac)=>{
          this.nosioci=nos.nosioci.length;

        

        })

       }

      this.datum_pocetak=new Date(tak.datum_pocetak);
      this.datum_kraj=new Date(tak.datum_kraj);
      this.lokacije=tak.lokacije;
    })
  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }

  algoritam(){
    let niz:string[]=[];
    for(let i=0;i<this.ekipe.length;i++)
    if(i<this.ekipe.length/2)
    niz.push('A');
    else
    niz.push('B');
    
    let index=this.ekipe.length;
    let random;

    while(index!=0){
      random = Math.floor(Math.random() * index);
      index--;
      [niz[index],niz[random]] = [
        niz[random], niz[index]];

    }
    
    for(let i=0;i<this.ekipe.length;i++)
    this.ekipe[i].grupa=niz[i];

    let grupaA:number[]=[];
    let grupaB:number[]=[];

    for(let i=0;i<this.ekipe.length;i++)
    if(this.ekipe[i].grupa=="A")
    grupaA.push(this.ekipe[i].idE);
    else if(this.ekipe[i].grupa=="B")
    grupaB.push(this.ekipe[i].idE);
    
    
    this.sportistaServis.dodeli_grupu_ekipama(grupaA,"A").subscribe();
    this.sportistaServis.dodeli_grupu_ekipama(grupaB,"B").subscribe();

    if(this.ekipe.length==12)
    this.takmicenje.status="grupna";
    else if(this.ekipe.length==8)
    this.takmicenje.status="cetvrt";
    else 
    this.takmicenje.status="polu";

    this.takmicenjeServis.promeni_status_takmicenja(this.idT,this.takmicenje.status).subscribe()


  }

  unesi_ekipni(){

    if(!this.faza)
    this.poruka="Polje za fazu ne sme biti prazno!";
    else if(!this.lokacija)
    this.poruka="Polje za lokaciju ne sme biti prazno!";
    else if(!this.datum)
    this.poruka="Polje za datum ne sme biti prazno!";
    else if(!this.vreme)
    this.poruka="Polje za vreme ne sme biti prazno!";
    else{
      let pravi_datum=new Date(this.datum);
      if(pravi_datum<this.datum_pocetak || pravi_datum>this.datum_kraj)
      this.poruka="Datum ispada iz navedenog opsega!";
      else{
        this.rasporedServis.proveri_termin(this.datum,this.vreme,this.lokacija).subscribe((ra2:Raspored)=>{
          if(ra2)
          this.poruka="Sala je vec rezervisana za navedeno vreme!";
          else{
             this.rasporedServis.unesi_termin(this.idT,this.datum,this.vreme,this.lokacija,this.faza).subscribe();
             this.poruka="Uspesno ste uneli termin!";

              setTimeout(function(){
                window.location.reload()
              },1000)

          }

        })


      }

    }
   
  }


  submit(){
    this.poruka=""

    if((this.faza=="cetvrt" || this.faza=="polu" || this.faza=="finale") && this.ekipe.length==12){

      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"grupna").subscribe((ra:Raspored[])=>{

        if(ra.length!=30){  
        this.poruka="Potrebno je prvo dodeliti raspored za svaki mec grupne faze!";
        this.faza='undefined';
        }

      })

    }

    if(this.faza=="osmina"){ //za Tenis

      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"cetvrt").subscribe((ra:Raspored[])=>{
        this.brojac=ra.length;
        this.potrebno=8;

        if(ra.length==8){
          this.poruka="Uneseni su svi potrebni termini za cetvrt finale!";
          this.faza='undefined';

        }


      })

    }


    if(this.faza=="cetvrt"){
      
      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"cetvrt").subscribe((ra:Raspored[])=>{
        this.brojac=ra.length;
        this.potrebno=4;

        if(ra.length==4){
          this.poruka="Uneseni su svi potrebni termini za cetvrt finale!";
          this.faza='undefined';

        }


      })

    

    }
    if(this.faza=="polu"){
      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"polu").subscribe((ra:Raspored[])=>{

        this.brojac=ra.length;
        this.potrebno=2;

        if(ra.length==2){
          this.poruka="Uneseni su svi potrebni termini za polu finale!";
          this.faza='undefined';

        }


      })
    }
    if(this.faza=="finale"){
      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"finale").subscribe((ra:Raspored[])=>{
        this.brojac=ra.length;
        this.potrebno=1;

        if(ra.length==1){
          this.poruka="Unesen je termin za finale!";
          this.faza='undefined';

        }


      })
    }
    if(this.faza=="grupna"){
      this.rasporedServis.dohvati_raspored_ekipni(this.idT,"grupna").subscribe((ra:Raspored[])=>{
        this.brojac=ra.length;
        this.potrebno=30;
        if(ra.length==30){
          this.poruka="Uneseni su svi termini za grupnu fazu!";
          this.faza='undefined';

        }


      })
    }
    



   
  }

  unesi(){
    if(!this.datum)
    this.poruka="Polje za datum ne sme biti prazno!";
    else if(!this.vreme)
    this.poruka="Polje za vreme ne sme biti prazno!";
    else{

      let pravi_datum=new Date(this.datum);
      if(pravi_datum<this.datum_pocetak || pravi_datum>this.datum_kraj)
      this.poruka="Datum ispada iz navedenog opsega!";
      else{


        this.rasporedServis.proveri_vec_uneto(this.idT,"finale").subscribe((ras:Raspored)=>{

          if(ras)
          this.poruka="Vec je unesen termin za ovu fazu takmicenja!";
          else{
            this.rasporedServis.proveri_termin(this.datum,this.vreme,this.lokacije).subscribe((ra:Raspored)=>{
              if(ra)
              this.poruka="Sala je vec rezervisana za navedeno vreme!";
              else{
               

                this.rasporedServis.unesi_termin(this.idT,this.datum,this.vreme,this.lokacije,"finale").subscribe()
                this.poruka="Uspesno ste uneli termin!"
    
              }
    
            })

          }


        })

        
       


      }

    }

  }
}
