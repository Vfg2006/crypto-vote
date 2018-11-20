import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from '../shared/Web3Service';
import { Voto } from '../model/voto.model';
import { CandidatoService } from '../shared/candidato.service';
import { Candidato } from '../model/candidato.model';
import { ConstantesService } from '../shared/ConstantesService';

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
            value: 0
          })
          console.log(this.candidatos)
          this.dataChart = [...this.dataChart]
        });

        this.dataChart.push({
          name: "Branco/Nulo",
          value: 0
        })
      },
      error => {
        console.log(error)
      }
    )
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

        self.atualizaResultado()
        console.log(self.votos)
      }
    })
  }

  // TODO: terminar
  atualizaResultado() {
    let self = this

    // Candidatos
    this.candidatos.forEach(candidato => {
      this.web3Service.getBalanceOf(candidato.contaBlockchain,
        (result) => {
          if (result) {
            self.dataChart.forEach(data => {
              if (data.name == candidato.nome) {
                data.value = result
              }
            })
          } else {
            console.log("Erro ao ler a quantidade de votos da conta " + candidato.contaBlockchain)
          }

          self.dataChart = [...self.dataChart]
        },
        (error) => {
          console.log("Erro ao ler a quantidade de votos da conta " + candidato.contaBlockchain)
          console.log(error)
        });
    });

    // Branco/Nulo
    let contasBrancoENulo = [ConstantesService.ENDERECO_BRANCO, ConstantesService.ENDERECO_NULO]

    contasBrancoENulo.forEach(conta => {
      this.web3Service.getBalanceOf(conta,
        (result) => {
          if (result) {
            console.log("votos branco e nulo")
            console.log(result)

            self.dataChart[self.dataChart.length - 1].value = parseInt(self.dataChart[self.dataChart.length - 1].value) + parseInt(result)

            console.log(self.dataChart[self.dataChart.length - 1])
          } else {
            console.log("Erro ao ler a quantidade de votos da conta " + conta)
          }

          self.dataChart = [...self.dataChart]
        },
        (error) => {
          console.log("Erro ao ler a quantidade de votos da conta " + conta)
          console.log(error)
        });
    })

  }
}
