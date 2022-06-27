import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZemljeComponent } from './zemlje/zemlje.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { SportistiComponent } from './sportisti/sportisti.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { OrganizatorComponent } from './organizator/organizator.component';
import { UnosSportaComponent } from './unos-sporta/unos-sporta.component';
import { UnosTakmicenjaComponent } from './unos-takmicenja/unos-takmicenja.component';
import { VodjaComponent } from './vodja/vodja.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { VodjaBrojComponent } from './vodja-broj/vodja-broj.component';
import { VodjaSportistiComponent } from './vodja-sportisti/vodja-sportisti.component';
import { VodjaNazivSportaComponent } from './vodja-naziv-sporta/vodja-naziv-sporta.component';
import { VodjaDisciplineComponent } from './vodja-discipline/vodja-discipline.component';
import { DodelaTakmicaraComponent } from './dodela-takmicara/dodela-takmicara.component';
import { DodelaDelegataComponent } from './dodela-delegata/dodela-delegata.component';
import { DelegatComponent } from './delegat/delegat.component';
import { RasporedComponent } from './raspored/raspored.component';
import { RezultatiComponent } from './rezultati/rezultati.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    PrijavaComponent,
    LozinkaComponent,
    RegistracijaComponent,
    ZemljeComponent,
    MedaljeComponent,
    SportistiComponent,
    OrganizatorComponent,
    UnosSportaComponent,
    UnosTakmicenjaComponent,
    VodjaComponent,
    RekordiComponent,
    VodjaBrojComponent,
    VodjaSportistiComponent,
    VodjaNazivSportaComponent,
    VodjaDisciplineComponent,
    DodelaTakmicaraComponent,
    DodelaDelegataComponent,
    DelegatComponent,
    RasporedComponent,
    RezultatiComponent,
    HeaderComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
