import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CadastroVotoComponent } from './cadastro-voto/cadastro-voto.component';
import { BuscaCandidatoComponent } from './cadastro-voto/busca-candidato/busca-candidato.component';
import { ConfirmaCandidatoComponent } from './cadastro-voto/confirma-candidato/confirma-candidato.component';
import { AssociarPessoaFisicaComponent } from './associar-pessoa-fisica/associar-pessoa-fisica.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro-voto', component: CadastroVotoComponent,
      children: [
        { path: '', redirectTo: 'busca-candidato', pathMatch: 'full' },
        { path: 'busca-candidato', component: BuscaCandidatoComponent },
        { path: 'confirma-candidato', component: ConfirmaCandidatoComponent },
    ]
  },
  { path: 'associa-pessoa-fisica', component: AssociarPessoaFisicaComponent }
]
