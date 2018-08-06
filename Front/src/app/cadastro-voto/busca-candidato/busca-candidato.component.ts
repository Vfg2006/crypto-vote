import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VotoService } from '../voto.service';

@Component({
  selector: 'vg-busca-candidato',
  templateUrl: './busca-candidato.component.html',
  styleUrls: ['./busca-candidato.component.css']
})
export class BuscaCandidatoComponent implements OnInit {

  buscaCandidatoForm: FormGroup

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
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
