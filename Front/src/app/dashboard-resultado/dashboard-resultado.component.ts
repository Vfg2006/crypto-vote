import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../shared/Web3Service';
import { Voto } from '../model/voto.model';
import { CandidatoService } from '../shared/candidato.service';
import { Candidato } from '../model/candidato.model';

@Component({
  selector: 'vg-dashboard-resultado',
  templateUrl: './dashboard-resultado.component.html',
  styleUrls: ['./dashboard-resultado.component.css']
})
export class DashboardResultadoComponent implements OnInit {

  dataChart: any[] = new Array()

  multi: any[] = new Array()

  candidatos: Candidato[] = new Array()
  votos: Voto[]

  totalDeVotos: number = 0

  interval: any

  // Options Chart
  view: any[] = [1000, 250]
  animations = true
  showXAxis = true
  showYAxis = true
  gradient = false
  showLegend = true
  showXAxisLabel = false
  xAxisLabel = 'Candidatos'
  showYAxisLabel = true
  yAxisLabel = 'Votos'

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
  }

  constructor(private web3Service: Web3Service, private ref: ChangeDetectorRef, private candidatoService: CandidatoService) {
    this.dataChart = new Array();

    this.initialData()
  }

  ngOnInit() {
    setTimeout(() => {
      this.recuperarEventoVoto()
    }, 2000)

  }

  initialData() {
    this.candidatoService.getCandidatos().subscribe(
      data => {
        console.log("Data")
        console.log(data)

        data.forEach(candidato => {
          console.log(candidato['dadosCandidato'].contaBlockchainCandidato)

          // this.candidatos.push(new Candidato(
          //   candidato['dadosCandidato'].contaBlockchainCandidato,
          //   candidato['dadosCandidato'].numero,
          //   candidato.nome,
          //   candidato['dadosCandidato'].partido,
          //   candidato['dadosCandidato'].cargo,
          //   candidato['dadosCandidato'].fotoPath,
          //   candidato['dadosCandidato'].vice
          // ))
          this.candidatos.push({
            contaBlockchain: candidato['dadosCandidato'].contaBlockchainCandidato,
            numero: candidato['dadosCandidato'].numero,
            nome: candidato.nome,
            partido: candidato['dadosCandidato'].partido,
            cargo: candidato['dadosCandidato'].cargo,
            fotoPath: candidato['dadosCandidato'].fotoPath,
            vice: candidato['dadosCandidato'].vice
          })

          this.dataChart.push({
            name: candidato.nome,
            value: "0"
          })
          console.log(this.candidatos)
          this.dataChart = [...this.dataChart]
        });
      },
      error => {
        console.log(error)
      }
    )
  }

  startLiveData() {

    this.interval = setInterval(() => {
      this.dataChart[1].value = (this.dataChart[1].value * 1) + 1

      this.dataChart = [...this.dataChart]
    }, 5000)
  }

  stopLiveData() {
    clearInterval(this.interval);
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

        self.totalDeVotos++

        self.votos.push(voto)
        self.ref.detectChanges()

        self.atualizaResultado(voto.contaBlockchainDestino)
        console.log(self.votos)
      }
    })
  }

  // TODO: terminar
  atualizaResultado(contaBlockchain: string) {
    this.candidatos.forEach(candidato => {
      if (candidato.contaBlockchain == contaBlockchain) {
        this.dataChart.forEach(data => {
          if (data.name == candidato.nome)
            data.value = ((data.value * 1) + 1).toString()
        })

      }
    });
    this.dataChart = [...this.dataChart]
  }
}
