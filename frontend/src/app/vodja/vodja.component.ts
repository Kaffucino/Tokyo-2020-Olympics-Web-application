import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Ekipa } from '../models/ekipa';
import { Format } from '../models/format';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private ruter:Router,private sportistaServis:SportistaService,private takmicenjeServis:TakmicenjeService) { }

  sportovi:Sport[];
  naziv_sportova:string[];
  discipline:string[];
  poruka:string;
  poruka2:string;

  tip:string;
  sport:string;
  disciplina:string;
  ime:string;
  prezime:string;
  pol:string;

  min:number;
  max:number;
  brojac:number
  postoji_ekipa:boolean
  idS:number;//za unos clana ekipe

  ngOnInit(): void {
    
    this.brojac=0;
    this.postoji_ekipa=false;
    this.sportovi=[];

    




    this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{
      for(let i=0;i<spor.length;i++)
      if(spor[i].status)
      this.sportovi.push(spor[i]);


      

    })
   
   
  }


  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  prijava(){
    if(!this.sport)
    this.poruka="Polje za sport ne sme biti prazno!";
    else if(!this.disciplina)
    this.poruka="Polje za disciplinu ne sme biti prazno!";

    if(this.sport && this.tip && this.disciplina){

      if(this.tip=="individ"){

        if(!this.ime)
        this.poruka="Polje za ime ne sme biti prazno!";
        else if(!this.prezime)
        this.poruka="Polje za prezime ne sme biti prazno!";
        else if(!this.pol)
        this.poruka="Polje za pol ne sme biti prazno!";

        if(this.ime && this.prezime && this.pol){
          this.poruka="";
          
          let ime_prezime=this.ime+" "+this.prezime;
          let zemlja=JSON.parse(localStorage.getItem('ulogovan')).zemlja;


          this.sportistaServis.dohvati_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina).subscribe((sp:Sportista)=>{
              if(sp)
              this.poruka="Sportista je vec prijavljen za ovu disciplinu!";
              else{

                this.sportistaServis.dohvati_sportistu2(ime_prezime,this.pol,zemlja).subscribe((sp2:Sportista)=>{

                  this.takmicenjeServis.dohvati_takmicenje(this.sport,this.disciplina,this.pol).subscribe((tak:Takmicenje)=>{
                     
                    
               
                    if(tak){
                      if(tak.status=="formirano")
                    this.poruka="Navedeno takmicenje je vec formirano!";
                    else{
                      if(sp2){
                        if(sp2.sport!=this.sport)
                        this.poruka="Navedeni sportista je vec prijavljen za drugi sport!"
                        else{
                          this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"cekanje").subscribe();
                         

                          this.poruka="Uspesno ste prijavili sportistu!"

                          setTimeout(function(){
                            window.location.reload();
                          },1000)

                        }
                      }else{
                        this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"cekanje").subscribe();
                       

                        this.poruka="Uspesno ste prijavili sportistu!"
                        
                        setTimeout(function(){
                          window.location.reload();
                        },1000)
                      }

                    }

                    }else{
                      if(sp2){
                        if(sp2.sport!=this.sport)
                        this.poruka="Navedeni sportista je vec prijavljen za drugi sport!"
                        else{
                          this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"cekanje").subscribe();
                          

                          this.poruka="Uspesno ste prijavili sportistu!"
                          
                          setTimeout(function(){
                            window.location.reload();
                          },1000)
                        }
                      }else{
                        this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"cekanje").subscribe();
                          

                          this.poruka="Uspesno ste prijavili sportistu!"
                          
                          setTimeout(function(){
                            window.location.reload();
                          },1000)
                      }

                    }


                  })

                  



                })

                
              }


          })

          

        }


      }else{ // ekipni

        if(this.sport!="Tenis"){

          if(!this.ime)
          this.poruka="Polje za ime ne sme biti prazno!";
          else if(!this.prezime)
          this.poruka="Polje za prezime ne sme biti prazno!";
          else if(!this.pol)
          this.poruka="Polje za pol ne sme biti prazno!";
  
          if(this.ime && this.prezime && this.pol){
            this.poruka="";
            
            let ime_prezime=this.ime+" "+this.prezime;
            let zemlja=JSON.parse(localStorage.getItem('ulogovan')).zemlja;
  
  
            this.sportistaServis.dohvati_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina).subscribe((sp:Sportista)=>{
                if(sp)
                this.poruka="Sportista je vec prijavljen za ovu disciplinu!";
                else{
  
                  this.sportistaServis.dohvati_sportistu2(ime_prezime,this.pol,zemlja).subscribe((sp2:Sportista)=>{
  
                    this.takmicenjeServis.dohvati_takmicenje(this.sport,this.disciplina,this.pol).subscribe((tak:Takmicenje)=>{
                       
                      
                 
                      if(tak){
                        if(tak.status=="formirano")
                      this.poruka="Navedeno takmicenje je vec formirano!";
                      else{
                        if(sp2){
                          if(sp2.sport!=this.sport)
                          this.poruka="Navedeni sportista je vec prijavljen za drugi sport!"
                          else{

                            if(this.brojac==this.max)
                            this.poruka="Ne mozete prijaviti vise od "+this.max+" clanova";
                            else{
                            this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"ekipa").subscribe();
                          if(!this.postoji_ekipa)
                          this.sportistaServis.unesite_ekipu_prvi_put(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                          else
                          this.sportistaServis.unesite_clana_ekipe(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                          this.poruka="Uspesno ste prijavili sportistu!"
                          
                          setTimeout(function(){
                            window.location.reload();
                          },1000)
                            }
                          }
                        }else{
                          if(this.brojac==this.max)
                          this.poruka="Ne mozete prijaviti vise od "+this.max+" clanova";
                          else{
                          this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"ekipa").subscribe();
                        if(!this.postoji_ekipa)
                        this.sportistaServis.unesite_ekipu_prvi_put(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                        else
                        this.sportistaServis.unesite_clana_ekipe(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                        this.poruka="Uspesno ste prijavili sportistu!"
                        
                        setTimeout(function(){
                          window.location.reload();
                        },1000)
                          }
                        }
  
                      }
  
                      }else{
                        if(sp2){
                          if(sp2.sport!=this.sport)
                          this.poruka="Navedeni sportista je vec prijavljen za drugi sport!"
                          else{
                            if(this.brojac==this.max)
                            this.poruka="Ne mozete prijaviti vise od "+this.max+" clanova";
                            else{
                            this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"ekipa").subscribe();
                          if(!this.postoji_ekipa)
                          this.sportistaServis.unesite_ekipu_prvi_put(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                          else
                          this.sportistaServis.unesite_clana_ekipe(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                            
                          this.poruka="Uspesno ste prijavili sportistu!"
                          
                          setTimeout(function(){
                            window.location.reload();
                          },1000)
                            }
                          }
                        }else{
                          if(this.brojac==this.max)
                          this.poruka="Ne mozete prijaviti vise od "+this.max+" clanova";
                          else{
                          this.sportistaServis.unesite_sportistu(ime_prezime,this.pol,zemlja,this.sport,this.disciplina,"ekipa").subscribe();
                        if(!this.postoji_ekipa)
                        this.sportistaServis.unesite_ekipu_prvi_put(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                        else
                        this.sportistaServis.unesite_clana_ekipe(this.idS,zemlja,this.pol,this.sport,this.disciplina).subscribe();
                        this.poruka="Uspesno ste prijavili sportistu!"
                        
                        setTimeout(function(){
                          window.location.reload();
                        },1000)
                          }
                        }
  
                      }
  
  
                    })
  
                    
  
  
  
                  })
  
                  
                }
  
  
            })
  
            
  
          }





        }else{//Tenis

        }


      
      }


    }

  }




  submit(){
    this.naziv_sportova=[];
    for(let i=0;i<this.sportovi.length;i++)
    if(this.sportovi[i].vrsta==this.tip && !this.naziv_sportova.includes(this.sportovi[i].naziv))
    this.naziv_sportova.push(this.sportovi[i].naziv);
    
    this.sport="";
    this.submit2();
  

  }


  submit3(){
    this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(this.sport,this.disciplina,this.pol).subscribe((spo:Sportista[])=>{
      
      
      this.brojac=0;
      let zemlja=JSON.parse(localStorage.getItem('ulogovan')).zemlja;
      for(let i=0;i<spo.length;i++)
      if(spo[i].zemlja==zemlja)
      this.brojac++;
      
      this.sportistaServis.dohvati_ekipu(this.pol,zemlja,this.sport,this.disciplina).subscribe((eki:Ekipa)=>{

        if(eki)
        this.postoji_ekipa=true;

        this.sportistaServis.dohvati_sve_sportiste().subscribe((sporti:Sportista[])=>{
          sporti.sort((a,b)=>{
            return b.idS-a.idS;
          })
          this.idS=sporti[0].idS+1;
        })
        
      })



    })
  }
  submit2(){
   
    this.discipline=[];
    for(let i=0;i<this.sportovi.length;i++)
    if(this.sportovi[i].naziv==this.sport && this.sportovi[i].vrsta==this.tip)
    this.discipline.push(this.sportovi[i].disciplina)

    this.disciplina=this.discipline[0];

    if(this.tip=="ekipni" && this.sport && this.disciplina){

      this.sportistaServis.dohvati_sport(this.sport,this.disciplina).subscribe((spor:Sport)=>{
        if(spor.naziv!="Tenis"){
          let min_max=spor.min_max.split('/');
          let min=min_max[0];
          let max=min_max[1];
          this.min=parseInt(min);
          this.max=parseInt(max);
          this.poruka2="Potrebno je najmanje "+min+" ,a najvise "+max+" clanova ekipe";
        }else{ //tenis

        }
        if(this.pol)
        this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(this.sport,this.disciplina,this.pol).subscribe((spo:Sportista[])=>{

         
          this.brojac=0;
          let zemlja=JSON.parse(localStorage.getItem('ulogovan')).zemlja;
          for(let i=0;i<spo.length;i++)
          if(spo[i].zemlja==zemlja)
          this.brojac++;
         
          this.sportistaServis.dohvati_ekipu(this.pol,zemlja,this.sport,this.disciplina).subscribe((eki:Ekipa)=>{

            if(eki)
            this.postoji_ekipa=true;

            this.sportistaServis.dohvati_sve_sportiste().subscribe((sporti:Sportista[])=>{
              sporti.sort((a,b)=>{
                return b.idS-a.idS;
              })
              this.idS=sporti[0].idS+1;
            })
            
          })



        })


      })

    }

    //this.submit();
  }
}
