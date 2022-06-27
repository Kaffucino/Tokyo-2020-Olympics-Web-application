import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-vodja-naziv-sporta',
  templateUrl: './vodja-naziv-sporta.component.html',
  styleUrls: ['./vodja-naziv-sporta.component.css']
})
export class VodjaNazivSportaComponent implements OnInit {

  constructor(private ruter:Router,private aktivnaRuta:ActivatedRoute,private sportistaServis:SportistaService) { }

  sport:string;
  discipline:string[];

  ngOnInit(): void {
    this.discipline=[];
    this.sport= this.aktivnaRuta.snapshot.paramMap.get('sport');
    if(this.sport=="Kosarka" || this.sport=="Odbojka" || this.sport=="Vaterpolo")
    this.ruter.navigate(['/vodja/vodja_sportisti/sportovi/',this.sport,'/'])                                                                                                                           
    else
    this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{

      for(let i=0;i<spor.length;i++)
      if(spor[i].naziv==this.sport)
        this.discipline.push(spor[i].disciplina)

    })
    
  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}
