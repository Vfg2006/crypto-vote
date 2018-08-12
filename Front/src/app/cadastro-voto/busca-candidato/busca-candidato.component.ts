import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VotoService } from '../voto.service';
import { Candidato } from '../../candidato.model';

@Component({
  selector: 'vg-busca-candidato',
  templateUrl: './busca-candidato.component.html',
  styleUrls: ['./busca-candidato.component.css']
})
export class BuscaCandidatoComponent implements OnInit {

  buscaCandidatoForm: FormGroup

  @Output() candidato = new EventEmitter();

  constructor(private formbuilder: FormBuilder, private votoService: VotoService) { }

  ngOnInit() {
    this.buscaCandidatoForm = this.formbuilder.group({
      primeiroNumero: this.formbuilder.control(''),
      segundoNumero: this.formbuilder.control('')
    })
  }

  buscarCandidato(){
    console.log(this.buscaCandidatoForm)
    let numero = parseInt(this.buscaCandidatoForm.controls.primeiroNumero.value + this.buscaCandidatoForm.controls.segundoNumero.value) 

    console.log(numero)

    this.votoService.candidatoBy(numero).subscribe(
      (data) => {
        console.log(data);

        this.candidato.emit({
          contaBlockchain: data[0].contaBlockchain,
          numero: data[0].numero,
          nome: data[0].nome,
          partido: data[0].partido,
          cargo: data[0].cargo,
          fotoPath: data[0].fotoPath,
          vice: data[0].vice
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
