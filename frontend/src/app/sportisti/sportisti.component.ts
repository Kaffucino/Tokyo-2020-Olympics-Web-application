import { Component, OnInit } from '@angular/core';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportistaService } from '../sportista.service';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-sportisti',
  templateUrl: './sportisti.component.html',
  styleUrls: ['./sportisti.component.css']
})
export class SportistiComponent implements OnInit {

  constructor(private sportistaServis:SportistaService,private zemljaServis:ZemljeService) { }
  

  sportovi:string[];
  zemlje:Zemlja[];
  discipline:string[];
  sportovi2:Sport[];


  sportisti:Sportista[];
  ime_i_prezime:string;
  zemlja:string;
  sport:string;
  disciplina:string;
  pol:string;
  medalja:boolean;

  duzina:any;
  stranica:number;
  max_prikaz:number;

  prikaz:number;


  ngOnInit(): void {
   this.max_prikaz=10;
   this.sportovi=[];
   this.discipline=[];
    this.sportistaServis.nadji_sportistu_ime_zemlja_sport(this.ime_i_prezime,this.zemlja,this.sport).subscribe((spor:Sportista[])=>{

      this.sportisti=spor;
      this.medalja=false;

      this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{
        this.sportovi2=spor;
          for(let i=0;i<spor.length;i++)
          if(!this.sportovi.includes(spor[i].naziv) && spor[i].status==true)
          this.sportovi.push(spor[i].naziv);
          this.zemljaServis.dohvati_sve_zemlje().subscribe((ze:Zemlja[])=>{
            this.zemlje=ze;



          })
          


      })

    })
  }
  submit(){
    this.discipline=[];
    for(let i=0;i<this.sportovi2.length;i++)
    if(this.sportovi2[i].naziv==this.sport && this.sportovi2[i].status==true)
    this.discipline.push(this.sportovi2[i].disciplina)
  }

  submit_radio_musko(){
    if(this.pol=="Musko")
    this.pol=null;

  }
  submit_radio_zensko(){
    if(this.pol=="Zensko")
    this.pol=null;

  }

  pretrazi(){
    if(!this.ime_i_prezime)  
     this.ime_i_prezime=null;
    if(this.zemlja=='undefined')
      this.zemlja=null;
    if(this.sport=='undefined')
    this.sport=null;
    if(this.disciplina=='undefined')
    this.disciplina=null;

    if(!this.ime_i_prezime && !this.zemlja && !this.sport && !this.disciplina && !this.pol && !this.medalja){
      this.sportistaServis.nadji_sportistu_ime_zemlja_sport(this.ime_i_prezime,this.zemlja,this.sport).subscribe((spor:Sportista[])=>{
        this.sportisti=spor;
      })
    }else{

    this.sportistaServis.nadji_sportistu_ime_zemlja_sport(this.ime_i_prezime,this.zemlja,this.sport).subscribe((spor:Sportista[])=>{
      
      if(this.disciplina || this.pol || this.medalja==true){
      let spor2:Sportista[]=[];
     
      if(this.disciplina && !this.pol){
        for(let i=0;i<spor.length;i++)
        if(spor[i].disciplina==this.disciplina  && spor[i].medalja==this.medalja)
        spor2.push(spor[i]);
      }else if(!this.disciplina && this.pol){
        for(let i=0;i<spor.length;i++)
        if(spor[i].pol==this.pol  && spor[i].medalja==this.medalja)
        spor2.push(spor[i]);
      }else if(this.disciplina && this.pol){
        for(let i=0;i<spor.length;i++)
        if(spor[i].pol==this.pol && spor[i].disciplina==this.disciplina  && spor[i].medalja==this.medalja)
        spor2.push(spor[i]);
      }else if(!this.disciplina && !this.pol){
        for(let i=0;i<spor.length;i++)
        if( spor[i].medalja==this.medalja)
        spor2.push(spor[i]);
      }

      this.sportisti=spor2;
      
    }else{
      this.sportisti=spor;
    }


    })
  }
  }
  promeni_prikaz(){
   this.max_prikaz=this.prikaz
   
  }
  

}
