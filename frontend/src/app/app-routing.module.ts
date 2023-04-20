import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultazioneComponent } from './consultazione/consultazione.component';
import { InserimentoComponent } from './inserimento/inserimento.component';

const routes: Routes = [
	{ path: "inserimento", component: InserimentoComponent },
	{ path: "consultazione", component: ConsultazioneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
