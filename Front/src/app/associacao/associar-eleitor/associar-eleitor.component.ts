import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PessoaFisica } from '../../model/PessoaFisica.model';
import { Web3Service } from '../../shared/Web3Service';
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
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.pessoaFisica = new PessoaFisica();

    this.createReactiveForms()

    setTimeout(() => {
      this.associaEleitorForm.get('contaBlockchain').setValue(this.recuperaContaSelecionada())
    }, 500)
  }

  recuperaContaSelecionada() {
    let contaSelecionada = this.web3Service.recuperaContaSelecionada()

    return contaSelecionada
  }

  refreshContaBlockchainSelecionada() {
    this.associaEleitorForm.get('contaBlockchain').setValue(this.recuperaContaSelecionada())
  }

  getDigital(event) {
    console.log("GET DIGITAL")
    console.log(event)
  }

  // carregarDigital(file) {
  //   console.log(file)

  //   let self = this

  //   var fileReader = new FileReader();
  //   fileReader.readAsText(file, "UTF-8");

  //   fileReader.onload = function (e) {
  //     self.pessoaFisica.impressaoDigital = fileReader.result.toString()
  //   }
  // }

  createReactiveForms() {
    this.associaEleitorForm = this.formbuilder.group({
      impressaoDigital: [''],
      contaBlockchain: ['']
    })
  }

  criarPessoaFisica() {
    this.pessoaFisica.impressaoDigital = this.associaEleitorForm.get('impressaoDigital').value
    this.pessoaFisica.contaBlockchain = this.recuperaContaSelecionada()
  }

  associarEleitor() {

    let self = this

    this.criarPessoaFisica()

    this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, false,
      (data) => {
        console.log(data)

    },
    (error) => {
      console.error(error)
    })
  }
}
