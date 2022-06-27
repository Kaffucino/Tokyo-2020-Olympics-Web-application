import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { DodelaDelegataComponent } from './dodela-delegata/dodela-delegata.component';
import { DodelaTakmicaraComponent } from './dodela-takmicara/dodela-takmicara.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { Delegat } from './models/delegat';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RasporedComponent } from './raspored/raspored.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RekordiComponent } from './rekordi/rekordi.component';
import { RezultatiComponent } from './rezultati/rezultati.component';
import { SportistiComponent } from './sportisti/sportisti.component';
import { UnosSportaComponent } from './unos-sporta/unos-sporta.component';
import { UnosTakmicenjaComponent } from './unos-takmicenja/unos-takmicenja.component';
import { VodjaBrojComponent } from './vodja-broj/vodja-broj.component';
import { VodjaDisciplineComponent } from './vodja-discipline/vodja-discipline.component';
import { VodjaNazivSportaComponent } from './vodja-naziv-sporta/vodja-naziv-sporta.component';
import { VodjaSportistiComponent } from './vodja-sportisti/vodja-sportisti.component';
import { VodjaComponent } from './vodja/vodja.component';
import { ZemljeComponent } from './zemlje/zemlje.component';

const routes: Routes = [
{path:"",component:PocetnaComponent},
{path:"prijava",component:PrijavaComponent},

{path:"lozinka",component:LozinkaComponent},
{path:"registracija",component:RegistracijaComponent},
{path:"zemlje",component:ZemljeComponent},

{path:"zemlje/prijava",component:PrijavaComponent},
{path:"zemlje/lozinka",component:LozinkaComponent},
{path:"zemlje/registracija",component:RegistracijaComponent},

{path:"medalje/prijava",component:PrijavaComponent},
{path:"medalje/lozinka",component:LozinkaComponent},
{path:"medalje/registracija",component:RegistracijaComponent},

{path:"sportisti/prijava",component:PrijavaComponent},
{path:"sportisti/lozinka",component:LozinkaComponent},
{path:"sportisti/registracija",component:RegistracijaComponent},


{path:"medalje",component:MedaljeComponent},
{path:"sportisti",component:SportistiComponent},
{path:"organizator",component:OrganizatorComponent},
{path:"organizator/unosSporta",component:UnosSportaComponent},
{path:"organizator/dodelaTakmicara",component:DodelaTakmicaraComponent},
{path:"organizator/dodelaDelegata",component:DodelaDelegataComponent},



{path:"organizator/unosTakmicenja",component:UnosTakmicenjaComponent},
{path:"vodja",component:VodjaComponent},
{path:"organizator/rekordi",component:RekordiComponent},
{path:"vodja/vodja_broj",component:VodjaBrojComponent},

{path:"vodja/vodja_sportisti",component:VodjaSportistiComponent},
{path:"vodja/vodja_sportisti/sportovi/:sport",component:VodjaNazivSportaComponent},
{path:"vodja/vodja_sportisti/sportovi/:sport/:disciplina",component:VodjaDisciplineComponent},

{path:"delegat",component:DelegatComponent},
{path:"delegat/raspored/:idT",component:RasporedComponent},
{path:"delegat/rezultati/:idT",component:RezultatiComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
