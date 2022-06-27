import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sportista } from '../models/sportista';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-vodja-discipline',
  templateUrl: './vodja-discipline.component.html',
  styleUrls: ['./vodja-discipline.component.css']
})
export class VodjaDisciplineComponent implements OnInit {

  constructor(private ruter:Router,private aktivnaRuta:ActivatedRoute,private sportistaServis:SportistaService) { }

  sport:string;
  disciplina:string;
  sportisti:Sportista[];

  ngOnInit(): void {
    this.sport=this.aktivnaRuta.snapshot.paramMap.get('sport');
    this.disciplina=this.aktivnaRuta.snapshot.paramMap.get('disciplina');
    
    this.sportisti=[];
    this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(this.sport,this.disciplina,"").subscribe((spor:Sportista[])=>{

      for(let i=0;i<spor.length;i++)
      this.sportisti.push(spor[i]);
      this.sportisti.sort((a,b)=>{
        
        let ime_prezime1=a.ime_i_prezime.split(" ");
        let ime1=ime_prezime1[0];
        let prezime1=ime_prezime1[1];

        let ime_prezime2=b.ime_i_prezime.split(" ");
        let ime2=ime_prezime2[0];
        let prezime2=ime_prezime2[1];

        if(prezime1>prezime2)
        return 1;
        else if(prezime1<prezime2)
        return -1;
        else{
          if(ime1>ime2)
          return 1;
          else
          return -1;

        }
       
      })
    })

  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);

  }
}
