import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService,private ruter:Router) { }

  korime: string;
  lozinka: string;
  lozinka2: string;
  poruka: string;

  ngOnInit(): void {
  }

  uzastupno_ponavljanje() { //provera za lozinku2

    let cnt = 0;
    for (let i = 0; i < this.lozinka2.length - 1; i++) {
      cnt = 0;
      for (let j = i + 1; j < this.lozinka2.length; j++) {
        if (this.lozinka2.charAt(i) != this.lozinka2.charAt(j))
          break;
        cnt++;
        if (cnt == 3)
          return false;
      }
    }


    return true;

  }

  azuriraj() {
    if (!this.korime)
      this.poruka = "Polje za korisnicko ime ne sme biti prazno!";
    else if (!this.lozinka)
      this.poruka = "Polje za lozinku ne sme biti prazno!";
    else if (!this.lozinka2)
      this.poruka = "Polje za novu lozinku ne sme biti prazno!";
    else {

      this.korisnikServis.dohvati_korisnika(this.korime).subscribe((kor: Korisnik) => {

        if (!kor)
          this.poruka = "Korisnicko ime ne postoji u sistemu!";
        else {

          if (kor.status == "cekanje")
            this.poruka = "Korisnicko ime ne postoji u sistemu!";
          else {

            this.korisnikServis.dohvati_korisnika2(this.korime, this.lozinka).subscribe((kor: Korisnik) => {

              if (!kor)
                this.poruka = "Lozinka za datog korisnika nije tacna!";
              else {

                if (this.lozinka == this.lozinka2)
                  this.poruka = "Nova lozinka ne moze biti ista kao stara!";
                else {

                  let regex: RegExp;
                  regex = /^(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=(?:.*\d){2,})(?=(?:.*[@$!%*?&]){2,})[A-Za-z\d@$!%*?&]{8,12}$/;

                  if (!((this.lozinka.charAt(0) > 'a' && this.lozinka.charAt(0)<'z') || (this.lozinka.charAt(0) > 'A' && this.lozinka.charAt(0)<'Z')))
                  this.poruka = "Nova lozinka nije u dobrom formatu!";
                  else {

                    if (regex.test(this.lozinka2) && this.uzastupno_ponavljanje()) {  //sve je okej sa lozinkom2

                      this.korisnikServis.azuriraj_lozinku(this.korime,this.lozinka2).subscribe();
                      this.poruka="";
                      this.ruter.navigate(['prijava']);

                    } else
                      this.poruka = "Nova lozinka nije u dobrom formatu!";



                  }

                }



              }

            })


          }



        }

      })



    }
  }
}
