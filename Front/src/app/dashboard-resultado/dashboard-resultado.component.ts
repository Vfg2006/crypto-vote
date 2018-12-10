import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeHtml, SafeUrl, SafeStyle, DomSanitizer } from '@angular/platform-browser';
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

  contasBrancoENulo = [ConstantesService.ENDERECO_BRANCO, ConstantesService.ENDERECO_NULO]

  dataChart: any[] = new Array()

  candidatos: Candidato[] = new Array()
  votos: Voto[]

  votosValidos: number = 0
  votosInvalidos: number = 0
  totalDeVotos: number = 0

  // Options Chart
  view: any[] = [1000, 250]
  animations = false
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

  constructor(private web3Service: Web3Service, private ref: ChangeDetectorRef, private candidatoService: CandidatoService,
    private _sanitizer: DomSanitizer) {
    this.dataChart = new Array();

    this.initialData()
  }

  ngOnInit() {
    setTimeout(() => {
      this.recuperarEventoVoto()
      this.atualizaResultado()
    }, 2000)

  }

  initialData() {
    this.candidatoService.getCandidatos().subscribe(
      data => {
        data.forEach(candidato => {
          console.log(candidato['dadosCandidato'].contaBlockchainCandidato)

          this.candidatoService.carregaImagem(candidato['dadosCandidato'].fotoPath).subscribe(
            data => {
              var url = window.URL.createObjectURL(data);
              let fotoPath = this._sanitizer.bypassSecurityTrustResourceUrl(url)

              this.candidatos.push({
                contaBlockchain: candidato['dadosCandidato'].contaBlockchainCandidato,
                numero: candidato['dadosCandidato'].numero,
                nome: candidato.nome,
                partido: candidato['dadosCandidato'].partido,
                cargo: candidato['dadosCandidato'].cargo,
                fotoPath: fotoPath,
                vice: candidato['dadosCandidato'].vice
              })

              this.dataChart.push({
                name: candidato.nome,
                value: 0
              })

              console.log(this.candidatos)
              this.dataChart = [...this.dataChart]

            },
            error => {
              let msg = "Erro ao carregar o arquivo.";
              console.error(msg)
            }
          )
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

    let self = this
    this.votos = []

    this.web3Service.recuperarEventVote(function (err, event) {
      if (!err) {
        let voto = {
          contaBlockchainOrigem: event.args._addressVoter,
          contaBlockchainDestino: event.args._addressCandidate,
          qtdToken: event.args._token,
          hashTransacao: event.transactionHash
        }

        self.totalDeVotos++

        self.votos.push(voto)
        self.ref.detectChanges()

        console.log(self.votos)
      }
    })
  }

  atualizaResultado() {
    let self = this

    // Candidatos
    this.candidatos.forEach(candidato => {
      this.web3Service.getBalanceOf(candidato.contaBlockchain,
        (result) => {

          if (result) {
            self.dataChart.forEach(data => {
              if (data.name == candidato.nome) {
                console.log("voto candidato")
                data.value = parseInt(result)
                self.votosValidos += parseInt(result)
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
    this.contasBrancoENulo.forEach(conta => {
      this.web3Service.getBalanceOf(conta,
        (result) => {
          if (result) {
            console.log("votos branco")
            console.log(result)

            self.dataChart[self.dataChart.length - 1].value += parseInt(result)
            self.votosInvalidos += parseInt(result)
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
