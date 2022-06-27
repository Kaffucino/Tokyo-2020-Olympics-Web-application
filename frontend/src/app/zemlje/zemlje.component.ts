import { Component, OnInit } from '@angular/core';
import { Zemlja } from '../models/zemlja';
import { ZemljeService } from '../zemlje.service';

@Component({
  selector: 'app-zemlje',
  templateUrl: './zemlje.component.html',
  styleUrls: ['./zemlje.component.css']
})
export class ZemljeComponent implements OnInit {

  constructor(private zemljeServis:ZemljeService) { }
  
  zemlje:Zemlja[];
  stranica:number;
  duzina:any;
  
  ngOnInit(): void {
    
    this.zemljeServis.dohvati_sve_zemlje().subscribe((zem:Zemlja[])=>{
      this.zemlje=zem;
      this.zemlje.sort((a,b)=>{
        
        if(a.ime>b.ime)
        return 1;
        else
        return -1;
      
      })

    })
  }




}
