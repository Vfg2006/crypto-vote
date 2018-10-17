import { Component, OnInit } from '@angular/core';
import { Candidato } from '../model/candidato.model';

@Component({
  selector: 'vg-cadastro-voto',
  templateUrl: './cadastro-voto.component.html',
  styleUrls: ['./cadastro-voto.component.css']
})
export class CadastroVotoComponent implements OnInit {

  candidato: Candidato

  constructor() { }

  ngOnInit() {
  }

  getCandidato(event) {
    console.log(event)
    this.candidato = event
  }

  corrigirCandidato() {
    this.candidato = undefined
  }
}
