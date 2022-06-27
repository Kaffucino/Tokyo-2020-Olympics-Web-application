import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../models/sport';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-unos-sporta',
  templateUrl: './unos-sporta.component.html',
  styleUrls: ['./unos-sporta.component.css']
})
export class UnosSportaComponent implements OnInit {

  constructor(private ruter:Router,private sportistaServis:SportistaService) { }

  svi_sportovi:Sport[];

  trenutni_sportovi:Sport[];

  poruka:string;
  sportovi:string[];
  discipline:string[];

  sport:string;
  disciplina:string;

  ngOnInit(): void {

    this.sportovi=[];
    this.trenutni_sportovi=[];
    this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{
      this.svi_sportovi=spor;
      
      for(let i=0;i<spor.length;i++)
      if(spor[i].status)
      this.trenutni_sportovi.push(spor[i]);


      for(let i=0;i<spor.length;i++)
      if(!this.sportovi.includes(spor[i].naziv))
      this.sportovi.push(spor[i].naziv)
      this.sport=null;

    })

  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);

  }
  submit(){
    this.discipline=[];
    for(let i=0;i<this.svi_sportovi.length;i++)
    if(!this.discipline.includes(this.svi_sportovi[i].disciplina) && this.svi_sportovi[i].naziv==this.sport){
    this.discipline.push(this.svi_sportovi[i].disciplina);
     
  }



  }
  unesi(){
    
    this.sportistaServis.dohvati_sport(this.sport,this.disciplina).subscribe((spor:Sport)=>{
      if(spor.status==true)
      this.poruka="Ovaj sport i disciplina su vec uneti!";
      else{
        this.sportistaServis.unesite_sport(this.sport,this.disciplina).subscribe();
        this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{

          this.trenutni_sportovi=[];
          for(let i=0;i<spor.length;i++)
          if(spor[i].status)
          this.trenutni_sportovi.push(spor[i]);

        })
        
        this.poruka="Sport i disciplina su uspesno uneti!";

      }


    })
    


  }
}
