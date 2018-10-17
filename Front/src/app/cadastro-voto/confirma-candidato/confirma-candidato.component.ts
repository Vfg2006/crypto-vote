import { Component, OnInit, Input, HostListener, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router'

import { VotoService } from '../voto.service';

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

  closeResult: string;

  keyCode: any

  constructor(private formbuilder: FormBuilder, private votoService: VotoService,
    private router: Router, private web3Service: Web3Service,
    private modalService: NgbModal, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.recebeCandidato)

    console.log(this.web3Service.recuperaContaSelecionada())
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

  votarEmBranco() {
    console.log("Votação em branco Confirmada")
  }

  corrigir() {
    console.log("Corrigir")
    this.corrige.emit()
  }

  votar() {
    console.log("Votação Confirmada")
    this.web3Service.votar(this.recebeCandidato.contaBlockchain,
      (data) => {
        console.log(data)

      },
      (error) => {
        console.error(error)
      })

  }

}
