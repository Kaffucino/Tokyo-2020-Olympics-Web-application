import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RezultatService {

  uri="http://localhost:4000";
  
  constructor(private http:HttpClient) { }


  unesi_rezultat(idT,ucesnik,faza,rezultat,rank){

    const podaci={
      idT:idT,
      ucesnik:ucesnik,
      faza:faza,
      rezultat:rezultat,
      rank:rank
    }
    return this.http.post(`${this.uri}/rezultati/unesi_rezultat`,podaci);
  }
  dohvati_rezultate(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/rezultati/dohvati_rezultate`,podaci);


  }
  dohvati_serije(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/rezultati/dohvati_serije`,podaci);


  }
  // azuriraj_rank(idT,idS,rank,faza){
  //   const podaci={
  //     idT:idT,
  //     idS:idS,
  //     rank:rank,
  //     faza:faza
  //   }
  //   return this.http.post(`${this.uri}/rezultati/azuriraj_rank`,podaci);

  // }
   azuriraj_rank(idT,ucesnici,index,faza){
    const podaci={
      idT:idT,
      ucesnici:ucesnici,
      index:index,
      faza:faza
    }
    return this.http.post(`${this.uri}/rezultati/azuriraj_rank`,podaci);

  }

  unesi_rezultat_ekipa(idT,TIM1,TIM2,faza,rezultat_utakmice){
    const podaci={
      idT:idT,
      TIM1:TIM1,
      TIM2:TIM2,
      faza:faza,
      rezultat:rezultat_utakmice
    }
    return this.http.post(`${this.uri}/rezultati/unesi_rezultat_ekipa`,podaci);


  }
  dohvati_rezultate_ekipa(idT,faza){
    const podaci={
      idT:idT,
      faza:faza
    }
    return this.http.post(`${this.uri}/rezultati/dohvati_rezultate_ekipa`,podaci);
  }
  eliminisi_ekipe(ekipe){
    const podaci={
      ekipe:ekipe
    }
    return this.http.post(`${this.uri}/rezultati/eliminisi_ekipe`,podaci);

  }



}
