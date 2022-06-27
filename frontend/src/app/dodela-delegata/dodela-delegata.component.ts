import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Delegat } from '../models/delegat';
import { Korisnik } from '../models/korisnik';
import { Takmicenje } from '../models/takmicenje';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-dodela-delegata',
  templateUrl: './dodela-delegata.component.html',
  styleUrls: ['./dodela-delegata.component.css']
})
export class DodelaDelegataComponent implements OnInit {

  constructor(private ruter:Router,private takmicenjaServis:TakmicenjeService,private korisnikServis:KorisnikService) { }
  
  takmicenja:Takmicenje[];
  takmicenje:string;
  svi_delegati:Korisnik[];
  delegati:string[];
  poruka:string;
  greska:boolean;
  trenutni_delegati:Korisnik[];


  ngOnInit(): void {
    this.takmicenja=[];
    this.takmicenjaServis.dohvati_sva_takmicenja().subscribe((tak:Takmicenje[])=>{
      this.takmicenja=tak;
    })
    this.korisnikServis.dohvati_delegate().subscribe((del:Korisnik[])=>{
      this.svi_delegati=del;
    })
  }
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
  submit(){
    this.trenutni_delegati=[];
    let takmicenje=this.takmicenje.split('-');
    let sport=takmicenje[0];
    let disc=takmicenje[1];
    let pol=takmicenje[2];
    this.takmicenjaServis.dohvati_takmicenje(sport,disc,pol).subscribe((tak:Takmicenje)=>{
      this.takmicenjaServis.dohvati_delegate_takmicenja(tak.idT).subscribe((del:Delegat)=>{
        for(let i=0;i<del.delegati.length;i++)
        this.korisnikServis.dohvati_korisnika(del.delegati[i]).subscribe((kor:Korisnik)=>{
          this.trenutni_delegati.push(kor);
        })

      })

    })
  }
  dodeli(){
    
    this.greska=false;
    if(!this.takmicenje)
    this.poruka="Polje za takmicenje ne sme biti prazno!";
    else if(!this.delegati || this.delegati.length==0)
    this.poruka="polje za izbor delegata ne sme biti prazno!";
    else{

     let takmicenje=this.takmicenje.split('-');
     let sport=takmicenje[0];
     let disc=takmicenje[1];
     let pol=takmicenje[2];
     this.takmicenjaServis.dohvati_takmicenje(sport,disc,pol).subscribe((tak:Takmicenje)=>{
      this.takmicenjaServis.dohvati_delegate_takmicenja(tak.idT).subscribe((del:Delegat)=>{
        

        if(del){
          for(let i=0;i<del.delegati.length;i++)
          if(this.delegati.includes(del.delegati[i])){
            this.greska=true;
            this.poruka="Navedeni delegat/delegati su vec dodeljeni za ovo takmicenje"
            break;
          }
          if(!this.greska){

            for(let i=0;i<this.delegati.length;i++)
            this.takmicenjaServis.dodaj_delegata(tak.idT,this.delegati[i]).subscribe();

            this.poruka="Uspesno ste dodali delegata/delegate"

            setTimeout(function(){
              window.location.reload();
            },3000)
          }
          


        }else{
          this.takmicenjaServis.dodaj_delegata_novo(tak.idT,this.delegati[0]).subscribe();
          for(let i=1;i<this.delegati.length;i++)
          this.takmicenjaServis.dodaj_delegata(tak.idT,this.delegati[i]).subscribe();

            this.poruka="Uspesno ste dodali delegata/delegate"
            setTimeout(function(){
              window.location.reload();
            },3000)

        }

      })

     })
      
    }
  
  
  
  }
}
