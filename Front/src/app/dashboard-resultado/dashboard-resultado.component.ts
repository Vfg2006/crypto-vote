import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../shared/Web3Service';
import { Voto } from '../model/voto.model';

@Component({
  selector: 'vg-dashboard-resultado',
  templateUrl: './dashboard-resultado.component.html',
  styleUrls: ['./dashboard-resultado.component.css']
})
export class DashboardResultadoComponent implements OnInit {

  dataChart: any[] = new Array();

  multi: any[] = new Array();

  votos: Voto[]

  interval: any

  // Options Chart
  view: any[] = [1000, 300];
  animations = true;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Candidatos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
  };

  constructor(private web3Service: Web3Service, private ref: ChangeDetectorRef) {
    this.dataChart = new Array();

    this.initialData()
  }

  ngOnInit() {
    setTimeout(() => {
      this.recuperarEventoVoto()
    }, 1000)

  }

  initialData() {

    // recuperar candidatos do mongoDB e setar datachart inicial com values vazios ou 0.
    this.dataChart =
      [
        {
          name: "candidato 1",
          value: "8"
        },
        {
          name: "candidato 2",
          value: "1"
        },
        {
          name: "candidato 3",
          value: "3"
        },
        {
          name: "candidato 4",
          value: "4"
        }
      ]
  }

  startLiveData() {

    this.interval = setInterval(() => {
      this.dataChart[1].value = (this.dataChart[1].value * 1) + 1

      this.dataChart = [...this.dataChart]
    }, 5000)
  }

  stopLiveData() {
    clearInterval(this.interval);
    console.log('Live data stopped');
  }

  recuperarEventoVoto() {

    this.votos = []

    let self = this

    this.web3Service.recuperarEventVote(function (err, event) {
      if (!err) {

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
