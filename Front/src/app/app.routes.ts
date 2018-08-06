import {Routes} from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CadastroVotoComponent } from './cadastro-voto/cadastro-voto.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cadastro-voto', component: CadastroVotoComponent}
]
