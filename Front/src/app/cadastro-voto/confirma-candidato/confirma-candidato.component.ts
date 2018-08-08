import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { VotoService } from '../voto.service';

import { Candidato } from '../../candidato.model';

@Component({
  selector: 'vg-confirma-candidato',
  templateUrl: './confirma-candidato.component.html',
  styleUrls: ['./confirma-candidato.component.css']
})
export class ConfirmaCandidatoComponent implements OnInit {

  @Input() recebeCandidato: Candidato

  confirmaCandidatoForm: FormGroup

  constructor(private formbuilder: FormBuilder, private votoService: VotoService) { }

  ngOnInit() {
    console.log(this.recebeCandidato)

    this.confirmaCandidatoForm = this.formbuilder.group({
      nome: this.formbuilder.control(''),
      numero: this.formbuilder.control(''),
      partido: this.formbuilder.control(''),
      vice: this.formbuilder.control(''),
      cargo: this.formbuilder.control('')
    })
  }

}
