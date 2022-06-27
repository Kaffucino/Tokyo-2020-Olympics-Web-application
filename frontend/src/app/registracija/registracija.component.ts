import { Component, OnInit } from '@angular/core';
import { PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Zemlja_naziv } from '../models/zemlja_naziv';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private zemljaServis: ZemljeService) { }

  korime: string;
  lozinka: string;
  lozinka2: string;
  ime: string;
  prezime: string;
  zemlja: string;
  eposta: string;
  tip: string;
  poruka: string;
  zemlje: Zemlja_naziv[];
  ngOnInit(): void {
    this.zemljaServis.dohvati_sve_nazive_zemalja().subscribe((ze: Zemlja_naziv[]) => {
      this.zemlje = ze;
    })
  }


  uzastupno_ponavljanje() { //provera za lozinku

    let cnt = 0;
    for (let i = 0; i < this.lozinka.length - 1; i++) {
      cnt = 0;
      for (let j = i + 1; j < this.lozinka.length; j++) {
        if (this.lozinka.charAt(i) != this.lozinka.charAt(j))
          break;

        cnt++;
        if (cnt == 3) {
          return false;

        }

      }
    }


    return true;

  }

  registracija() {
    if (!this.korime)
      this.poruka = "Polje za korisnicko ime ne sme biti prazno!";
    else if (!this.lozinka)
      this.poruka = "Polje za lozinku ne sme biti prazno!";
    else if (!this.lozinka2)
      this.poruka = "Polje za potvrdu lozinke ne sme biti prazno!";
    else if (!this.ime)
      this.poruka = "Polje za ime ne sme biti prazno!";
    else if (!this.prezime)
      this.poruka = "Polje za prezime ne sme biti prazno!";
    else if (!this.zemlja)
      this.poruka = "Polje za zemlju ne sme biti prazno!";
    else if (!this.eposta)
      this.poruka = "Polje za elektronsku postu ne sme biti prazno!";
    else if (!this.tip)
      this.poruka = "Polje za tip ne sme biti prazno!";
    else if (this.lozinka != this.lozinka2)
      this.poruka = "Polje za potvrdu lozinke mora biti identicno kao polje za lozinku!";
    else {
      let regex: RegExp;
      regex = /^(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=(?:.*\d){2,})(?=(?:.*[@$!%*?&]){2,})[A-Za-z\d@$!%*?&]{8,12}$/;


      if (!((this.lozinka.charAt(0) > 'a' && this.lozinka.charAt(0) < 'z') || (this.lozinka.charAt(0) > 'A' && this.lozinka.charAt(0) < 'Z')))
        this.poruka = "Sifra nije u dobrom formatu!";
      else {

        if (regex.test(this.lozinka) && this.uzastupno_ponavljanje()) { //sve je okej sa formatiranjem onda
          this.poruka = "";

          this.korisnikServis.dohvati_korisnika(this.korime).subscribe((kor: Korisnik) => {
            if (kor) {
              this.poruka = "Navedeno korisnicko ime je vec u upotrebi!";

            } else {
              if (this.tip == "vodja")
                this.korisnikServis.dohvati_vodju(this.zemlja).subscribe((kor: Korisnik) => {

                  if (kor)
                    this.poruka = "Vec postoji vodja nacionalne delegacije za navedenu zemlju!";
                  else {
                    this.korisnikServis.unesi_zahtev_registracija(this.korime, this.lozinka, this.ime, this.prezime, this.zemlja, this.eposta, this.tip).subscribe()
                    this.poruka = "Vas zahtev za registraciju je uspesno poslat!";
                    setTimeout(function () {
                      window.location.reload();
                    }, 1500)
                  }

                });
              else {
                this.korisnikServis.unesi_zahtev_registracija(this.korime, this.lozinka, this.ime, this.prezime, this.zemlja, this.eposta, this.tip).subscribe()
                this.poruka = "Vas zahtev za registraciju je uspesno poslat!";
                setTimeout(function () {
                  window.location.reload();
                }, 1500)
              }


            }


          })



        }
        else
          this.poruka = "Sifra nije u dobrom formatu!";
      }

    }




  }
}
