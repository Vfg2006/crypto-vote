import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router'

import { VotoService } from '../voto.service';

import { Candidato } from '../../candidato.model';
import { Web3Service } from '../../shared/Web3Service';

@Component({
  selector: 'vg-confirma-candidato',
  templateUrl: './confirma-candidato.component.html',
  styleUrls: ['./confirma-candidato.component.css']
})
export class ConfirmaCandidatoComponent implements OnInit {

  @Input() recebeCandidato: Candidato

  closeResult: string;

  keyCode: any

  constructor(private formbuilder: FormBuilder, private votoService: VotoService, 
              private router: Router, private web3Service: Web3Service,
              private modalService: NgbModal) { }

  ngOnInit() {
    console.log(this.recebeCandidato)
  }

  open(content) {
    this.modalService.open(content, {}).result.then((result) => {
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
      return  `with: ${reason}`;
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
    // this.router.navigate(['/cadastro-voto'])

  }

  votar() {
    console.log("Votação Confirmada")
    

  }

}
