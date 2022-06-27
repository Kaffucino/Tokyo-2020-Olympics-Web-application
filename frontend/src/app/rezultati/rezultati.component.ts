import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ekipa } from '../models/ekipa';
import { Format } from '../models/format';
import { Medalja } from '../models/medalja';
import { Nosilac } from '../models/nosilac';
import { Raspored } from '../models/raspored';
import { Rezultat } from '../models/rezultat';
import { Rezultati_ekipa } from '../models/rezultati_ekipa';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { RasporedService } from '../raspored.service';
import { RezultatService } from '../rezultat.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-rezultati',
  templateUrl: './rezultati.component.html',
  styleUrls: ['./rezultati.component.css']
})
export class RezultatiComponent implements OnInit {

  constructor(private ruter: Router, private aktivnaRuta: ActivatedRoute, private takmicenjeServis: TakmicenjeService,
    private sportistaServis: SportistaService, private rezultatServis: RezultatService, private rasporedServis: RasporedService, private zemljaServis: ZemljeService) { }

  idT: number;
  takmicenje: Takmicenje;
  format: Format;

  sportisti: Sportista[];
  ekipe: Ekipa[];

  poruka: string;
  bold: boolean;
  bonus_runda: boolean;
  rez: string;
  final: boolean;
  bio_bonus: boolean;

  takmicar: number;
  serija: string;

  rezultat: string;
  rezultat2: string;
  rezultat3: string;
  faza: string;
  utakmice: string[];
  rezultat_utakmice: string;
  utakmica: string;
  nosioci:Nosilac;


  ngOnInit(): void {
    this.serija = "";
    this.faza = "";
    this.ekipe = [];
    this.bold = false;
    this.final = false;
    this.bio_bonus = false;
    this.utakmice = [];
    this.takmicenje = new Takmicenje();
    this.format = new Format();
    this.nosioci=new Nosilac();
    this.bonus_runda = false;




    this.sportisti = [];


    this.idT = parseInt(this.aktivnaRuta.snapshot.paramMap.get('idT'));

    this.takmicenjeServis.dohvati_takmicenje_idT(this.idT).subscribe((tak: Takmicenje) => {
      this.rezultatServis.dohvati_serije(this.idT).subscribe((riz: Rezultat[]) => {
        this.takmicenje = tak;
        this.takmicenjeServis.dohvati_format_takmicenja(tak.sport, tak.disciplina).subscribe((form: Format) => {

          

          if (form.pokusaji != 6) {

            for (let i = 0; i < riz.length - 1; i++)
              for (let j = i + 1; j < riz.length; j++) {
                if (riz[i].rezultat == riz[j].rezultat && riz[i].rank != -1) {
                  this.bonus_runda = true;
                  this.rez = riz[i].rezultat;
                  break;
                }
                if (this.bonus_runda)
                  break;
              }
            let cnt = 0;
            for (let i = 0; i < riz.length; i++)
              if (riz[i].faza == "bonus") {
                cnt++
                if (cnt == 2) {
                  this.bonus_runda = false;
                  this.bio_bonus = true;
                  break;
                }

              }
          }

          this.format = form;
          if (form.vrsta == "individ") {

            
            if(tak.sport!="Tenis"){
            this.rasporedServis.dohvati_raspored_individ(this.idT).subscribe((ra: Raspored) => {

              if (ra) {
                this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(tak.sport, tak.disciplina, tak.pol).subscribe((spor: Sportista[]) => {

                  if (!this.bonus_runda) {

                    let ucesnici: Sportista[] = [];
                    for (let i = 0; i < spor.length; i++)
                      if (spor[i].status == "ucestvuje")
                        ucesnici.push(spor[i]);


                    if (this.format.pokusaji != 6 && this.final == false) {
                      this.rezultatServis.dohvati_serije(this.idT).subscribe((rez: Rezultat[]) => {
                        let upisani_rezultat: number[] = [];
                        for (let i = 0; i < rez.length; i++)
                          upisani_rezultat.push(rez[i].ucesnik);

                        for (let i = 0; i < ucesnici.length; i++)
                          if (!upisani_rezultat.includes(ucesnici[i].idS))
                            this.sportisti.push(ucesnici[i]);

                        if (this.sportisti.length == 0) {
                          this.final = true;
                        }

                      })

                    } else {
                      this.sportisti = ucesnici;
                    }

                  }
                  else {

                    this.rezultatServis.dohvati_serije(this.idT).subscribe((rez2: Rezultat[]) => {
                      let brojac = 0;
                      let uneseni: number[] = [];
                      for (let i = 0; i < rez2.length; i++)
                        if (rez2[i].faza == "bonus")
                          uneseni.push(rez2[i].ucesnik);

                      for (let i = 0; i < rez2.length; i++) {
                        if (rez2[i].rezultat == this.rez && !uneseni.includes(rez2[i].ucesnik)) {
                          brojac++;
                          this.sportistaServis.dohvati_sportistu_idS(rez2[i].ucesnik).subscribe((spo: Sportista) => {
                            this.sportisti.push(spo);
                          })
                        }
                      }

                      if (brojac == 0) { //svi rezultati bonus runde su uneti!
                        this.final = true;
                        this.bio_bonus = true;
                      }
                    })
                  }

                  if (form.pokusaji == 6) {
                    this.rezultatServis.dohvati_serije(this.idT).subscribe((rez: Rezultat[]) => {
                      if (rez.length == 0)
                        this.serija = "1.serija"
                      else if (rez.length == this.sportisti.length)
                        this.serija = "2.serija"
                      else if (rez.length == 2 * this.sportisti.length)
                        this.serija = "3.serija"
                      else if (rez.length == 3 * this.sportisti.length)
                        this.serija = "4.serija"
                      else if (rez.length == 4 * this.sportisti.length)
                        this.serija = "5.serija"
                      else if (rez.length == 5 * this.sportisti.length)
                        this.serija = "6.serija"
                      else if(rez.length==6*this.sportisti.length)
                      this.final=true;  
                      // else
                      // this.serija="bonus serija"
                    })

                  }


                })

              } else {
                this.poruka = "Potrebno je prvo da unesete raspored takmicenja!";
              }


            })
          }else{//singl Tenis
            this.takmicenjeServis.dohvati_nosioice(this.idT).subscribe((nos:Nosilac)=>{

             this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(this.takmicenje.sport,this.takmicenje.disciplina,this.takmicenje.pol).subscribe((spo:Sportista[])=>{

              this.rezultatServis.dohvati_rezultate_ekipa(this.takmicenje.idT,this.takmicenje.status).subscribe((rezz:Rezultati_ekipa[])=>{

                let uneti_rezultat:number[]=[];
                this.utakmice=[];
                this.sportisti=[];

                for(let i=0;i<rezz.length;i++){
                  uneti_rezultat.push(rezz[i].TIM1)
                  uneti_rezultat.push(rezz[i].TIM2)
                }
               

                for(let i=0;i<spo.length;i++)
                if((spo[i].status=="ucestvuje" || spo[i].status=="trece") && !uneti_rezultat.includes(spo[i].idS))
                this.sportisti.push(spo[i]);

              


                if(this.takmicenje.status=="polu"){

                  for(let i=0;i<spo.length;i++)
                  if((spo[i].status=="ucestvuje") && !uneti_rezultat.includes(spo[i].idS))
                  this.sportisti.push(spo[i]);
                  

                  this.rasporedServis.dohvati_raspored_ekipni(this.idT,'polu').subscribe((ra:Raspored[])=>{

                    if(ra.length!=2)
                      this.poruka = "Potrebno je prvo uneti sve rasporede utakmice za polu finale!";
                    else{
                      let preostali_nosioci:number[]=[];
                      let id_sportista:number[]=[];
                      let levi_zreb:number[]=[];
                      let desni_zreb:number[]=[];
                     
                      for(let i=0;i<this.sportisti.length;i++)
                      id_sportista.push(this.sportisti[i].idS);
                       
                      

                      for(let i=0;i<nos.nosioci.length;i++)
                      if(id_sportista.includes(nos.nosioci[i]))
                      preostali_nosioci.push(nos.nosioci[i]);
                        
                      
                      for(let i=0;i<preostali_nosioci.length;i++){
                      let index=nos.nosioci.indexOf(preostali_nosioci[i])
                        if(index%2==0)
                        levi_zreb.push(preostali_nosioci[i]);
                        else
                        desni_zreb.push(preostali_nosioci[i]);
                      }
                        

                        if(levi_zreb.length!=0){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==levi_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==levi_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)
                        }
                        if(desni_zreb.length!=0){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==desni_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==desni_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                        }

                        if(this.utakmice.length==0){ //gotovo polu finale

                          this.obradi_rezultate('polu');
      
                              this.poruka = "Polu finale je uspesno zavrseno!";
      
                              setTimeout(function () {
                                window.location.reload();
                              }, 1500)
      
                        }    


                    }
                    
                   

                  })
                  

                }else if(this.takmicenje.status=="trece"){
                  this.sportisti=[];
                  for(let i=0;i<spo.length;i++)
                  if((spo[i].status=="trece") && !uneti_rezultat.includes(spo[i].idS))
                  this.sportisti.push(spo[i]);
                  if(this.sportisti.length==2)      
                  this.utakmice.push(this.sportisti[0].ime_i_prezime+":"+this.sportisti[1].ime_i_prezime)
                  else if(this.sportisti.length==0){
                    this.obradi_rezultate('trece');
  
                    this.poruka = "Utakmica za trece mesto je uspesno zavrsena!";

                    setTimeout(function () {
                      window.location.reload();
                    }, 1500)



                  }


                }else if(this.takmicenje.status=="finale"){

                  
                  this.sportisti=[];
                  this.rasporedServis.dohvati_raspored_ekipni(this.idT,'finale').subscribe((ra:Raspored[])=>{

                    if(ra.length!=1)
                    this.poruka="Potrebno je prvo uneti raspored finalne utakmice!";
                    else{
                    for(let i=0;i<spo.length;i++)
                    if((spo[i].status=="ucestvuje") && !uneti_rezultat.includes(spo[i].idS))
                    this.sportisti.push(spo[i]);
                    if(this.sportisti.length==2)      
                    this.utakmice.push(this.sportisti[0].ime_i_prezime+":"+this.sportisti[1].ime_i_prezime)
                    else if(this.sportisti.length==0){
                      this.obradi_rezultate('finale');
    
                      this.poruka = "Finalna runda je uspesno zavrsena!";
  
                      setTimeout(function () {
                        window.location.reload();
                      }, 1500)
  
  
  
                    }

                  }
                  })

                

                }else if(this.takmicenje.status=="cetvrt"){
                  
                 // this.sportisti=[];
                  this.rasporedServis.dohvati_raspored_ekipni(this.idT,'cetvrt').subscribe((ra:Raspored[])=>{

                    if(ra.length!=4)
                    this.poruka="Potrebno je prvo uneti sve rasporede za cetvrt finale!";
                    else{

                      let preostali_nosioci:number[]=[];
                      let id_sportista:number[]=[];
                      let levi_zreb:number[]=[];
                      let desni_zreb:number[]=[];

                      for(let i=0;i<this.sportisti.length;i++)
                      id_sportista.push(this.sportisti[i].idS);
                       
                    

                      for(let i=0;i<nos.nosioci.length;i++)
                      if(id_sportista.includes(nos.nosioci[i]))
                      preostali_nosioci.push(nos.nosioci[i]);
                        
                      for(let i=0;i<preostali_nosioci.length;i++){
                      let index=nos.nosioci.indexOf(preostali_nosioci[i])
                        if(index%2==0)
                        levi_zreb.push(preostali_nosioci[i]);
                        else
                        desni_zreb.push(preostali_nosioci[i]);
                      }
                        
                      
                        if(levi_zreb.length==2){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==levi_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==levi_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                        }


                        if(levi_zreb.length==4){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==levi_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==levi_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                          for(let j=0;j<this.sportisti.length;j++){
                          if(this.sportisti[j].idS==levi_zreb[2])
                          takmicar1=this.sportisti[j].ime_i_prezime;
                          if(this.sportisti[j].idS==levi_zreb[3])  
                          takmicar2=this.sportisti[j].ime_i_prezime;
  
                          }
                          this.utakmice.push(takmicar1+":"+takmicar2)



                        }




                        if(desni_zreb.length==2){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==desni_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==desni_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                        }

                        if(desni_zreb.length==4){
                          let takmicar1;
                          let takmicar2;
                          for(let j=0;j<this.sportisti.length;j++){
                          if(this.sportisti[j].idS==desni_zreb[0])
                          takmicar1=this.sportisti[j].ime_i_prezime;
                          if(this.sportisti[j].idS==desni_zreb[1])  
                          takmicar2=this.sportisti[j].ime_i_prezime;
  
                          }
                          this.utakmice.push(takmicar1+":"+takmicar2)
  
                            for(let j=0;j<this.sportisti.length;j++){
                            if(this.sportisti[j].idS==desni_zreb[2])
                            takmicar1=this.sportisti[j].ime_i_prezime;
                            if(this.sportisti[j].idS==desni_zreb[3])  
                            takmicar2=this.sportisti[j].ime_i_prezime;
    
                            }
                            this.utakmice.push(takmicar1+":"+takmicar2)
  
  
  
                          }
  



                        if(this.utakmice.length==0){ //gotovo cetvrt finale

                          this.obradi_rezultate('cetvrt');
      
                              this.poruka = "Cetvrt finale je uspesno zavrseno!";
      
                              setTimeout(function () {
                                window.location.reload();
                              }, 1500)
      
                        }    

                   

                    



                  }
                  })



                }else if(tak.status=="osmina"){

                  this.rasporedServis.dohvati_raspored_ekipni(this.idT,'osmina').subscribe((ra:Raspored[])=>{

                    if(ra.length!=8)
                    this.poruka="Potrebno je prvo uneti sve rasporede za osminu finala!";
                    else{

                      let preostali_nosioci:number[]=[];
                      let id_sportista:number[]=[];
                      let levi_zreb:number[]=[];
                      let desni_zreb:number[]=[];

                      for(let i=0;i<this.sportisti.length;i++)
                      id_sportista.push(this.sportisti[i].idS);
                       
                    

                      for(let i=0;i<nos.nosioci.length;i++)
                      if(id_sportista.includes(nos.nosioci[i]))
                      preostali_nosioci.push(nos.nosioci[i]);
                        
                      for(let i=0;i<preostali_nosioci.length;i++){
                      let index=nos.nosioci.indexOf(preostali_nosioci[i])
                        if(index%2==0)
                        levi_zreb.push(preostali_nosioci[i]);
                        else
                        desni_zreb.push(preostali_nosioci[i]);
                      }
                        
                      
                        if(levi_zreb.length==2){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==levi_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==levi_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                        }


                        if(levi_zreb.length==4){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==levi_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==levi_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                          for(let j=0;j<this.sportisti.length;j++){
                          if(this.sportisti[j].idS==levi_zreb[2])
                          takmicar1=this.sportisti[j].ime_i_prezime;
                          if(this.sportisti[j].idS==levi_zreb[3])  
                          takmicar2=this.sportisti[j].ime_i_prezime;
  
                          }
                          this.utakmice.push(takmicar1+":"+takmicar2)



                        }
                        if(levi_zreb.length==6){
                          let takmicar1;
                          let takmicar2;
                          for(let j=0;j<this.sportisti.length;j++){
                          if(this.sportisti[j].idS==levi_zreb[0])
                          takmicar1=this.sportisti[j].ime_i_prezime;
                          if(this.sportisti[j].idS==levi_zreb[1])  
                          takmicar2=this.sportisti[j].ime_i_prezime;
  
                          }
                          this.utakmice.push(takmicar1+":"+takmicar2)
  
                            for(let j=0;j<this.sportisti.length;j++){
                            if(this.sportisti[j].idS==levi_zreb[2])
                            takmicar1=this.sportisti[j].ime_i_prezime;
                            if(this.sportisti[j].idS==levi_zreb[3])  
                            takmicar2=this.sportisti[j].ime_i_prezime;
    
                            }
                            this.utakmice.push(takmicar1+":"+takmicar2)
                            
                            for(let j=0;j<this.sportisti.length;j++){
                              if(this.sportisti[j].idS==levi_zreb[4])
                              takmicar1=this.sportisti[j].ime_i_prezime;
                              if(this.sportisti[j].idS==levi_zreb[5])  
                              takmicar2=this.sportisti[j].ime_i_prezime;
      
                              }
                              this.utakmice.push(takmicar1+":"+takmicar2)
  
  
                          }
                          if(levi_zreb.length==8){
                            let takmicar1;
                            let takmicar2;
                            for(let j=0;j<this.sportisti.length;j++){
                            if(this.sportisti[j].idS==levi_zreb[0])
                            takmicar1=this.sportisti[j].ime_i_prezime;
                            if(this.sportisti[j].idS==levi_zreb[1])  
                            takmicar2=this.sportisti[j].ime_i_prezime;
    
                            }
                            this.utakmice.push(takmicar1+":"+takmicar2)
    
                              for(let j=0;j<this.sportisti.length;j++){
                              if(this.sportisti[j].idS==levi_zreb[2])
                              takmicar1=this.sportisti[j].ime_i_prezime;
                              if(this.sportisti[j].idS==levi_zreb[3])  
                              takmicar2=this.sportisti[j].ime_i_prezime;
      
                              }
                              this.utakmice.push(takmicar1+":"+takmicar2)
                              
                              for(let j=0;j<this.sportisti.length;j++){
                                if(this.sportisti[j].idS==levi_zreb[4])
                                takmicar1=this.sportisti[j].ime_i_prezime;
                                if(this.sportisti[j].idS==levi_zreb[5])  
                                takmicar2=this.sportisti[j].ime_i_prezime;
        
                                }
                                this.utakmice.push(takmicar1+":"+takmicar2)
                                for(let j=0;j<this.sportisti.length;j++){
                                  if(this.sportisti[j].idS==levi_zreb[6])
                                  takmicar1=this.sportisti[j].ime_i_prezime;
                                  if(this.sportisti[j].idS==levi_zreb[7])  
                                  takmicar2=this.sportisti[j].ime_i_prezime;
          
                                  }
                                  this.utakmice.push(takmicar1+":"+takmicar2)
    
                            }




                        if(desni_zreb.length==2){
                        let takmicar1;
                        let takmicar2;
                        for(let j=0;j<this.sportisti.length;j++){
                        if(this.sportisti[j].idS==desni_zreb[0])
                        takmicar1=this.sportisti[j].ime_i_prezime;
                        if(this.sportisti[j].idS==desni_zreb[1])  
                        takmicar2=this.sportisti[j].ime_i_prezime;

                        }
                        this.utakmice.push(takmicar1+":"+takmicar2)

                        }

                        if(desni_zreb.length==4){
                          let takmicar1;
                          let takmicar2;
                          for(let j=0;j<this.sportisti.length;j++){
                          if(this.sportisti[j].idS==desni_zreb[0])
                          takmicar1=this.sportisti[j].ime_i_prezime;
                          if(this.sportisti[j].idS==desni_zreb[1])  
                          takmicar2=this.sportisti[j].ime_i_prezime;
  
                          }
                          this.utakmice.push(takmicar1+":"+takmicar2)
  
                            for(let j=0;j<this.sportisti.length;j++){
                            if(this.sportisti[j].idS==desni_zreb[2])
                            takmicar1=this.sportisti[j].ime_i_prezime;
                            if(this.sportisti[j].idS==desni_zreb[3])  
                            takmicar2=this.sportisti[j].ime_i_prezime;
    
                            }
                            this.utakmice.push(takmicar1+":"+takmicar2)
  
  
  
                          }


                          if(desni_zreb.length==6){
                            let takmicar1;
                            let takmicar2;
                            for(let j=0;j<this.sportisti.length;j++){
                            if(this.sportisti[j].idS==desni_zreb[0])
                            takmicar1=this.sportisti[j].ime_i_prezime;
                            if(this.sportisti[j].idS==desni_zreb[1])  
                            takmicar2=this.sportisti[j].ime_i_prezime;
    
                            }
                            this.utakmice.push(takmicar1+":"+takmicar2)
    
                              for(let j=0;j<this.sportisti.length;j++){
                              if(this.sportisti[j].idS==desni_zreb[2])
                              takmicar1=this.sportisti[j].ime_i_prezime;
                              if(this.sportisti[j].idS==desni_zreb[3])  
                              takmicar2=this.sportisti[j].ime_i_prezime;
      
                              }
                              this.utakmice.push(takmicar1+":"+takmicar2)
                              
                              for(let j=0;j<this.sportisti.length;j++){
                                if(this.sportisti[j].idS==desni_zreb[4])
                                takmicar1=this.sportisti[j].ime_i_prezime;
                                if(this.sportisti[j].idS==desni_zreb[5])  
                                takmicar2=this.sportisti[j].ime_i_prezime;
        
                                }
                                this.utakmice.push(takmicar1+":"+takmicar2)
    
    
                            }
                            if(desni_zreb.length==8){
                              let takmicar1;
                              let takmicar2;
                              for(let j=0;j<this.sportisti.length;j++){
                              if(this.sportisti[j].idS==desni_zreb[0])
                              takmicar1=this.sportisti[j].ime_i_prezime;
                              if(this.sportisti[j].idS==desni_zreb[1])  
                              takmicar2=this.sportisti[j].ime_i_prezime;
      
                              }
                              this.utakmice.push(takmicar1+":"+takmicar2)
      
                                for(let j=0;j<this.sportisti.length;j++){
                                if(this.sportisti[j].idS==desni_zreb[2])
                                takmicar1=this.sportisti[j].ime_i_prezime;
                                if(this.sportisti[j].idS==desni_zreb[3])  
                                takmicar2=this.sportisti[j].ime_i_prezime;
        
                                }
                                this.utakmice.push(takmicar1+":"+takmicar2)
                                
                                for(let j=0;j<this.sportisti.length;j++){
                                  if(this.sportisti[j].idS==desni_zreb[4])
                                  takmicar1=this.sportisti[j].ime_i_prezime;
                                  if(this.sportisti[j].idS==desni_zreb[5])  
                                  takmicar2=this.sportisti[j].ime_i_prezime;
          
                                  }
                                  this.utakmice.push(takmicar1+":"+takmicar2)
                                  for(let j=0;j<this.sportisti.length;j++){
                                    if(this.sportisti[j].idS==desni_zreb[6])
                                    takmicar1=this.sportisti[j].ime_i_prezime;
                                    if(this.sportisti[j].idS==desni_zreb[7])  
                                    takmicar2=this.sportisti[j].ime_i_prezime;
            
                                    }
                                    this.utakmice.push(takmicar1+":"+takmicar2)
      
                              }
  



                        if(this.utakmice.length==0){ //gotova osmina finala

                          this.obradi_rezultate('osmina');
      
                              this.poruka = "Osmina finala je uspesno zavrsena!";
      
                              setTimeout(function () {
                                window.location.reload();
                              }, 1500)
      
                        }    

                   

                    



                  }
                  })





                }


              })


             })



            })

          }


          } else {//ekipni

            this.sportistaServis.dohvati_ekipe_na_osnovu_sporta(tak.sport, tak.disciplina, tak.pol).subscribe((eki: Ekipa[]) => {


              this.rezultatServis.dohvati_rezultate_ekipa(this.takmicenje.idT, this.takmicenje.status).subscribe((rezz: Rezultati_ekipa[]) => {
                let uneti_rez: number[] = [];
                let rez_grupne: string[] = [];

                for (let i = 0; i < rezz.length; i++) {
                  uneti_rez.push(rezz[i].TIM1);
                  uneti_rez.push(rezz[i].TIM2);
                  if(tak.status=="grupna")
                  rez_grupne.push(rezz[i].TIM1+":"+rezz[i].TIM2);

                }

                for (let i = 0; i < eki.length; i++)
                  if (eki[i].status == "ucestvuje")
                    this.ekipe.push(eki[i]);




                if (tak.status == "grupna") { //grupna faza

                  this.rasporedServis.dohvati_raspored_ekipni(this.idT, tak.status).subscribe((ras: Raspored[]) => {

                    if (ras.length != 30)
                      this.poruka = "Potrebno je prvo uneti sve rasporede za grupnu fazu!";
                    else {

                      let grupaA: Ekipa[] = [];
                      let grupaB: Ekipa[] = [];

                      for (let i = 0; i < this.ekipe.length; i++)
                        if (this.ekipe[i].grupa == "A")
                          grupaA.push(this.ekipe[i]);
                        else //grupa B
                          grupaB.push(this.ekipe[i]);

                      
                      for(let i=0;i<grupaA.length-1;i++){
                      for(let j=i+1;j<grupaA.length;j++){
                        let rez=grupaA[i].idE+":"+grupaA[j].idE;
                        if(!rez_grupne.includes(rez))
                        this.utakmice.push(grupaA[i].zemlja+":"+grupaA[j].zemlja);  
                      }
                      }

                      for(let i=0;i<grupaB.length-1;i++){
                      for(let j=i+1;j<grupaB.length;j++){
                        let rez=grupaB[i].idE+":"+grupaB[j].idE;
                        if(!rez_grupne.includes(rez))
                        this.utakmice.push(grupaB[i].zemlja+":"+grupaB[j].zemlja);
                      }
                      }
                      if(this.utakmice.length==0){ //zavrsena grupna faza
                        this.obradi_rezultate('grupna');

                        this.poruka = "Grupna faza je uspesno zavrseno!";

                        setTimeout(function () {
                          window.location.reload();
                        }, 1500)

                      }

                    }


                  })



                } else if (tak.status == "cetvrt") { //cetvrt finale

                  this.rasporedServis.dohvati_raspored_ekipni(this.idT, tak.status).subscribe((ras: Raspored[]) => {

                    if (ras.length != 4)
                      this.poruka = "Potrebno je prvo uneti sve termine za cetvrt finale!";
                    else {
                      let grupaA: Ekipa[] = [];
                      let grupaB: Ekipa[] = [];

                      for (let i = 0; i < this.ekipe.length; i++)
                        if (this.ekipe[i].grupa == "A")
                          grupaA.push(this.ekipe[i]);
                        else //grupa B
                          grupaB.push(this.ekipe[i]);
                      //(A1+B4)+(B2+A3)
                      //(B1+A4)+(A2+B3)
                      grupaA.sort((a,b)=>{
                        return a.rank-b.rank;
                      })
                      grupaB.sort((a,b)=>{
                        return a.rank-b.rank;
                      })


                      let indexiA: number[] = [];
                      for (let i = 0; i < grupaA.length; i++)
                        if (uneti_rez.includes(grupaA[i].idE))
                          indexiA.push(i);

                      let indexiB: number[] = [];
                      for (let i = 0; i < grupaB.length; i++)
                        if (uneti_rez.includes(grupaB[i].idE))
                          indexiB.push(i);

                      if (!indexiA.includes(0) && !indexiB.includes(3))
                        this.utakmice.push(grupaA[0].zemlja + ":" + grupaB[3].zemlja);
                      if (!indexiA.includes(2) && !indexiB.includes(1))
                        this.utakmice.push(grupaB[1].zemlja + ":" + grupaA[2].zemlja);
                      if (!indexiA.includes(3) && !indexiB.includes(0))
                        this.utakmice.push(grupaB[0].zemlja + ":" + grupaA[3].zemlja);
                      if (!indexiA.includes(1) && !indexiB.includes(2))
                        this.utakmice.push(grupaA[1].zemlja + ":" + grupaB[2].zemlja);

                      if (this.utakmice.length == 0) {//zavrseno cetvrt finale

                        this.obradi_rezultate('cetvrt');

                        this.poruka = "Cetvrt finale je uspesno zavrseno!";

                        setTimeout(function () {
                          window.location.reload();
                        }, 1500)

                      }


                    }

                  })





                } else if (tak.status == "polu") {//polu finale

                  this.rasporedServis.dohvati_raspored_ekipni(this.idT, tak.status).subscribe((ras: Raspored[]) => {

                    if (ras.length != 2)
                      this.poruka = "Potrebno je prvo uneti sve termine za polu finale!";
                    else {

                      let A1 = false;
                      let A2 = false;
                      let A3 = false;
                      let A4 = false;
                      let grupaA: Ekipa[] = [];
                      let grupaB: Ekipa[] = [];

                      for (let i = 0; i < eki.length; i++)
                        if (eki[i].grupa == "A")
                          grupaA.push(eki[i]);
                        else //grupa B
                          grupaB.push(eki[i]);
                      //(A1+B4)+(B2+A3)
                      //(B1+A4)+(A2+B3)

                      grupaA.sort((a,b)=>{
                        return a.rank-b.rank;
                      })
                      grupaB.sort((a,b)=>{
                        return a.rank-b.rank;
                      })

                      let indexiA: number[] = [];
                      let cnt = 0;
                      for (let i = 0; i < eki.length; i++)
                        if (eki[i].grupa == "A") {
                          if (eki[i].status == "ucestvuje")
                            indexiA.push(cnt);
                          cnt++;
                        }

                      if (indexiA.includes(0))
                        A1 = true;
                      if (indexiA.includes(1))
                        A2 = true;
                      if (indexiA.includes(2))
                        A3 = true;
                      if (indexiA.includes(3))
                        A4 = true;

                      let indexi2A: number[] = [];
                      for (let i = 0; i < grupaA.length; i++)
                        if (uneti_rez.includes(grupaA[i].idE))
                          indexi2A.push(i);

                      let indexi2B: number[] = [];
                      for (let i = 0; i < grupaB.length; i++)
                        if (uneti_rez.includes(grupaB[i].idE))
                          indexi2B.push(i);



                      if (A1 == false && A3 == false && !indexi2B.includes(3) && !indexi2B.includes(1))
                        this.utakmice.push(grupaB[3].zemlja + ":" + grupaB[1].zemlja);
                      else if (A1 == true && A3 == false && !indexi2A.includes(0) && !indexi2B.includes(1))
                        this.utakmice.push(grupaA[0].zemlja + ":" + grupaB[1].zemlja);
                      else if (A1 == false && A3 == true && !indexi2B.includes(3) && !indexi2A.includes(2))
                        this.utakmice.push(grupaB[3].zemlja + ":" + grupaA[2].zemlja);
                      else if (A1 == true && A3 == true && !indexi2A.includes(0) && !indexi2A.includes(2))
                        this.utakmice.push(grupaA[0].zemlja + ":" + grupaA[2].zemlja)

                      if (A4 == false && A2 == false && !indexi2B.includes(0) && !indexi2B.includes(2))
                        this.utakmice.push(grupaB[0].zemlja + ":" + grupaB[2].zemlja);
                      else if (A4 == true && A2 == false && !indexi2A.includes(3) && !indexi2B.includes(2))
                        this.utakmice.push(grupaA[3].zemlja + ":" + grupaB[2].zemlja);
                      else if (A4 == false && A2 == true && !indexi2B.includes(0) && !indexi2A.includes(1))
                        this.utakmice.push(grupaB[0].zemlja + ":" + grupaA[1].zemlja);
                      else if (A4 == true && A2 == true && !indexi2A.includes(3) && !indexi2A.includes(1))
                        this.utakmice.push(grupaA[3].zemlja + ":" + grupaA[1].zemlja)


                      if (this.utakmice.length == 0) {//zavrseno polu finale

                        this.obradi_rezultate('polu');

                        this.poruka = "Polu finale je uspesno zavrseno!";

                        setTimeout(function () {
                          window.location.reload();
                        }, 1500)

                      }


                    }


                  })


                } else if (tak.status == "finale") {
                  this.rasporedServis.dohvati_raspored_ekipni(this.idT, tak.status).subscribe((ras: Raspored[]) => {

                    if (ras.length != 1)
                      this.poruka = "Potrebno je prvo uneti termin za finale!";
                    else {
                      if (!uneti_rez.includes(this.ekipe[0].idE) && !uneti_rez.includes(this.ekipe[1].idE))
                        this.utakmice.push(this.ekipe[0].zemlja + ":" + this.ekipe[1].zemlja);

                      if (this.utakmice.length == 0) { //zavrseno finale
                        this.obradi_rezultate('finale');

                        this.poruka = "Finale je uspesno zavrseno!";

                        setTimeout(function () {
                          window.location.reload();
                        }, 1500)

                      }


                    }









                  })


                } else {//za trece mesto
                  this.rasporedServis.dohvati_raspored_ekipni(this.idT, tak.status).subscribe((ras: Raspored[]) => {
                    this.ekipe = [];
                    for (let i = 0; i < eki.length; i++)
                      if (eki[i].status == "trece")
                        this.ekipe.push(eki[i]);

                    if (!uneti_rez.includes(this.ekipe[0].idE) && !uneti_rez.includes(this.ekipe[1].idE))
                      this.utakmice.push(this.ekipe[0].zemlja + ":" + this.ekipe[1].zemlja);

                    if (this.utakmice.length == 0) { //zavrseno trece nesto
                      this.obradi_rezultate('trece');

                      this.poruka = "Utakmica za trece mesto je uspesno zavrsena!";

                      setTimeout(function () {
                        window.location.reload();
                      }, 1500)

                    }



                  })
                }

              })










            })



          }


        })

      })

    })






  }

  obradi_rezultate(faza) {

    if(faza=="osmina"){

      this.rezultatServis.dohvati_rezultate_ekipa(this.idT, faza).subscribe((rezi: Rezultati_ekipa[]) => {

        let gubitnici: number[] = [];
        for (let i = 0; i < rezi.length; i++) {
          let rez1 = parseInt(rezi[i].rezultat.split(":")[0]);
          let rez2 = parseInt(rezi[i].rezultat.split(":")[1]);
          if (rez1 > rez2)
            gubitnici.push(rezi[i].TIM2);
          else
            gubitnici.push(rezi[i].TIM1);


        }
        
        this.sportistaServis.eliminisi_ekipe(gubitnici).subscribe()
       

        this.takmicenjeServis.promeni_status_takmicenja(this.idT, 'cetvrt').subscribe();

      })



    }

    if (faza == "cetvrt") {

      this.rezultatServis.dohvati_rezultate_ekipa(this.idT, faza).subscribe((rezi: Rezultati_ekipa[]) => {

        let gubitnici: number[] = [];
        for (let i = 0; i < rezi.length; i++) {
          let rez1 = parseInt(rezi[i].rezultat.split(":")[0]);
          let rez2 = parseInt(rezi[i].rezultat.split(":")[1]);
          if (rez1 > rez2)
            gubitnici.push(rezi[i].TIM2);
          else
            gubitnici.push(rezi[i].TIM1);


        }
        if(this.takmicenje.sport!="Tenis")
        this.sportistaServis.eliminisi_ekipe(gubitnici).subscribe()
        else
        this.sportistaServis.eliminisi_sportiste(gubitnici).subscribe();

        this.takmicenjeServis.promeni_status_takmicenja(this.idT, 'polu').subscribe();

      })


    } else if (faza == "polu") {
      this.rezultatServis.dohvati_rezultate_ekipa(this.idT, faza).subscribe((rezi: Rezultati_ekipa[]) => {

        let gubitnici: number[] = [];
        for (let i = 0; i < rezi.length; i++) {
          let rez1 = parseInt(rezi[i].rezultat.split(":")[0]);
          let rez2 = parseInt(rezi[i].rezultat.split(":")[1]);
          if (rez1 > rez2)
            gubitnici.push(rezi[i].TIM2);
          else
            gubitnici.push(rezi[i].TIM1);


        }
        if(this.takmicenje.sport!="Tenis")
        this.sportistaServis.za_trece_mesto(gubitnici).subscribe()
        else
        this.sportistaServis.za_trece_mesto_sportisti(gubitnici).subscribe();

        this.takmicenjeServis.promeni_status_takmicenja(this.idT, 'trece').subscribe();

      })
    } else if (faza == "finale") {
      this.rezultatServis.dohvati_rezultate_ekipa(this.idT, faza).subscribe((rezi: Rezultati_ekipa[]) => {

        let gubitnik: number;
        let pobednik: number;
        for (let i = 0; i < rezi.length; i++) {
          let rez1 = parseInt(rezi[i].rezultat.split(":")[0]);
          let rez2 = parseInt(rezi[i].rezultat.split(":")[1]);

          if (rez1 < rez2) {
            gubitnik = rezi[0].TIM1;
            pobednik = rezi[0].TIM2;

          } else {
            gubitnik = rezi[0].TIM2;
            pobednik = rezi[0].TIM1;
          }


        }

        if(this.takmicenje.sport!="Tenis"){
        this.sportistaServis.dodeli_ekipi_medalju(pobednik, 'zlato').subscribe();

        this.sportistaServis.dodeli_ekipi_medalju(gubitnik, 'srebro').subscribe();
        }else{
          this.sportistaServis.dohvati_sportistu_idS(pobednik).subscribe((spo1:Sportista)=>{
            this.sportistaServis.dohvati_sportistu_idS(gubitnik).subscribe((spo2:Sportista)=>{

              this.sportistaServis.dodeli_medalju(pobednik).subscribe();
              this.sportistaServis.dodeli_medalju(gubitnik).subscribe();
              this.zemljaServis.uvecaj_zlato_za_jedan(spo1.zemlja).subscribe();
              this.zemljaServis.uvecaj_srebro_za_jedan(spo2.zemlja).subscribe();


            })
          })

        }

        this.takmicenjeServis.zavrsi_takmicenje(this.idT).subscribe();

      })

    } else if (faza == "trece") {
      this.rezultatServis.dohvati_rezultate_ekipa(this.idT, faza).subscribe((rezi: Rezultati_ekipa[]) => {

        let gubitnik: number;
        let pobednik: number;
        for (let i = 0; i < rezi.length; i++) {
          let rez1 = parseInt(rezi[i].rezultat.split(":")[0]);
          let rez2 = parseInt(rezi[i].rezultat.split(":")[1]);

          if (rez1 < rez2) {
            gubitnik = rezi[0].TIM1;
            pobednik = rezi[0].TIM2;

          } else {
            gubitnik = rezi[0].TIM2;
            pobednik = rezi[0].TIM1;
          }


        }
        if(this.takmicenje.sport!="Tenis"){
        this.sportistaServis.dodeli_ekipi_medalju(pobednik, 'bronza').subscribe();
        this.sportistaServis.dodeli_ekipi_medalju(gubitnik, 'eliminisana').subscribe();
        }else{
          let gub=[]
          gub.push(gubitnik);
          this.sportistaServis.dodeli_medalju(pobednik).subscribe();
          this.sportistaServis.dohvati_sportistu_idS(pobednik).subscribe((sp:Sportista)=>{
            this.zemljaServis.uvecaj_bronzu_za_jedan(sp.zemlja).subscribe();
            this.sportistaServis.eliminisi_sportiste(gub).subscribe();
          })

        }
        this.takmicenjeServis.promeni_status_takmicenja(this.idT, 'finale').subscribe(); //za trece mesto

      })


    }else{//grupna faza

      this.rezultatServis.dohvati_rezultate_ekipa(this.idT,faza).subscribe((rezi:Rezultati_ekipa[])=>{

        for(let i=0;i<this.ekipe.length;i++){
        this.ekipe[i].poeni=0; 
          this.ekipe[i].poeni_sa_utakmica=0;
      }

        for(let i=0;i<this.ekipe.length;i++){
        for(let j=0;j<rezi.length;j++){
          if(rezi[j].TIM1==this.ekipe[i].idE || rezi[j].TIM2==this.ekipe[i].idE){
              let rez1= parseInt(rezi[j].rezultat.split(":")[0]);
              let rez2= parseInt(rezi[j].rezultat.split(":")[1]);
              let tim1_pobedio=false;
              if(rez1>rez2)
              tim1_pobedio=true;
            

              if(tim1_pobedio && rezi[j].TIM1==this.ekipe[i].idE ){
              this.ekipe[i].poeni+=2;
              this.ekipe[i].poeni_sa_utakmica+=rez1;
               }
              else if(!tim1_pobedio && rezi[j].TIM1==this.ekipe[i].idE ){
              this.ekipe[i].poeni+=1;
              this.ekipe[i].poeni_sa_utakmica+=rez1;  
              }
              else if(tim1_pobedio && rezi[j].TIM2==this.ekipe[i].idE){
              this.ekipe[i].poeni+=1;
              this.ekipe[i].poeni_sa_utakmica+=rez2;
              }
              else if(!tim1_pobedio && rezi[j].TIM2==this.ekipe[i].idE){
              this.ekipe[i].poeni+=2;
              this.ekipe[i].poeni_sa_utakmica+=rez2;
  
              }

          }

        }
        }//kraj prvog for-a

        let grupaA:Ekipa[]=[];
        let grupaB:Ekipa[]=[];
        let idA:number[]=[];
        let idB:number[]=[];

        for(let i=0;i<this.ekipe.length;i++)
        if(this.ekipe[i].grupa=="A")
        grupaA.push(this.ekipe[i]);
        else
        grupaB.push(this.ekipe[i]);

        grupaA.sort((a,b)=>{
          if(a.poeni!=b.poeni)
          return b.poeni-a.poeni;
          else//isti broj poena
            return b.poeni_sa_utakmica-a.poeni_sa_utakmica;
          
        })
        grupaB.sort((a,b)=>{
          if(a.poeni!=b.poeni)
          return b.poeni-a.poeni;
          else//isti broj poena
            return b.poeni_sa_utakmica-a.poeni_sa_utakmica;
          
        })
        for(let i=0;i<grupaA.length;i++)
        idA.push(grupaA[i].idE);
        for(let i=0;i<grupaB.length;i++)
        idB.push(grupaB[i].idE);
       
        let eliminisani:number[]=[grupaA[5].idE,grupaA[4].idE,grupaB[5].idE,grupaB[4].idE];
        this.sportistaServis.eliminisi_ekipe(eliminisani).subscribe();

        this.sportistaServis.azuriraj_rankove_ekipa(idA).subscribe();
        this.sportistaServis.azuriraj_rankove_ekipa(idB).subscribe();
       
        this.takmicenjeServis.promeni_status_takmicenja(this.idT,'cetvrt').subscribe();


      })


    }


  }


  unesi_ekipni() {

    if (!this.utakmica)
      this.poruka = "Polje za utakmicu ne sme biti prazno!";
    else if (!this.rezultat_utakmice)
      this.poruka = "Polje za rezultat ne sme biti prazno!";
    else {

      if (!(this.rezultat_utakmice.charAt(1) == ':' || this.rezultat_utakmice.charAt(2) == ':' || this.rezultat_utakmice.charAt(3) == ':'))
        this.bold = true;
      else {
        let rez = this.rezultat_utakmice.split(':');
        let rez1 = parseInt(rez[0]);
        let rez2 = parseInt(rez[1]);
        if (isNaN(rez1) || isNaN(rez2))
          this.bold = true;
        else if (rez1 == rez2)
          this.poruka = "Neresen rezultat nije moguc!";
        else if(this.takmicenje.sport=="Odbojka" && !((rez1==3 && (rez2>=0 && rez2<=3))||(rez2==3 && (rez1>=0 && rez1<=3))))
        this.poruka="Rezultat moze biti: 3:0,3:1, 3:2 ili obrnuto!"
        else if(this.takmicenje.sport=="Tenis" && !(rez1==0 && rez2==2 || rez1==1 && rez2==2 || rez2==0 && rez1==2 || rez2==1 && rez1==2 ))
        this.poruka="Rezultat moze biti: 2:0,2:1, ili obrnuto!"  
        else {//sve je okej
          this.bold = false;
          this.poruka = "";
          let zemlja1 = this.utakmica.split(':')[0];
          let zemlja2 = this.utakmica.split(':')[1];
          if(this.takmicenje.sport!="Tenis"){
          this.sportistaServis.dohvati_ekipu(this.takmicenje.pol, zemlja1, this.takmicenje.sport, this.takmicenje.disciplina).subscribe((eki1: Ekipa) => {
            this.sportistaServis.dohvati_ekipu(this.takmicenje.pol, zemlja2, this.takmicenje.sport, this.takmicenje.disciplina).subscribe((eki2: Ekipa) => {
              this.rezultatServis.unesi_rezultat_ekipa(this.idT, eki1.idE, eki2.idE, this.takmicenje.status, this.rezultat_utakmice).subscribe();


              this.poruka = "Uspesno ste uneli rezultat!";

              setTimeout(function () {
                window.location.reload();
              }, 1000)

            })
          })
        }else{
         this.sportistaServis.dohvati_sportistu2(zemlja1,this.takmicenje.pol,"").subscribe((spor1:Sportista)=>{
          this.sportistaServis.dohvati_sportistu2(zemlja2,this.takmicenje.pol,"").subscribe((spor2:Sportista)=>{
            this.rezultatServis.unesi_rezultat_ekipa(this.idT,spor1.idS,spor2.idS,this.takmicenje.status,this.rezultat_utakmice).subscribe()
            this.poruka = "Uspesno ste uneli rezultat!";

              setTimeout(function () {
                window.location.reload();
              }, 1000)
          })

         })

        }



        }

      }
    }

  }



  unesi_streljastvo() {

    let greska = false;
    this.bold = false;
    for (let i = 0; i < this.sportisti.length; i++) {
      if (!this.sportisti[i].rezultat) {
        this.poruka = "Polja za rezultate ne smeju biti prazna!";
        greska = true;
        break;
      } else {

        let rezultat = parseInt(this.sportisti[i].rezultat);
        if (isNaN(rezultat)) {
          greska = true;
          this.bold = true;
          break;

        }

      }
    }


    if (!greska) { //formatiranje je dobro!
      this.sportisti.sort((a, b) => { //sortiranje
        return parseInt(b.rezultat) - parseInt(a.rezultat);
      })

      let rank = 1;
      for (let i = 0; i < this.sportisti.length; i++) {
        this.rezultatServis.unesi_rezultat(this.idT, this.sportisti[i].idS, "finale " + this.serija, this.sportisti[i].rezultat, rank).subscribe();
        rank++;
      }

      if (this.serija == "6.serija") { //kraj

        // this.rezultatServis.dohvati_serije(this.idT).subscribe((rez: Rezultat[]) => {

        //   for (let i = 0; i < this.sportisti.length; i++) {
        //     let suma = 0;
        //     for (let j = 0; j < rez.length; j++)
        //       if (rez[j].ucesnik == this.sportisti[i].idS)
        //         suma += rez[j].rank;

        //     this.sportisti[i].rezultat = suma.toString();
        //   }

        //   this.sportisti.sort((a, b) => { //sortiranje po rankovima

        //     return parseInt(a.rezultat) - parseInt(b.rezultat)
        //   })





          


        // })
        this.poruka = "Poslednja serija finalne runde je uspesno zavrsena!";
          this.final = true;

      } else {
        this.poruka = this.serija + " finalne runde je uspesno zavrsena!";
        setTimeout(function () {
          window.location.reload();
        }, 1500)
      }



    }


  }

  unesi() {
    let greska = false;
    this.poruka = "";
    this.bold = false;

    if (this.format.pokusaji == 1) {
      if (!this.rezultat) {
        greska = true;
        this.poruka = "Polja za rezultate ne smeju biti prazna!";
      }
    } else if (this.format.pokusaji == 3) {
      if (!this.rezultat || !this.rezultat2 || !this.rezultat3) {
        greska = true;
        this.poruka = "Polja za rezultate ne smeju biti prazna!";
      }
    }

    if (!greska) { //sve je popunjeno

      if (this.format.pokusaji == 1) {
        if (this.format.format == "(SS,TT)") {


          let rez = this.rezultat;
          let ss = parseInt(rez.substr(0, 2));
          let zarez = rez.charAt(2);
          let tt = parseInt(rez.substr(3, 5));



          if (zarez != ',' || isNaN(ss) || isNaN(tt) || rez.length > 5) {
            greska = true;
            this.bold = true;

          }



        } else if (this.format.format == "(MM:SS,TT)") {


          let rez = this.rezultat;
          let tackice = rez.charAt(2);
          let zarez = rez.charAt(5);
          let mm = parseInt(rez.substr(0, 2));
          let ss = parseInt(rez.substr(3, 5));
          let tt = parseInt(rez.substr(6, 8));

          if (zarez != ',' || tackice != ':' || isNaN(mm) || isNaN(ss) || isNaN(tt) || rez.length > 8) {
            greska = true;
            this.bold = true;

          }




        } else if (this.format.format == "(HH:MM:SS)") {

          let rez = this.rezultat;
          let tackice1 = rez.charAt(2);
          let tackice2 = rez.charAt(5);

          let hh = parseInt(rez.substr(0, 2));
          let mm = parseInt(rez.substr(3, 5));
          let ss = parseInt(rez.substr(6, 8));

          if (tackice2 != ':' || tackice1 != ':' || isNaN(mm) || isNaN(ss) || isNaN(hh) || rez.length > 8) {
            greska = true;
            this.bold = true;
          }




        }
      } else if (this.format.pokusaji == 3) { //format za sportove sa 3 pokusaja

        if (this.format.format == "(M,CM)") {


          let rez1 = this.rezultat;
          let zarez1 = rez1.charAt(1);
          let m1 = parseInt(rez1.charAt(0));
          let cm1 = parseInt(rez1.substr(2, 4));


          let rez2 = this.rezultat2;
          let zarez2 = rez2.charAt(1);
          let m2 = parseInt(rez2.charAt(0));
          let cm2 = parseInt(rez2.substr(2, 4));

          let rez3 = this.rezultat3;
          let zarez3 = rez3.charAt(1);
          let m3 = parseInt(rez3.charAt(0));
          let cm3 = parseInt(rez3.substr(2, 4));

          if (zarez1 != ',' || isNaN(m1) || isNaN(cm1) ||
            zarez2 != ',' || isNaN(m2) || isNaN(cm2) ||
            zarez3 != ',' || isNaN(m3) || isNaN(cm3) || rez1.length > 4 || rez2.length > 4 || rez3.length > 4) {
            greska = true;
            this.bold = true;

          }



        } else { //(MM,CM)


          let rez1 = this.rezultat;
          let zarez1 = rez1.charAt(2);
          let mm1 = parseInt(rez1.substr(0, 2));
          let cm1 = parseInt(rez1.substr(3, 5));


          let rez2 = this.rezultat2;
          let zarez2 = rez2.charAt(2);
          let mm2 = parseInt(rez2.substr(0, 2));
          let cm2 = parseInt(rez2.substr(3, 5));

          let rez3 = this.rezultat3;
          let zarez3 = rez3.charAt(2);
          let mm3 = parseInt(rez3.substr(0, 2));
          let cm3 = parseInt(rez3.substr(3, 5));

          if (zarez1 != ',' || isNaN(mm1) || isNaN(cm1) ||
            zarez2 != ',' || isNaN(mm2) || isNaN(cm2) ||
            zarez3 != ',' || isNaN(mm3) || isNaN(cm3) || rez1.length > 5 || rez2.length > 5 || rez3.length > 5) {
            greska = true;
            this.bold = true;
          }

        }


        this.best_of_three();


      }


    }

    if (!greska) { //svi rezultati su u dobrom formatu!

      if (!this.bonus_runda) {

        this.rezultatServis.unesi_rezultat(this.idT, this.takmicar, "finale", this.rezultat, -1).subscribe();
        this.poruka = "Rezultat/Rezultati su uspesno uneti!";
        setTimeout(function () {
          window.location.reload()
        }, 1000)

      } else {
        this.rezultatServis.unesi_rezultat(this.idT, this.takmicar, "bonus", this.rezultat, -1).subscribe();
        this.poruka = "Rezultat/Rezultati su uspesno uneti!";
        setTimeout(function () {
          window.location.reload()
        }, 1000)

      }





    }



  }

  //pronalazi najbolji od 3 rezultata
  best_of_three() {
    if (this.format.format == "(M,CM)") {

      let m1 = parseInt(this.rezultat.charAt(0)) * 100;
      let cm1 = parseInt(this.rezultat.substr(2, 4));

      let ukupno1 = m1 + cm1;

      let m2 = parseInt(this.rezultat2.charAt(0)) * 100;
      let cm2 = parseInt(this.rezultat2.substr(2, 4));

      let ukupno2 = m2 + cm2;

      let m3 = parseInt(this.rezultat3.charAt(0)) * 100;
      let cm3 = parseInt(this.rezultat3.substr(2, 4));

      let ukupno3 = m3 + cm3;


      let max = ukupno1;

      if (ukupno2 > max)
        max = ukupno2

      if (ukupno3 > max)
        max = ukupno3;

      if (max == ukupno2)
        this.rezultat = this.rezultat2;
      else if (max == ukupno3)
        this.rezultat = this.rezultat3;




    } else { //(MM,CM)



      let mm1 = parseInt(this.rezultat.substr(0, 2)) * 100;
      let cm1 = parseInt(this.rezultat.substr(3, 5));

      let ukupno1 = mm1 + cm1;

      let mm2 = parseInt(this.rezultat2.substr(0, 2)) * 100;
      let cm2 = parseInt(this.rezultat2.substr(3, 5));

      let ukupno2 = mm2 + cm2;

      let mm3 = parseInt(this.rezultat3.substr(0, 2)) * 100;
      let cm3 = parseInt(this.rezultat3.substr(3, 5));

      let ukupno3 = mm3 + cm3;


      let max = ukupno1;

      if (ukupno2 > max)
        max = ukupno2

      if (ukupno3 > max)
        max = ukupno3;

      if (max == ukupno2)
        this.rezultat = this.rezultat2;
      else if (max == ukupno3)
        this.rezultat = this.rezultat3;








    }
  }
  rangiraj_streljace() {
    this.takmicenjeServis.zavrsi_takmicenje(this.idT).subscribe();
    this.poruka = "Svi takmicari su rangirani!";
    setTimeout(function () {
      window.location.reload();
    }, 1000)
  }
  rangiraj() {
    this.rezultatServis.dohvati_serije(this.idT).subscribe((rez: Rezultat[]) => {

      if (this.bio_bonus) {
        let bonusi: Rezultat[] = [];
        for (let i = 0; i < rez.length; i++)
          if (rez[i].faza == "bonus") {
            bonusi.push(rez[i]);
          }

        rez = bonusi;



      }

      if (this.format.pokusaji == 1) {



        if (this.format.format == "(SS,TT)") { //sortiranje
          rez.sort((a, b) => {

            let ss1 = parseInt(a.rezultat.substr(0, 2));
            let tt1 = parseInt(a.rezultat.substr(3, 5));

            let ukupno1 = ss1 * 100 + tt1;

            let ss2 = parseInt(b.rezultat.substr(0, 2));
            let tt2 = parseInt(b.rezultat.substr(3, 5));

            let ukupno2 = ss2 * 100 + tt2;

            return ukupno1 - ukupno2;


          })
        } else if (this.format.format == "(MM:SS,TT)") {
          rez.sort((a, b) => {

            let mm1 = parseInt(a.rezultat.substr(0, 2));
            let ss1 = parseInt(a.rezultat.substr(3, 5));
            let tt1 = parseInt(a.rezultat.substr(6, 8));

            let ukupno1 = mm1 * 6000 + ss1 * 100 + tt1

            let mm2 = parseInt(b.rezultat.substr(0, 2));
            let ss2 = parseInt(b.rezultat.substr(3, 5));
            let tt2 = parseInt(b.rezultat.substr(6, 8));

            let ukupno2 = mm2 * 6000 + ss2 * 100 + tt2

            return ukupno1 - ukupno2;


          })


        } else if (this.format.format == "(HH:MM:SS)") { //maraton i tako to

          rez.sort((a, b) => {

            let hh1 = parseInt(a.rezultat.substr(0, 2));
            let mm1 = parseInt(a.rezultat.substr(3, 5));
            let ss1 = parseInt(a.rezultat.substr(6, 8));

            let ukupno1 = hh1 * 3600 + mm1 * 60 + ss1;

            let hh2 = parseInt(b.rezultat.substr(0, 2));
            let mm2 = parseInt(b.rezultat.substr(3, 5));
            let ss2 = parseInt(b.rezultat.substr(6, 8));

            let ukupno2 = hh2 * 3600 + mm2 * 60 + ss2;

            return ukupno1 - ukupno2;


          })


        }


      } else if (this.format.pokusaji == 3) {


        if (this.format.format == "(M,CM)") { //sortiranje

          rez.sort((a, b) => {
            let m1 = parseInt(a.rezultat.charAt(0));
            let cm1 = parseInt(a.rezultat.substr(2, 4));
            let ukupno1 = m1 * 100 + cm1;

            let m2 = parseInt(b.rezultat.charAt(0));
            let cm2 = parseInt(b.rezultat.substr(2, 4));
            let ukupno2 = m2 * 100 + cm2;

            return ukupno2 - ukupno1;
          })
        } else { //(MM,CM)
          rez.sort((a, b) => {
            let mm1 = parseInt(a.rezultat.substr(0, 2));
            let cm1 = parseInt(a.rezultat.substr(3, 5));
            let ukupno1 = mm1 * 100 + cm1;

            let mm2 = parseInt(b.rezultat.substr(0, 2));
            let cm2 = parseInt(b.rezultat.substr(3, 5));
            let ukupno2 = mm2 * 100 + cm2;

            return ukupno2 - ukupno1;
          })


        }



      }

      if (!this.bio_bonus) {
        // let rank = 1;
        // for (let i = 0; i < rez.length; i++) {
        //   if (i > 0) {
        //     if (rez[i - 1].rezultat != rez[i].rezultat) {
        //       this.rezultatServis.azuriraj_rank(rez[i].idT, rez[i].ucesnik, rank, "finale").subscribe();
        //       rank++;
        //     } else {
        //       this.rezultatServis.azuriraj_rank(rez[i].idT, rez[i].ucesnik, (rank - 1), "finale").subscribe();
        //     }
        //   } else {

        //     this.rezultatServis.azuriraj_rank(rez[i].idT, rez[i].ucesnik, rank, "finale").subscribe();
        //     rank++;

        //   }

        // }
        let index=-1; //na ovom mestu ostaje isti rank
        for(let i=0;i<rez.length-1;i++)
        for(let j=i+1;j<rez.length;j++){
        if(rez[i].rezultat==rez[j].rezultat){
          index=j;
          break;
        } 
        if(index!=-1)
        break;
        }
        let ucesnici:number[]=[];
        for(let i=0;i<rez.length;i++)
        ucesnici.push(rez[i].ucesnik);

      this.rezultatServis.azuriraj_rank(this.idT, ucesnici,index, "finale").subscribe();




      } else {

        // this.rezultatServis.azuriraj_rank(rez[0].idT, rez[0].ucesnik, 1, "bonus").subscribe();
        // this.rezultatServis.azuriraj_rank(rez[1].idT, rez[1].ucesnik, 2, "bonus").subscribe();
        let ucesnici:number[]=[rez[0].ucesnik,rez[1].ucesnik]
        this.rezultatServis.azuriraj_rank(this.idT,ucesnici,-1,'bonus').subscribe();

      }




      /*Bonus runda provera*/
      this.bonus_runda = false;

      if (this.format.format != "(HH:MM:SS)") {//za maraton i hodanje i biciklizam nema bonus runda?

        if (rez.length > 2) {
          if (rez[0].rezultat == rez[1].rezultat
            || rez[1].rezultat == rez[2].rezultat ||
            rez[2].rezultat == rez[3].rezultat) {
            this.bonus_runda = true;
             
            if(rez[0].rezultat==rez[1].rezultat)
            this.rez = rez[0].rezultat;
            else if(rez[1].rezultat==rez[2].rezultat)
            this.rez=rez[1].rezultat
            else if(rez[2].rezultat==rez[3].rezultat)
            this.rez=rez[2].rezultat;

          }
        } else {
          if (rez[0].rezultat == rez[1].rezultat) { //opet bonus runda
            this.bonus_runda = true;

            this.rez = rez[0].rezultat;
          }

        }

      }


      if (!this.bonus_runda) {


        this.poruka = "Svi takmicari su rangirani!";

        this.takmicenjeServis.zavrsi_takmicenje(this.idT).subscribe();

      }
      else if (this.bonus_runda) {
        this.poruka = "Dva takmicara dele medalje pa se odrzava bonus runda za njih!";
        setTimeout(function () {
          window.location.reload();
        }, 1000)

      }



      //bila bonus runda


      //   this.rangiraj_final(rez);
      this.takmicenjeServis.zavrsi_takmicenje(this.idT).subscribe();
      this.poruka = "Svi takmicari su rangirani!";


    })



  }




  odjava() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}
