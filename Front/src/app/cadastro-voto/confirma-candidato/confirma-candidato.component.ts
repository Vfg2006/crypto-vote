import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router'

import { VotoService } from '../voto.service';

import { Candidato } from '../../candidato.model';

@Component({
  selector: 'vg-confirma-candidato',
  templateUrl: './confirma-candidato.component.html',
  styleUrls: ['./confirma-candidato.component.css']
})
export class ConfirmaCandidatoComponent implements OnInit {

  @Input() recebeCandidato: Candidato

  // confirmaCandidatoForm: FormGroup

  keyCode: any

  constructor(private formbuilder: FormBuilder, private votoService: VotoService, private router: Router) { }

  ngOnInit() {
    console.log(this.recebeCandidato)

    // this.confirmaCandidatoForm = this.formbuilder.group({
    //   nome: this.formbuilder.control(''),
    //   numero: this.formbuilder.control(''),
    //   partido: this.formbuilder.control(''),
    //   vice: this.formbuilder.control(''),
    //   cargo: this.formbuilder.control('')
    // })
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
