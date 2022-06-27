import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rekord } from '../models/rekord';
import { Sport } from '../models/sport';
import { SportistaService } from '../sportista.service';

@Component({
  selector: 'app-rekordi',
  templateUrl: './rekordi.component.html',
  styleUrls: ['./rekordi.component.css']
})
export class RekordiComponent implements OnInit {

  constructor(private ruter:Router,private sportistaServis:SportistaService) { }

  sportovi:Sport[];
  sportovi_naziv:string[];
  
  sport:string;
  rekordi:Rekord[];

  ngOnInit(): void {
    this.sportovi_naziv=[];
    this.sportistaServis.dohvati_sportove().subscribe((spor:Sport[])=>{
      this.sportovi=spor;
      for(let i=0;i<this.sportovi.length;i++)
      if(!this.sportovi_naziv.includes(this.sportovi[i].naziv) && this.sportovi[i].vrsta=="individ" && this.sportovi[i].naziv!="Tenis")
      this.sportovi_naziv.push(this.sportovi[i].naziv)
    })
 
    
  
  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
  submit(){
    this.sportistaServis.dohvati_rekorde(this.sport).subscribe((rek:Rekord[])=>{
      this.rekordi=rek;
    })
  }

}
