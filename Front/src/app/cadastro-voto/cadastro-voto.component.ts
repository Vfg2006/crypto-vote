import { Component, OnInit, HostListener } from '@angular/core';
import { Candidato } from '../model/candidato.model';
import { Web3Service } from '../shared/Web3Service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstantesService } from '../shared/ConstantesService';

@Component({
  selector: 'vg-cadastro-voto',
  templateUrl: './cadastro-voto.component.html',
  styleUrls: ['./cadastro-voto.component.css']
})
export class CadastroVotoComponent implements OnInit {

  candidato: Candidato
  tipoVoto: string

  closeResult: string;

  keyCode: any

  constructor(private web3Service: Web3Service, private modalService: NgbModal) { }

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
    console.log("GET DIGITAL")
    console.log(event)
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
    let enderecoDoVoto

    if (this.candidato != undefined && this.tipoVoto == undefined) {
      enderecoDoVoto = this.candidato.contaBlockchain
    } else if (this.candidato == undefined && this.tipoVoto == ConstantesService.BRANCO) {
      enderecoDoVoto = ConstantesService.ENDERECO_BRANCO
    } else if (this.candidato == undefined && this.tipoVoto == ConstantesService.NULO) {
      enderecoDoVoto = ConstantesService.ENDERECO_NULO
    } 

    this.web3Service.votar(enderecoDoVoto,
      (data) => {
        console.log(data)

      },
      (error) => {
        console.error(error)
      })

  }
}
