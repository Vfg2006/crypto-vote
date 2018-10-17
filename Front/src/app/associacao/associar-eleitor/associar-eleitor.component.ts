import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PessoaFisica } from '../../model/PessoaFisica.model';
import { Web3Service } from '../../shared/Web3Service';
import { PessoaFisicaService } from '../pessoa-fisica.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'vg-associar-eleitor',
  templateUrl: './associar-eleitor.component.html',
  styleUrls: ['./associar-eleitor.component.css']
})
export class AssociarEleitorComponent implements OnInit {

  pessoaFisica: PessoaFisica

  associaEleitorForm: FormGroup

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service,
    private ref: ChangeDetectorRef, private pessoaFisicaService: PessoaFisicaService) { }

  ngOnInit() {
  }

  carregarDigital(file) {
    let self = this

    var fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = function (e) {
      self.pessoaFisica.impressaoDigital = fileReader.result.toString()
    }
  }

  createReactiveForms() {
    this.associaEleitorForm = this.formbuilder.group({
      impressaoDigital: [''],
    })
  }

  criarPessoaFisica() {
    this.pessoaFisica.impressaoDigital = this.associaEleitorForm.get('impressaoDigital').value
    this.pessoaFisica.contaBlockchain = this.web3Service.recuperaContaSelecionada()
  }

  associarEleitor() {

    let self = this

    this.criarPessoaFisica()

    // this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, this.pessoaFisica.isCandidato,
    //   (data) => {
    //     console.log(data)

    self.pessoaFisicaService.associarPessaFisica(self.pessoaFisica).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.error(error)
      }
    )
    // },
    // (error) => {
    //   console.error(error)
    // })
  }
}
