import { Component, OnInit } from '@angular/core';
import { Medalja } from '../models/medalja';
import { ZemljeService } from '../zemlje.service';
import { Chart, Legend, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-medalje',
  templateUrl: './medalje.component.html',
  styleUrls: ['./medalje.component.css']
})
export class MedaljeComponent implements OnInit {

  rezultati:Medalja[];
  stranica:number;
  duzina:any;


  zemlje:string[];
  br_medalja:number[];
  rgb:string[];
  constructor(private zemljeServis:ZemljeService) { }

  ngOnInit(): void {
    this.zemlje=[];
    this.br_medalja=[];
    this.rezultati=[];
    this.rgb=[];
    this.zemljeServis.dohvati_sve_rezultate().subscribe((rez:Medalja[])=>{
      for(let i=0;i<rez.length;i++)
      if(rez[i].br_medalja!=0)
      this.rezultati.push(rez[i]);
      
      
      this.rezultati.sort((a,b)=>{
       
        return a.rang-b.rang
       
      })

      for(let i=0;i<this.rezultati.length;i++){
      this.zemlje.push(this.rezultati[i].ime);
      this.br_medalja.push(this.rezultati[i].br_medalja);
      let rgba="rgba(";
      for(let j=0;j<2;j++)
      rgba=rgba+((Math.floor(Math.random()*255))+",");
        
      rgba=rgba+((Math.floor(Math.random()*255))+")");
      this.rgb.push(rgba);
    }

    })


var myChart = new Chart("myChart", {
  
  type: 'bar',
    
    data: {
        labels: this.zemlje,
        datasets: [{
            label:"Vizuelni prikaz medalja i zemalja",
            data: this.br_medalja,
            backgroundColor: this.rgb,
            borderColor: [
                "black"
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
       
    }
});


  }

}
