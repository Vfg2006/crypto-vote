import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ROUTES } from './app.routes'

import { VotoService } from './cadastro-voto/voto.service';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component'
import { HomeComponent } from './home/home.component';
import { CadastroVotoComponent } from './cadastro-voto/cadastro-voto.component';
import { BuscaCandidatoComponent } from './cadastro-voto/busca-candidato/busca-candidato.component';
import { ConfirmaCandidatoComponent } from './cadastro-voto/confirma-candidato/confirma-candidato.component';
import { Web3Service } from './shared/Web3Service';
import { ConstantesService } from './shared/ConstantesService';
import { AssociarPessoaFisicaComponent } from './associar-pessoa-fisica/associar-pessoa-fisica.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CadastroVotoComponent,
    BuscaCandidatoComponent,
    ConfirmaCandidatoComponent,
    AssociarPessoaFisicaComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, VotoService, Web3Service, ConstantesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
