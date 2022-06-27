import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http:HttpClient) { }

  uri="http://localhost:4000";
  prijava(korime,lozinka){

    const podaci={
      korime:korime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/prijava`,podaci);
  }
  dohvati_vodju(zemlja){
    const podaci={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/korisnici/dohvati_vodju`,podaci);

  }
  dohvati_korisnika(korime){
    const podaci={
      korime:korime
    }
    return this.http.post(`${this.uri}/korisnici/dohvati_korisnika`,podaci);
  }

  dohvati_korisnika2(korime,lozinka){
    const podaci={
      korime:korime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/dohvati_korisnika2`,podaci);

  }

  azuriraj_lozinku(korime,lozinka){
    const podaci={
      korime:korime,
      lozinka:lozinka
    }
    return this.http.post(`${this.uri}/korisnici/azuriraj_lozinku`,podaci);

  }

  unesi_zahtev_registracija(korime,lozinka,ime,prezime,zemlja,eposta,tip){
    const podaci={
      korime:korime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      zemlja:zemlja,
      eposta:eposta,
      tip:tip,
      status:"cekanje"
    }
    return this.http.post(`${this.uri}/korisnici/unesi_zahtev_registracija`,podaci);

  }
  dohvati_zahteve_za_registraciju(){
    return this.http.get(`${this.uri}/korisnici/dohvati_zahteve_za_registraciju`);

  }
  odobri_korisnika(korime){
    const podaci={
      korime:korime
    }
    return this.http.post(`${this.uri}/korisnici/odobri_korisnika`,podaci);

  }
  dohvati_delegate(){
    return this.http.get(`${this.uri}/korisnici/dohvati_delegate`);

  }

}
