import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegat } from '../models/delegat';
import { Ekipa } from '../models/ekipa';
import { Format } from '../models/format';
import { Medalja } from '../models/medalja';
import { Rezultat } from '../models/rezultat';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { RezultatService } from '../rezultat.service';
import { SportistaService } from '../sportista.service';
import { TakmicenjeService } from '../takmicenje.service';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private ruter:Router,private takmicenjeServis:TakmicenjeService,private rezultatServis:RezultatService,
    private sportistaServis:SportistaService,private zemljaServis:ZemljeService) { }

  takmicenja:Takmicenje[];
  medalje:Medalja[];
  poruka:string;
  ngOnInit(): void {
  this.takmicenja=[];
  let korime= JSON.parse(localStorage.getItem('ulogovan')).korime;
  this.takmicenjeServis.dohvati_takmicenja_delegata(korime).subscribe((tak:Delegat[])=>{

    if(tak){
      for(let i=0;i<tak.length;i++){
      this.takmicenjeServis.dohvati_takmicenje_idT(tak[i].idT).subscribe((takm:Takmicenje)=>{
        if(takm.status!='end' && takm.status!="")
        this.takmicenja.push(takm);

        
      })
    }
    }
     

    })

  }

  zavrsi_tenis(idT){
    
    this.zemljaServis.dohvati_sve_rezultate().subscribe((med:Medalja[])=>{

      med.sort((a,b)=>{
        if(a.br_medalja!=b.br_medalja)
        return a.br_medalja-b.br_medalja;
        else{

          if(a.zlato!=b.zlato)
          return a.zlato-b.zlato;
          else{
            if(a.srebro!=b.srebro)
            return a.srebro-b.srebro;
            else
            return a.bronza-b.bronza;

          }

        }


      })
      this.zemljaServis.azuriraj_rankove(med).subscribe();
      this.takmicenjeServis.end_takmicenje(idT).subscribe();
      this.poruka="Takmicenje je uspesno zavrseno!";

                        setTimeout(function(){
                          window.location.reload()
                        },1000)


    })


  }

  zavrsi_ekipno(idT){

    this.takmicenjeServis.dohvati_takmicenje_idT(idT).subscribe((tak:Takmicenje)=>{

      this.sportistaServis.dohvati_ekipe_na_osnovu_sporta(tak.sport,tak.disciplina,tak.pol).subscribe((eki:Ekipa[])=>{
        let prvo_mesto;
        let drugo_mesto;
        let trece_mesto;

        for(let i=0;i<eki.length;i++)
        if(eki[i].status=="zlato")
        prvo_mesto=eki[i].zemlja;
        else if(eki[i].status=="srebro")
        drugo_mesto=eki[i].zemlja;
        else if(eki[i].status=="bronza")
        trece_mesto=eki[i].zemlja;

       

        // this.zemljaServis.dohvati_sve_rezultate().subscribe((med:Medalja[])=>{
          
          // med.sort((a,b)=>{
          //   if(a.br_medalja!=b.br_medalja)
          //   return a.br_medalja-b.br_medalja;
          //   else{
          //     if(a.zlato!=b.zlato)
          //     return a.zlato-b.zlato;
          //     else{
          //       if(a.srebro!=b.srebro)
          //       return a.srebro-b.srebro;
          //       else
          //       return a.bronza-b.bronza;
          //     }

          //   }
          // })
        //   this.zemljaServis.azuriraj_rankove(med).subscribe();
        //   this.zemljaServis.uvecaj_zlato_za_jedan(prvo_mesto).subscribe();
        //   this.zemljaServis.uvecaj_srebro_za_jedan(drugo_mesto).subscribe();
        //   this.zemljaServis.uvecaj_bronzu_za_jedan(trece_mesto).subscribe();

        // })
        this.zemljaServis.dohvati_sve_rezultate().subscribe((med:Medalja[])=>{
          for(let i=0;i<med.length;i++){
          if(med[i].ime==prvo_mesto){
            med[i].zlato++;
            med[i].br_medalja++;
          }
          if(med[i].ime==drugo_mesto){
            med[i].srebro++;
            med[i].br_medalja++;
          }
          if(med[i].ime==trece_mesto){
            med[i].bronza++;
            med[i].br_medalja++;
          }
        }
        med.sort((a,b)=>{
          if(a.br_medalja!=b.br_medalja)
          return b.br_medalja-a.br_medalja;
          else{
            if(a.zlato!=b.zlato)
            return b.zlato-a.zlato;
            else{
              if(a.srebro!=b.srebro)
              return b.srebro-a.srebro;
              else
              return b.bronza-a.bronza;
            }

          }
        })
          let medalje:string[]=[];
          for(let i=0;i<med.length;i++)
          if(med[i].br_medalja!=0)
          medalje.push(med[i].ime);

         
          this.takmicenjeServis.azuriraj_medalje_i_rank(medalje,prvo_mesto,drugo_mesto,trece_mesto).subscribe();


        })



        this.takmicenjeServis.end_takmicenje(idT).subscribe();
        this.poruka="Takmicenje je uspesno zavrseno!";

        setTimeout(function(){
          window.location.reload()
        },1000)

      })


    })

  }

  zavrsi(idT){
    let prvo_mesto;
    let drugo_mesto;
    let trece_mesto;
    
    let finale:Rezultat[]=[];
    let bonus:Rezultat[]=[];



    this.rezultatServis.dohvati_rezultate(idT).subscribe((rez:Rezultat[])=>{
      
      let streljastvo=false;
      if(rez[0].faza!="bonus" && rez[0].faza!="finale")
      streljastvo=true;

      if(!streljastvo){
      for(let i=0;i<rez.length;i++)
           if(rez[i].faza=="finale")
           finale.push(rez[i]);
           else
           bonus.push(rez[i]);

        finale.sort((a,b)=>{
          return a.rank-b.rank;
        })   
        bonus.sort((a,b)=>{
          return a.rank-b.rank;
        })
      }else{//streljastvo
        let ucesnici=[];
        
        for(let i=0;i<rez.length;i++)
        if(!ucesnici.includes(rez[i].ucesnik))
        ucesnici.push(rez[i].ucesnik);

        for(let i=0;i<ucesnici.length;i++){
          let rank=0;
          for(let j=0;j<rez.length;j++)
          if(rez[j].ucesnik==ucesnici[i])
            rank+=rez[j].rank;
          
          let r:Rezultat=new Rezultat();
          r.idT=idT;
          r.ucesnik=ucesnici[i];
          r.rank=rank;
          finale.push(r);

        }
        finale.sort((a,b)=>{
          return a.rank-b.rank;
        })  




      }

                if(bonus.length==0){
                 prvo_mesto=finale[0].ucesnik;
                 drugo_mesto=finale[1].ucesnik;
                 trece_mesto=finale[2].ucesnik;
         
                }else{
         
                 if(finale[0].rank==finale[1].rank){
                   prvo_mesto=bonus[0].ucesnik;
                   drugo_mesto=bonus[1].ucesnik;
         
                   trece_mesto=finale[2].ucesnik;
         
                 }else if(finale[1].rank==finale[2].rank){
                   prvo_mesto=finale[0].ucesnik;
                   drugo_mesto=bonus[0].ucesnik;
                   trece_mesto=bonus[1].ucesnik;
                 }else if(finale[2].rank==finale[3].rank){
                   prvo_mesto=finale[0].ucesnik;
                   drugo_mesto=finale[1].ucesnik;
                   trece_mesto=bonus[0].ucesnik;
         
                 }
                }

                this.takmicenjeServis.dohvati_medalje().subscribe((med:Medalja[])=>{

                  this.sportistaServis.dohvati_sportistu_idS(prvo_mesto).subscribe((spor1:Sportista)=>{

                    this.sportistaServis.dohvati_sportistu_idS(drugo_mesto).subscribe((spor2:Sportista)=>{

                      this.sportistaServis.dohvati_sportistu_idS(trece_mesto).subscribe((spor3:Sportista)=>{

                        let zemlja1=null;
                        let zemlja2=null;
                        let zemlja3=null;
                        if(!spor1.medalja)
                        zemlja1=spor1.zemlja;

                       if(!spor2.medalja)
                        zemlja2=spor2.zemlja;

                       if(!spor3.medalja)
                        zemlja3=spor3.zemlja;

                        for(let i=0;i<med.length;i++){
                          
                          if(med[i].ime==zemlja1 && zemlja1!=null){
                            med[i].zlato++;
                            med[i].br_medalja++;

                          }
                          if(med[i].ime==zemlja2 && zemlja2!=null){
                            med[i].srebro++;
                            med[i].br_medalja++;
                            
                          }
                          if(med[i].ime==zemlja3 && zemlja3!=null){
                            med[i].bronza++;
                            med[i].br_medalja++;
                            
                          }
                        
                        }
                        med.sort((a,b)=>{
                                      if(a.br_medalja!=b.br_medalja)
                                      return b.br_medalja-a.br_medalja;
                                      else{
                      
                                        if(a.zlato!=b.zlato)
                                        return b.zlato-a.zlato;
                                        else{
                      
                                          if(a.srebro!=b.srebro)
                                          return b.srebro-a.srebro;
                                          else
                                          return b.bronza-a.bronza;
                                        }
                      
                                      }
                      
                                    })
                        //             let rank=1; //problematicna funckija!
                        //  for(let i=0;i<med.length;i++){
                        //  this.takmicenjeServis.azuriraj_medalje_i_rank(med[i].ime,med[i].zlato,med[i].srebro,med[i].bronza,med[i].br_medalja,rank).subscribe()           
                        //   rank++;
                        // }

                           if(zemlja1!=null && zemlja2!=null && zemlja3!=null)
                           this.takmicenjeServis.azuriraj_medalje_i_rank(med,zemlja1,zemlja2,zemlja3).subscribe()        

                          
                        if(zemlja1!=null)
                        this.sportistaServis.dodeli_medalju(prvo_mesto).subscribe();
                        
                        if(zemlja2!=null)
                        this.sportistaServis.dodeli_medalju(drugo_mesto).subscribe();
                        
                        if(zemlja3!=null)
                        this.sportistaServis.dodeli_medalju(trece_mesto).subscribe();

                     
                        this.takmicenjeServis.end_takmicenje(idT).subscribe();
                        this.poruka="Takmicenje je uspesno zavrseno!";

                        setTimeout(function(){
                          window.location.reload()
                        },1000)

                      })
                    })

                  })


                })


                

    })

  }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }

}
