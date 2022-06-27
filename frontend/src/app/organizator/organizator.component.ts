import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private ruter:Router,private korisnikServis:KorisnikService,private zemljaServis:ZemljeService) { }

  zahtevi:Korisnik[];

  ngOnInit(): void {
    this.zahtevi=[];
    this.korisnikServis.dohvati_zahteve_za_registraciju().subscribe((zah:Korisnik[])=>{
      this.zahtevi=zah;
    

    })
  }
  
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }
  odobri(){
    
    for(let i=0;i<this.zahtevi.length;i++)
    if(this.zahtevi[i].selektovan){
      if(this.zahtevi[i].tip=="vodja"){
      this.zemljaServis.unesi_zemlju(this.zahtevi[i].zemlja).subscribe();
      this.zemljaServis.unesi_medalju(this.zahtevi[i].zemlja).subscribe();
      }
      this.korisnikServis.odobri_korisnika(this.zahtevi[i].korime).subscribe();
    
  }
    setTimeout(function(){
      window.location.reload();
    },500);

  }

}
