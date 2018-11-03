import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Candidato } from '../../model/candidato.model';
import { Web3Service } from '../../shared/Web3Service';

@Component({
  selector: 'vg-confirma-candidato',
  templateUrl: './confirma-candidato.component.html',
  styleUrls: ['./confirma-candidato.component.css']
})
export class ConfirmaCandidatoComponent implements OnInit {

  @Input() recebeCandidato: Candidato

  @Output() corrige = new EventEmitter()
  
  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    console.log(this.recebeCandidato)
    console.log(this.web3Service.recuperaContaSelecionada())
  }

}
