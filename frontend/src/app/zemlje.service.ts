import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljeService {

  constructor(private http:HttpClient) { }
  uri="http://localhost:4000";

  dohvati_sve_zemlje(){

    return this.http.get(`${this.uri}/zemlje/dohvati_sve_zemlje`);

  }
  dohvati_sve_rezultate(){
    return this.http.get(`${this.uri}/zemlje/dohvati_sve_rezultate`);

  }

  unesi_zemlju(zemlja){

    let zastava=zemlja+".png";
    const podaci={
      ime:zemlja,
      zastava:zastava,
      br_sportista:0
    }
    return this.http.post(`${this.uri}/zemlje/unesi_zemlju`,podaci);

  }
  unesi_medalju(zemlja){
    const podaci={
      rang:0,
      ime:zemlja,
      zlato:0,
      srebro:0,
      bronza:0,
      br_medalja:0

    }
    return this.http.post(`${this.uri}/zemlje/unesi_medalju`,podaci);

  }
  uvecaj_zlato_za_jedan(zemlja){
    const podaci={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/zemlje/uvecaj_zlato_za_jedan`,podaci);

  }
  uvecaj_srebro_za_jedan(zemlja){
    const podaci={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/zemlje/uvecaj_srebro_za_jedan`,podaci);

  }
  uvecaj_bronzu_za_jedan(zemlja){
    const podaci={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/zemlje/uvecaj_bronzu_za_jedan`,podaci);

  }
  dohvati_sve_nazive_zemalja(){
    return this.http.get(`${this.uri}/zemlje/dohvati_sve_nazive_zemalja`);

  }

  azuriraj_rankove(zemlje){
    const podaci={
      zemlje:zemlje
    }
    return this.http.post(`${this.uri}/zemlje/azuriraj_rankove`,podaci);


  }

}
