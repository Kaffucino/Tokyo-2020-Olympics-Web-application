import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ekipa } from '../models/ekipa';
import { Lokacija } from '../models/lokacija';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-unos-takmicenja',
  templateUrl: './unos-takmicenja.component.html',
  styleUrls: ['./unos-takmicenja.component.css']
})
export class UnosTakmicenjaComponent implements OnInit {

  constructor(private ruter:Router,private sportistaServis:SportistaService,private takmicenjeServis:TakmicenjeService) { }

  

  sportovi:Sport[];
  sportovi_naziv:string[];
  
  sport:string;
  disciplina:string;
  pol:string;
  pocetak:string;
  kraj:string;
  mesta:string[];

  discipline:string[];
  lokacije:Lokacija[];

  poruka:string;

  ngOnInit(): void {

   

    this.discipline=[];
    this.sportistaServis.dohvati_lokacije().subscribe((lok:Lokacija[])=>{
      this.lokacije=lok;
    })
    this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{
      this.sportovi=spor;
      this.sportovi_naziv=[];
      for(let i=0;i<this.sportovi.length;i++)
      if(!this.sportovi_naziv.includes(this.sportovi[i].naziv) && this.sportovi[i].status)
      this.sportovi_naziv.push(this.sportovi[i].naziv)
    })
  }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
  submit(){
    this.discipline=[];

    for(let i=0;i<this.sportovi.length;i++)
    if(this.sportovi[i].naziv==this.sport && this.sportovi[i].status)
    this.discipline.push(this.sportovi[i].disciplina)


  }

 

  unesi(){

  
    if(!this.sport)
    this.poruka="Polje za sport ne sme biti prazno!";
    else if(!this.disciplina)
    this.poruka="Polje za disciplinu ne sme biti prazno!";
    else if(!this.pol)
    this.poruka="Polje za pol ne sme biti prazno!";
    else if(!this.pocetak)
    this.poruka="Polje za datum pocetka ne sme biti prazno!";
    else if(!this.kraj)
    this.poruka="Polje za datum kraja ne sme biti prazno!";
    else if(!this.mesta)
    this.poruka="Morate izabrati barem 1 lokaciju!";
    
    else{
      this.sportistaServis.dohvati_sport(this.sport,this.disciplina).subscribe((spor:Sport)=>{
        
        if(spor.vrsta=="individ" && this.mesta.length>1)
        this.poruka="Individualni sportovi podrzavaju samo 1 lokaciju!"
        else{
          let pocetak=new Date(this.pocetak);
      let kraj=new Date(this.kraj);
      if(pocetak>kraj)
      this.poruka="Datum pocetka ne moze biti nakon datuma kraja!";
      else{


        this.takmicenjeServis.dohvati_takmicenje(this.sport,this.disciplina,this.pol).subscribe((tak:Takmicenje)=>{
            if(tak)
            this.poruka="Takmicenje za navedeni sport i disciplinu je vec uneto!";
            else{
              this.sportistaServis.dohvati_sport(this.sport,this.disciplina).subscribe((spor:Sport)=>{
                let konkurencija=spor.vrsta;
                this.takmicenjeServis.unesi_takmicenje(this.sport,this.disciplina,this.pol,this.pocetak,this.kraj,this.mesta,konkurencija).subscribe();
                this.poruka="Takmicenje je uspesno uneto!";
               
               


      
              })

            }


        })

        
      
      }


        }


      })
      


    }

  }
}
