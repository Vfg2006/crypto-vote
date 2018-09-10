import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Web3Service } from '../shared/Web3Service';
import { PessoaFisica } from '../modelo/PessoaFisica.model';

@Component({
  selector: 'vg-associar-pessoa-fisica',
  templateUrl: './associar-pessoa-fisica.component.html',
  styleUrls: ['./associar-pessoa-fisica.component.css']
})
export class AssociarPessoaFisicaComponent implements OnInit {

  associaEleitorForm: FormGroup

  pessoaFisica: PessoaFisica

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service) { }

  ngOnInit() {
    this.pessoaFisica = new PessoaFisica();

    this.associaEleitorForm = this.formbuilder.group({
      nome: this.formbuilder.control(''),
      tituloEleitoral: this.formbuilder.control(''),
      identidade: this.formbuilder.control(''),
      cpf: this.formbuilder.control(''),
      impressaoDigital: this.formbuilder.control('')
    })
  }

  carregarDigital(file) {
    let self = this

    var fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = function (e) {
      self.pessoaFisica.impressaoDigital = fileReader.result
    }
  }

  criarPessoaFisica() {
    this.pessoaFisica.nome = this.associaEleitorForm.get('nome').value
    this.pessoaFisica.tituloEleitoral = this.associaEleitorForm.get('tituloEleitoral').value
    this.pessoaFisica.identidade = this.associaEleitorForm.get('identidade').value
    this.pessoaFisica.cpf = this.associaEleitorForm.get('cpf').value
    this.pessoaFisica.impressaoDigital = this.associaEleitorForm.get('impressaoDigital').value
  }

  associarEleitor() {

    this.criarPessoaFisica()

    console.log(this.associaEleitorForm.get('nome'))

    console.log(this.pessoaFisica)

    // this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, false,
    //   (data) => {

    //   },
    //   (error) => {

    //   })
  }

}
