import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ROUTES } from './app.routes'

import { VotoService } from './cadastro-voto/voto.service';
import { CandidatoService } from './shared/candidato.service';
import { Web3Service } from './shared/Web3Service';
import { ConstantesService } from './shared/ConstantesService';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component';

import { AssociacaoComponent } from './associacao/associacao.component';
import { AssociarEleitorComponent } from './associacao/associar-eleitor/associar-eleitor.component';
import { AssociarCandidatoComponent } from './associacao/associar-candidato/associar-candidato.component';

import { CadastroVotoComponent } from './cadastro-voto/cadastro-voto.component';
import { BuscaCandidatoComponent } from './cadastro-voto/busca-candidato/busca-candidato.component';
import { ConfirmaCandidatoComponent } from './cadastro-voto/confirma-candidato/confirma-candidato.component';

import { DashboardResultadoComponent } from './dashboard-resultado/dashboard-resultado.component';
import { FingerprintComponent } from './shared/fingerprint/fingerprint.component';
import { ConfirmaBrancoNuloComponent } from './cadastro-voto/confirma-branco-nulo/confirma-branco-nulo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CadastroVotoComponent,
    BuscaCandidatoComponent,
    ConfirmaCandidatoComponent,
    AssociacaoComponent,
    DashboardResultadoComponent,
    AssociarEleitorComponent,
    AssociarCandidatoComponent,
    FingerprintComponent,
    ConfirmaBrancoNuloComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    FileUploadModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, VotoService, Web3Service, CandidatoService, ConstantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
