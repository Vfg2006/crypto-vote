import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Candidato } from '../model/candidato.model';
import { Web3Service } from '../shared/Web3Service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstantesService } from '../shared/ConstantesService';
import { NotificationType, NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'vg-cadastro-voto',
  templateUrl: './cadastro-voto.component.html',
  styleUrls: ['./cadastro-voto.component.css']
})
export class CadastroVotoComponent implements OnInit {

  candidato: Candidato
  tipoVoto: string

  impressaoDigital: string

  closeResult: string;

  keyCode: any

  fim: boolean = false

  constructor(private web3Service: Web3Service, private modalService: NgbModal, private _notifications: NotificationsService) { }

  ngOnInit() {
  }

  open(content) {
    console.log(content)

    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keyCode = event.key

    console.log(event)

    switch (this.keyCode) {
      case 'Enter': {
        this.votar()
        break
      }
      case 'Delete': {
        this.corrigir()
        break
      }
      case ' ': {
        this.votarEmBranco()
        break
      }
    }
  }

  getDigital(event) {
    console.log("IMPRESSÃO DIGITAL CAPTURADA")
    console.log(event)

    this.impressaoDigital = event
  }

  getCandidato(event) {
    console.log(event)
    this.candidato = event
  }

  getTipoVoto(tipo) {
    console.log(tipo)
    this.tipoVoto = tipo
  }

  corrigir() {
    this.candidato = undefined
    this.tipoVoto = undefined
  }

  votarEmBranco() {
    this.tipoVoto = ConstantesService.BRANCO
  }

  votar() {
    let self = this

    let enderecoDoVoto
    let audio = <HTMLAudioElement>document.getElementById('audio')

    if (this.candidato != undefined && this.tipoVoto == undefined) {
      enderecoDoVoto = this.candidato.contaBlockchain
    } else if (this.candidato == undefined && this.tipoVoto == ConstantesService.BRANCO) {
      enderecoDoVoto = ConstantesService.ENDERECO_BRANCO
    } else if (this.candidato == undefined && this.tipoVoto == ConstantesService.NULO) {
      enderecoDoVoto = ConstantesService.ENDERECO_NULO
    }




    // TODO: validar digital com dados da blockchain
    this.web3Service.validaDigital(this.impressaoDigital,
      (result) => {
        console.log(result)

        if (result) {
          self.web3Service.votar(enderecoDoVoto,
            (data) => {
              console.log(data)

              if (data) {
                this._notifications.create('Sucesso', 'O seu voto foi realizado com sucesso', NotificationType.Success)
                self.fim = true
                audio.play()
              } else {
                this._notifications.create('Erro', 'Erro ao realizar o seu voto', NotificationType.Error)
              }

            },
            (error) => {
              console.log("Erro ao realizar voto")
              console.error(error)
            })
        } else {
          console.log("Digital Inválida")
          this._notifications.create('Erro', 'Impressão digital inválida', NotificationType.Error)
        }

      },
      (error) => {
        console.log("Erro ao validar a digital")
        console.error(error)
      })

  }
}
