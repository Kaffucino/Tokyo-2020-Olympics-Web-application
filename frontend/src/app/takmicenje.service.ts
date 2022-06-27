import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {

  constructor(private http:HttpClient) { }

  uri='http://localhost:4000';

  unesi_takmicenje(sport,disciplina,pol,pocetak,kraj,lokacije,konkurencija){
    const podaci={
      idT:0,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      datum_pocetak:pocetak,
      datum_kraj:kraj,
      lokacije:lokacije,
      konkurencija:konkurencija,
      status:""
    }
    return this.http.post(`${this.uri}/takmicenja/unesi_takmicenje`,podaci)
  }

  oformi_takmicenje(sport,disciplina,pol){
    const podaci={ 
      sport:sport,
      disciplina:disciplina,
      pol:pol
      
    } 
    return this.http.post(`${this.uri}/takmicenja/oformi_takmicenje`,podaci)

  }


  dohvati_takmicenje(sport,disciplina,pol){
    const podaci={ 
      sport:sport,
      disciplina:disciplina,
      pol:pol
      
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_takmicenje`,podaci)

  }
  dohvati_takmicenje_idT(idT){
    const podaci={ 
      idT:idT
      
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_takmicenje_idT`,podaci)

  }



  dohvati_sva_takmicenja(){
    return this.http.get(`${this.uri}/takmicenja/dohvati_sva_takmicenja`)
  }
  dohvati_format_takmicenja(sport,disciplina){
    const podaci={
      sport:sport,
      disciplina:disciplina
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_format`,podaci);
  }
  dohvati_delegate_takmicenja(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_delegate`,podaci);

  }
  dodaj_delegata(idT,korime){
    const podaci={
      idT:idT,
      delegati:korime
    }
    return this.http.post(`${this.uri}/takmicenja/dodaj_delegata`,podaci);

  }
  dodaj_delegata_novo(idT,korime){
    const podaci={
      idT:idT,
      delegati:korime
    }
    return this.http.post(`${this.uri}/takmicenja/dodaj_delegata_novo`,podaci);

  }

  dohvati_takmicenja_delegata(korime){

    const podaci={
      korime:korime
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_takmicenja_delegata`,podaci);


  }
  zavrsi_takmicenje(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/takmicenja/zavrsi_takmicenje`,podaci);

  }
  promeni_status_takmicenja(idT,status){
    const podaci={
      idT:idT,
      status:status
    }
    return this.http.post(`${this.uri}/takmicenja/promeni_status_takmicenja`,podaci);

  }

  end_takmicenje(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/takmicenja/end_takmicenje`,podaci);

  }

  dohvati_medalje(){
    return this.http.get(`${this.uri}/takmicenja/dohvati_medalje`);

  }

  // azuriraj_medalje_i_rank(zemlja,zlato,srebro,bronza,br_medalja,rank){
  //   const podaci={
  //     zemlja:zemlja,
  //     zlato:zlato,
  //     srebro:srebro,
  //     bronza:bronza,
  //     br_medalja:br_medalja,
  //     rank:rank
  //   }
  //   return this.http.post(`${this.uri}/takmicenja/azuriraj_medalje_i_rank`,podaci);


  // }
    azuriraj_medalje_i_rank(medalje,zlato,srebro,bronza){
    const podaci={
     medalje:medalje,
     zlato:zlato,
     srebro:srebro,
     bronza:bronza
    }
    return this.http.post(`${this.uri}/takmicenja/azuriraj_medalje_i_rank`,podaci);


  }

  dodeli_nosioce(idT,nosioci){
    const podaci={
      idT:idT,
      nosioci:nosioci
    }
    return this.http.post(`${this.uri}/takmicenja/dodeli_nosioce`,podaci);

  }
  dohvati_nosioice(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/takmicenja/dohvati_nosioice`,podaci);

  }




}
