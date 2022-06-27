import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportistaService {

  uri="http://localhost:4000";

  constructor(private http:HttpClient) { }

  nadji_sportistu_ime_zemlja_sport(ime_i_prezime,zemlja,sport){

    const podaci={
      ime_i_prezime:ime_i_prezime,
      zemlja:zemlja,
      sport:sport
     
    }

    return this.http.post(`${this.uri}/sportisti/nadji_sportistu_ime_zemlja_sport`,podaci);

  }

 



  unesite_sport(sport,disciplina){
    const podaci={
      naziv:sport,
      disciplina:disciplina
      
    }
    return this.http.post(`${this.uri}/sportisti/unesi_sport`,podaci);

  }
  dohvati_sportove(){
    return this.http.get(`${this.uri}/sportisti/dohvati_sportove`);

  }

  dohvati_sport(naziv,disciplina){
    const podaci={
      naziv:naziv,
      disciplina:disciplina
    }

    return this.http.post(`${this.uri}/sportisti/dohvati_sport`,podaci);

  }


  dohvati_lokacije(){
    return this.http.get(`${this.uri}/sportisti/dohvati_lokacije`);

  }
  unesite_sportistu(ime_prezime,pol,zemlja,sport,disciplina,status){
    const podaci={
      idS:0,
      ime_i_prezime:ime_prezime,
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      medalja:false,
      status:status

    }
    return this.http.post(`${this.uri}/sportisti/unesi_sportistu`,podaci);

  }

  prihvati_sportiste(sportisti,zemlje){
    const podaci={
      sportisti:sportisti,
      zemlje:zemlje
    }
    return this.http.post(`${this.uri}/sportisti/prihvati_sportiste`,podaci);

  }
  prihvati_ekipu(idE,zemlja,broj){
    const podaci={
      idE:idE,
      zemlja:zemlja,
      broj:broj
    }
    return this.http.post(`${this.uri}/sportisti/prihvati_ekipu`,podaci);

  }
  eliminisi_ekipe(ekipe){
    const podaci={
      ekipe:ekipe
    }
    return this.http.post(`${this.uri}/sportisti/eliminisi_ekipe`,podaci);


  }
  eliminisi_sportiste(sportisti){
    const podaci={
      sportisti:sportisti
    }
    return this.http.post(`${this.uri}/sportisti/eliminisi_sportiste`,podaci);


  }

  za_trece_mesto(ekipe){
    const podaci={
      ekipe:ekipe
    }
    return this.http.post(`${this.uri}/sportisti/za_trece_mesto`,podaci);


  }
  za_trece_mesto_sportisti(sportisti){
    const podaci={
      sportisti:sportisti
    }
    return this.http.post(`${this.uri}/sportisti/za_trece_mesto_sportisti`,podaci);


  }

  dodeli_ekipi_medalju(ekipa,medalja){
    const podaci={
      ekipa:ekipa,
      medalja:medalja
    }
    return this.http.post(`${this.uri}/sportisti/dodeli_ekipi_medalju`,podaci);

  }

  unesite_ekipu_prvi_put(idS,zemlja,pol,sport,disciplina){
    const podaci={
      idE:0,
      clanovi:idS,
      zemlja:zemlja,
      pol:pol,
      sport:sport,
      disciplina:disciplina,
      status:"cekanje",
      grupa:"",
      rank:0
    }
    return this.http.post(`${this.uri}/sportisti/unesi_ekipu`,podaci);

  }
  unesite_clana_ekipe(idS,zemlja,pol,sport,disciplina){
    const podaci={
      idS:idS,
      zemlja:zemlja,
      pol:pol,
      sport:sport,
      disciplina:disciplina,
    }
    return this.http.post(`${this.uri}/sportisti/unesite_clana_ekipe`,podaci);


  }

  dodeli_grupu_ekipama(ekipe,grupa){
    const podaci={
      ekipe:ekipe,
      grupa:grupa
    }
    return this.http.post(`${this.uri}/sportisti/dodeli_grupu_ekipama`,podaci);

  }

  dohvati_sportistu(ime_prezime,pol,zemlja,sport,disciplina){
    const podaci={
      ime_prezime:ime_prezime,
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_sportistu`,podaci);


  }
  dohvati_sportistu2(ime_prezime,pol,zemlja){
    const podaci={
      ime_prezime:ime_prezime,
      zemlja:zemlja,
      pol:pol
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_sportistu2`,podaci);
  }

  dohvati_sportistu_idS(idS){
    const podaci={
      idS:idS
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_sportistu_idS`,podaci);
  }
 

  dohvati_sve_sportiste(){
    return this.http.get(`${this.uri}/sportisti/dohvati_sve_sportiste`);

  }


  dohvati_sportiste_na_osnovu_zemlje(zemlja){
    const podaci={
      
      zemlja:zemlja
      
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_sportiste_na_osnovu_zemlje`,podaci);


  }
  dohvati_sportiste_na_osnovu_sporta(sport,disciplina,pol){
    const podaci={
      
      sport:sport,
      disciplina:disciplina,
      pol:pol
      
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_sportiste_na_osnovu_sporta`,podaci);


  }

  dohvati_ekipe_na_osnovu_sporta(sport,disciplina,pol){
    const podaci={
      
      sport:sport,
      disciplina:disciplina,
      pol:pol
      
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_ekipe_na_osnovu_sporta`,podaci);


  }
  azuriraj_rankove_ekipa(ekipe){
    const podaci={
      ekipe:ekipe
    }
    return this.http.post(`${this.uri}/sportisti/azuriraj_rankove_ekipa`,podaci);

  }



  dohvati_ekipu(pol,zemlja,sport,disciplina){
    const podaci={
      
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_ekipu`,podaci);

  }

  dohvati_rekorde(sport){
    const podaci={
      sport:sport
    }
    return this.http.post(`${this.uri}/sportisti/dohvati_rekorde`,podaci);

  }
  promeni_status_na_rangiran(idS){
    const podaci={
      idS:idS
    }
    return this.http.post(`${this.uri}/sportisti/promeni_status_na_rangiran`,podaci);

  }

  dodeli_medalju(idS){
    const podaci={
      idS:idS
    }
    return this.http.post(`${this.uri}/sportisti/dodeli_medalju`,podaci);

  }


}
