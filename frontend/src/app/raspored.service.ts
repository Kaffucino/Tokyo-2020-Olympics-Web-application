import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RasporedService {
  
  uri="http://localhost:4000";

  constructor(private http:HttpClient) { }

  proveri_termin(datum,vreme,lokacija){
    const podaci={
      datum:datum,
      vreme:vreme,
      lokacija:lokacija
    }
    return this.http.post(`${this.uri}/rasporedi/proveri_termin`,podaci)
  }
  
  unesi_termin(idT,datum,vreme,lokacija,faza){

    const podaci={
      idT:idT,
      datum:datum,
      vreme:vreme,
      lokacija:lokacija,
      faza:faza,
      zavrseno:false
    }
    return this.http.post(`${this.uri}/rasporedi/unesi_termin`,podaci)

  }
  proveri_vec_uneto(idT,faza){
    const podaci={
      idT:idT,
      faza:faza
    }
    return this.http.post(`${this.uri}/rasporedi/proveri_vec_uneto`,podaci)

  }


  


  dohvati_raspored_individ(idT){
    const podaci={
      idT:idT
    }
    return this.http.post(`${this.uri}/rasporedi/dohvati_raspored_individ`,podaci)

  }
  dohvati_raspored_ekipni(idT,faza){

    const podaci={
      idT:idT,
      faza:faza
    }
    return this.http.post(`${this.uri}/rasporedi/dohvati_raspored_ekipni`,podaci)

  }

}
