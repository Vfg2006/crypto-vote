import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../shared/Web3Service';
import { Voto } from '../model/voto.model';

@Component({
  selector: 'vg-dashboard-resultado',
  templateUrl: './dashboard-resultado.component.html',
  styleUrls: ['./dashboard-resultado.component.css']
})
export class DashboardResultadoComponent implements OnInit {

  votos: Voto[]

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
    this.recuperarEventoVoto()
  }

  recuperarEventoVoto() {

    this.votos = []

    this.web3Service.recuperarEventVote(function(err, event) {
      if(!err) {

        let voto = {
          contaBlockchainOrigem: event.args._addressVoter,
          contaBlockchainDestino: event.args._addressCandidate,
          qtdToken: event.args._token,
          hashTransacao: event.transactionHash
        }
        
        this.votos.push(voto)
      }
    })
  }
}
