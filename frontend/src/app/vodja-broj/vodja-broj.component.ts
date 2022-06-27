import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brojac_Sportista } from '../models/brojac_sportista';
import { Sportista } from '../models/sportista';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-vodja-broj',
  templateUrl: './vodja-broj.component.html',
  styleUrls: ['./vodja-broj.component.css']
})




export class VodjaBrojComponent implements OnInit {

  constructor(private ruter:Router,private sportistaServis:SportistaService) { }

  sportisti:Sportista[];
  sportovi:string[];

  brojac:Brojac_Sportista[];


  ngOnInit(): void {
    this.sportovi=[];
    this.brojac=[];
    this.sportisti=[];
    let zemlja= JSON.parse(localStorage.getItem('ulogovan')).zemlja;
    this.sportistaServis.dohvati_sportiste_na_osnovu_zemlje(zemlja).subscribe((sporti:Sportista[])=>{
      for(let i=0;i<sporti.length;i++)
      if(sporti[i].status=="ucestvuje")
      this.sportisti.push(sporti[i]);
      
      for(let i=0;i<this.sportisti.length;i++)
      if(!this.sportovi.includes(this.sportisti[i].sport))
      this.sportovi.push(this.sportisti[i].sport);

      let cnt=0;
      let niz:string[];

      for(let i=0;i<this.sportovi.length;i++){
        cnt=0;
        niz=[];
        for(let j=0;j<this.sportisti.length;j++)
        if(this.sportovi[i]==this.sportisti[j].sport && !niz.includes(this.sportisti[j].ime_i_prezime)){
          niz.push(this.sportisti[j].ime_i_prezime);
          cnt++;
        }  
        let elem:Brojac_Sportista=new Brojac_Sportista();
        elem.sport=this.sportovi[i];
        elem.broj=cnt;
        this.brojac.push(elem);
      }

     

    })
  }
  
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}
