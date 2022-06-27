import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ekipa } from '../models/ekipa';
import { Format } from '../models/format';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-dodela-takmicara',
  templateUrl: './dodela-takmicara.component.html',
  styleUrls: ['./dodela-takmicara.component.css']
})
export class DodelaTakmicaraComponent implements OnInit {

  constructor(private ruter: Router, private takmicenjaServis: TakmicenjeService, private sportistaServis: SportistaService) { }

  takmicenja: Takmicenje[];
  takmicenje: string;
  sportisti: Sportista[];
  ekipe: Ekipa[];
  poruka: string;
  poruka2: string;

  prikaz_dugmeta: boolean;
  individ: boolean;

  brojac: number;
  formiran_tenis: boolean;
  tenis: boolean;
  idT: number;
  nosioci: number;

  sportisti_nosioci: Sportista[];
  
  //nosioci za tenis
  prvi: number;
  drugi: number;
  treci: number;
  cetvrti: number;
  peti: number;

  sesti: number;
  sedmi: number;
  osmi: number;
  deveti: number;
  deseti: number;

  jedanaesti: number;
  dvanaesti: number;
  trinaesti: number;
  cetrnaesti: number;
  petnaesti: number;
  sesnaesti: number;

  nosioci_niz: number[];

  ngOnInit(): void {
    this.takmicenja = [];
  
    this.sportisti_nosioci = [];
    this.idT = -1;
    this.nosioci = 0;
    this.tenis = false;
    this.brojac = 0;
    this.formiran_tenis = false;
    this.takmicenjaServis.dohvati_sva_takmicenja().subscribe((tak: Takmicenje[]) => {
      for (let i = 0; i < tak.length; i++)
        if (tak[i].status == "" || tak[i].status == "tenis")
          this.takmicenja.push(tak[i]);


    })
  }
  submit() {
    this.ekipe = [];
    this.sportisti = [];
    let takmicenje = this.takmicenje.split('-');
    let sport = takmicenje[0];
    let disc = takmicenje[1];
    let pol = takmicenje[2];
    this.tenis = false;
    this.nosioci = 0;

    if (sport == "Tenis")
      this.tenis = true;


    this.takmicenjaServis.dohvati_takmicenje(sport, disc, pol).subscribe((tak: Takmicenje) => {
      this.idT = tak.idT;
      if (tak.status == "tenis") {
        this.formiran_tenis = true;
        this.broj_nosioca(tak.disciplina, tak.pol);
      } else
        this.formiran_tenis = false;


      if (tak.konkurencija == "individ") {
        this.individ = true;
        this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(sport, disc, pol).subscribe((spor: Sportista[]) => {
          let cnt = 0;
          let brojac = 0;

          for (let i = 0; i < spor.length; i++)
            if (spor[i].status == "cekanje")
              cnt++;
            else if (spor[i].status == "ucestvuje")
              brojac++;

          if (cnt == 0)
            this.prikaz_dugmeta = false;
          else
            this.prikaz_dugmeta = true;

          for (let i = 0; i < spor.length; i++)
            if (spor[i].status == "cekanje")
              this.sportisti.push(spor[i]);
          this.brojac = brojac;
        })


      } else { //ekipno
        this.individ = false;

        this.sportistaServis.dohvati_ekipe_na_osnovu_sporta(sport, disc, pol).subscribe((eki: Ekipa[]) => {

          let cnt = 0;
          let brojac = 0;


          this.sportistaServis.dohvati_sport(sport, disc).subscribe((spor: Sport) => {
            let min_max = spor.min_max.split('/');
            let min = parseInt(min_max[0]);
            let max = parseInt(min_max[1]);

            if (sport != "Tenis") {
              for (let i = 0; i < eki.length; i++)
                if (eki[i].status == "cekanje" && eki[i].clanovi.length >= min && eki[i].clanovi.length <= max)
                  cnt++;
                else if (eki[i].status == "ucestvuje")
                  brojac++;

            }

            if (cnt == 0)
              this.prikaz_dugmeta = false;
            else
              this.prikaz_dugmeta = true;

            for (let i = 0; i < eki.length; i++)
              if (eki[i].status == "cekanje" && eki[i].clanovi.length >= min && eki[i].clanovi.length <= max)
                this.ekipe.push(eki[i]);

            this.brojac = brojac;


          })



        })

      }
    })





  }
  unesi() {

    if (!this.takmicenje)
      this.poruka = "-Polje za takmicenje ne sme biti prazno!";
    else
      this.poruka = "";

    let takmicenje = this.takmicenje.split('-');
    let sport = takmicenje[0];
    let disc = takmicenje[1];
    let pol = takmicenje[2];

    this.takmicenjaServis.dohvati_format_takmicenja(sport, disc).subscribe((form: Format) => {

      if (form.vrsta == "individ") { //individualni sportovi


        if (sport != "Tenis") {

          let cnt2 = 0;

          for (let i = 0; i < this.sportisti.length; i++)
            if (this.sportisti[i].izabran)
              cnt2++;

          if (this.brojac + cnt2 > 8)
            this.poruka2 = "Broj sportista ne moze biti preko 8!";
          else {
            let sportisti: number[] = [];
            let zemlje: string[] = [];

            for (let i = 0; i < this.sportisti.length; i++)
              if (this.sportisti[i].izabran) {
                sportisti.push(this.sportisti[i].idS);
                zemlje.push(this.sportisti[i].zemlja);
              }
            this.sportistaServis.prihvati_sportiste(sportisti, zemlje).subscribe();


            this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(sport, disc, pol).subscribe((spor2: Sportista[]) => {

              this.sportisti = [];
              let cnt = 0;
              for (let i = 0; i < spor2.length; i++)
                if (spor2[i].status == "ucestvuje")
                  cnt++;
                else if (spor2[i].status == "cekanje")
                  this.sportisti.push(spor2[i]);

              this.brojac = cnt;

              this.poruka2 = "Uspesno ste dodelili sportistu/sportiste!";


            })

          }







        } else {//singl tenis specijalni slucaj


          let cnt2 = 0;

          for (let i = 0; i < this.sportisti.length; i++)
            if (this.sportisti[i].izabran)
              cnt2++;

          if (this.brojac + cnt2 > 16)
            this.poruka2 = "Broj sportista za Tenis ne moze biti preko 16!";
          else {
            let sportisti: number[] = [];
            let zemlje: string[] = [];

            for (let i = 0; i < this.sportisti.length; i++)
              if (this.sportisti[i].izabran) {
                sportisti.push(this.sportisti[i].idS);
                zemlje.push(this.sportisti[i].zemlja);
              }
            this.sportistaServis.prihvati_sportiste(sportisti, zemlje).subscribe();


            this.sportistaServis.dohvati_sportiste_na_osnovu_sporta(sport, disc, pol).subscribe((spor2: Sportista[]) => {

              this.sportisti = [];
              let cnt = 0;
              for (let i = 0; i < spor2.length; i++)
                if (spor2[i].status == "ucestvuje")
                  cnt++;
                else if (spor2[i].status == "cekanje")
                  this.sportisti.push(spor2[i]);

              this.brojac = cnt;
              this.poruka2 = "Uspesno ste dodelili sportistu/sportiste!";


            })

          }







        }



      } else {//ekipna takmicenja

        let takmicenje = this.takmicenje.split('-');
        let sport = takmicenje[0];
        let disc = takmicenje[1];
        let pol = takmicenje[2];

        let cnt2 = 0;

        for (let i = 0; i < this.ekipe.length; i++)
          if (this.ekipe[i].izabrana)
            cnt2++;




        if (this.brojac + cnt2 > 12)
          this.poruka2 = "Broj ekipa ne moze biti preko 12!";
        else
          for (let i = 0; i < this.ekipe.length; i++)
            if (this.ekipe[i].izabrana)
              this.sportistaServis.prihvati_ekipu(this.ekipe[i].idE, this.ekipe[i].zemlja, this.ekipe[i].clanovi.length).subscribe();

        this.sportistaServis.dohvati_ekipe_na_osnovu_sporta(sport, disc, pol).subscribe((eki: Ekipa[]) => {
          this.ekipe = [];
          let cnt = 0;
          for (let i = 0; i < eki.length; i++)
            if (eki[i].status == "ucestvuje")
              cnt++;
            else if (eki[i].status == "cekanje")
              this.ekipe.push(eki[i]);
          this.brojac = cnt;

          this.poruka2 = "Uspesno ste dodelili ekipu/ekipe!";



        })



      }

    })



  }

  formiraj() {
    let takmicenje = this.takmicenje.split('-');
    let sport = takmicenje[0];
    let disc = takmicenje[1];
    let pol = takmicenje[2];

    this.takmicenjaServis.dohvati_takmicenje(sport, disc, pol).subscribe((tak: Takmicenje) => {

      this.takmicenjaServis.dohvati_format_takmicenja(sport, disc).subscribe((form: Format) => {

        if (tak.konkurencija == "individ") {

          if (sport != "Tenis") {

            if (form.tacno && this.brojac != 8)
              this.poruka2 = "Za ovu disciplinu je potrebno tacno 8 takmicara!";
            else if (this.brojac < 3)
              this.poruka2 = "Potrebno je barem 3 takmicara kako bi se takmicenje zapocelo!";
            else {
              this.takmicenjaServis.oformi_takmicenje(sport, disc, pol).subscribe();
              this.poruka2 = "Uspesno ste formirali takmicenje!";
              setTimeout(function () {
                window.location.reload();
              }, 1500)
            }


          } else { //singl

            if (this.brojac != 4 && this.brojac != 8 && this.brojac != 16)
              this.poruka2 = "Za Tenis je potrebno 4, 8 ili 16 takmicara!";
            else {
              this.takmicenjaServis.promeni_status_takmicenja(this.idT, 'tenis').subscribe();
              this.poruka2 = "Uspesno ste formirali takmicenje!";
              setTimeout(function () {
                window.location.reload();
              }, 1500)
            }


          }

        } else {//ekipna

          if (sport != "Tenis") {
            if (this.brojac != 12 && this.brojac != 8 && this.brojac != 4)
              this.poruka2 = "Za ekipni sport je potrebno 4,8 ili 16 ekipa!";
            else {
              this.takmicenjaServis.oformi_takmicenje(sport, disc, pol).subscribe();
              //  this.poruka2="Uspesno ste formirali takmicenje!";
              // setTimeout(function(){
              //   window.location.reload();
              // },1500)
              // this.formiran_tenis = true;
              // this.broj_nosioca(tak.disciplina, tak.pol);

            }


          } else {//dubl

          }

        }


      })



    })

  }
  broj_nosioca(disciplina, pol) {
    this.sportisti_nosioci = [];
    if (disciplina == "singl") {

      this.sportistaServis.dohvati_sportiste_na_osnovu_sporta("Tenis", disciplina, pol).subscribe((spo: Sportista[]) => {

        for (let i = 0; i < spo.length; i++)
          if (spo[i].status == "ucestvuje") {
            this.sportisti_nosioci.push(spo[i]);
            this.nosioci++;
          }


      })



    } else {//dubl

    }



  }





  dodeli_nosioce() {
    this.nosioci_niz = [];
    let greska_unos = false;
    let greska_nosilac = false;

    if (this.nosioci == 4) {

      if (!this.prvi || !this.drugi || !this.treci || !this.cetvrti)
        greska_unos = true;


      if (!greska_unos) {
        let vec_vidjeno = [];
        vec_vidjeno.push(this.prvi);

        if (!vec_vidjeno.includes(this.drugi))
          vec_vidjeno.push(this.drugi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.treci))
          vec_vidjeno.push(this.treci)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.cetvrti))
          vec_vidjeno.push(this.cetvrti)
        else
          greska_nosilac = true;
      }
    }

    if (this.nosioci == 8) {


      if (!this.prvi || !this.drugi || !this.treci || !this.cetvrti || !this.peti || !this.sesti || !this.sedmi || !this.osmi)
        greska_unos = true;


      if (!greska_unos) {
        let vec_vidjeno = [];
        vec_vidjeno.push(this.prvi);

        if (!vec_vidjeno.includes(this.drugi))
          vec_vidjeno.push(this.drugi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.treci))
          vec_vidjeno.push(this.treci)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.cetvrti))
          vec_vidjeno.push(this.cetvrti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.peti))
          vec_vidjeno.push(this.peti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.sesti))
          vec_vidjeno.push(this.sesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.sedmi))
          vec_vidjeno.push(this.sedmi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.osmi))
          vec_vidjeno.push(this.osmi)
        else
          greska_nosilac = true;

      }



    }

    if (this.nosioci == 16) {


      if (!this.prvi || !this.drugi || !this.treci || !this.cetvrti || !this.peti || !this.sesti || !this.sedmi || !this.osmi
        || !this.deveti || !this.deseti || !this.jedanaesti || !this.dvanaesti || !this.trinaesti || !this.cetrnaesti || !this.petnaesti ||
        !this.sesnaesti)
        greska_unos = true;


      if (!greska_unos) {
        let vec_vidjeno = [];
        vec_vidjeno.push(this.prvi);

        if (!vec_vidjeno.includes(this.drugi))
          vec_vidjeno.push(this.drugi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.treci))
          vec_vidjeno.push(this.treci)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.cetvrti))
          vec_vidjeno.push(this.cetvrti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.peti))
          vec_vidjeno.push(this.peti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.sesti))
          vec_vidjeno.push(this.sesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.sedmi))
          vec_vidjeno.push(this.sedmi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.osmi))
          vec_vidjeno.push(this.osmi)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.deveti))
          vec_vidjeno.push(this.deveti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.deseti))
          vec_vidjeno.push(this.deseti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.jedanaesti))
          vec_vidjeno.push(this.jedanaesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.dvanaesti))
          vec_vidjeno.push(this.dvanaesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.trinaesti))
          vec_vidjeno.push(this.trinaesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.cetrnaesti))
          vec_vidjeno.push(this.cetrnaesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.petnaesti))
          vec_vidjeno.push(this.petnaesti)
        else
          greska_nosilac = true;

        if (!vec_vidjeno.includes(this.sesnaesti))
          vec_vidjeno.push(this.sesnaesti)
        else
          greska_nosilac = true;

      }




    }





    if (greska_unos)
      this.poruka2 = "Polja za nosioce ne smeju biti prazna!";
    else if (greska_nosilac)
      this.poruka2 = "Nosioci ne smeju da se ponavljaju!";
    else {
      this.nosioci_niz.push(this.prvi);
      this.nosioci_niz.push(this.drugi);
      this.nosioci_niz.push(this.treci);
      this.nosioci_niz.push(this.cetvrti);

      if (this.nosioci == 8 || this.nosioci == 16) {
        this.nosioci_niz.push(this.peti);
        this.nosioci_niz.push(this.sesti);
        this.nosioci_niz.push(this.sedmi);
        this.nosioci_niz.push(this.osmi);

      }
      if (this.nosioci == 16) {

        this.nosioci_niz.push(this.deveti);
        this.nosioci_niz.push(this.deseti);
        this.nosioci_niz.push(this.jedanaesti);
        this.nosioci_niz.push(this.dvanaesti);
        this.nosioci_niz.push(this.trinaesti);
        this.nosioci_niz.push(this.cetrnaesti);
        this.nosioci_niz.push(this.petnaesti);
        this.nosioci_niz.push(this.sesnaesti);


      }
      this.takmicenjaServis.dodeli_nosioce(this.idT,this.nosioci_niz).subscribe();
      let takmicenje = this.takmicenje.split('-');
     
      let sport = takmicenje[0];
      let disc = takmicenje[1];
      let pol = takmicenje[2];
      if(this.nosioci==4)
      this.takmicenjaServis.promeni_status_takmicenja(this.idT,'polu').subscribe();

      if(this.nosioci==8)
      this.takmicenjaServis.promeni_status_takmicenja(this.idT,'cetvrt').subscribe();

      if(this.nosioci==16)
      this.takmicenjaServis.promeni_status_takmicenja(this.idT,'osmina').subscribe();

      this.poruka2="Uspesno ste dodelili nosioce!"
      setTimeout(function(){
        window.location.reload();
      },1200)


    }


  }


  odjava() {
    localStorage.clear();
    this.ruter.navigate(['']);
  }
}
