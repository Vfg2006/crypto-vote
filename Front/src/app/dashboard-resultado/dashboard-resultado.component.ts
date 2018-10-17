import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../shared/Web3Service';
import { Voto } from '../model/voto.model';

@Component({
  selector: 'vg-dashboard-resultado',
  templateUrl: './dashboard-resultado.component.html',
  styleUrls: ['./dashboard-resultado.component.css']
})
export class DashboardResultadoComponent implements OnInit {

  votos: Voto[]

  constructor(private web3Service: Web3Service, private ref: ChangeDetectorRef) { }

  ngOnInit() {

    setTimeout(() => {
      this.recuperarEventoVoto()
    }, 1000)
    
  }

  recuperarEventoVoto() {

    this.votos = []

    let self = this

    this.web3Service.recuperarEventVote(function(err, event) {
      if(!err) {

        console.log(event)

        let voto = {
          contaBlockchainOrigem: event.args._addressVoter,
          contaBlockchainDestino: event.args._addressCandidate,
          qtdToken: event.args._token,
          hashTransacao: event.transactionHash
        }
        
        self.votos.push(voto)
        self.ref.detectChanges()
        console.log(self.votos)
      }
    })
  }
}
