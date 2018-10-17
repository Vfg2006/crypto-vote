import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CadastroVotoComponent } from './cadastro-voto/cadastro-voto.component';
import { BuscaCandidatoComponent } from './cadastro-voto/busca-candidato/busca-candidato.component';
import { ConfirmaCandidatoComponent } from './cadastro-voto/confirma-candidato/confirma-candidato.component';
import { AssociacaoComponent } from './associacao/associacao.component';
import { DashboardResultadoComponent } from './dashboard-resultado/dashboard-resultado.component';
import { AssociarEleitorComponent } from './associacao/associar-eleitor/associar-eleitor.component';
import { AssociarCandidatoComponent } from './associacao/associar-candidato/associar-candidato.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cadastro-voto', component: CadastroVotoComponent,
    children: [
      { path: '', redirectTo: 'busca-candidato', pathMatch: 'full' },
      { path: 'busca-candidato', component: BuscaCandidatoComponent },
      { path: 'confirma-candidato', component: ConfirmaCandidatoComponent },
    ]
  },
  {
    path: 'associacao', component: AssociacaoComponent,
    children: [
      { path: '', redirectTo: 'associacao', pathMatch: 'full' },
      { path: 'associar-eleitor', component: AssociarEleitorComponent },
      { path: 'associar-candidato', component: AssociarCandidatoComponent },
    ]
  },
  { path: 'dashboard-resultado', component: DashboardResultadoComponent }
]
