import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService,private ruter:Router) { }

  korime:string;
  lozinka:string;
  poruka:string;

  ngOnInit(): void {
  }
  prijava(){

    if(!this.korime )
    this.poruka="Polje za korisnicko ime ne sme biti prazno!";
    else if(!this.lozinka)
    this.poruka="Polje za lozinku ne sme biti prazno!";
    else{
    this.korisnikServis.prijava(this.korime,this.lozinka).subscribe((kor:Korisnik)=>{

      if(kor){


        localStorage.setItem('ulogovan',JSON.stringify(kor));
        this.poruka="";
        if(kor.tip=="organizator")
        this.ruter.navigate(['organizator']);
        else if(kor.tip=="vodja")
        this.ruter.navigate(['vodja']);
        else
        this.ruter.navigate(['delegat']);

      }else
      this.poruka='Korisnicko ime / lozinka nisu dobri';


    })
  }
  }
}
