import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../shared/Web3Service';
import { PessoaFisica } from '../model/PessoaFisica.model';

@Component({
  selector: 'vg-associar-pessoa-fisica',
  templateUrl: './associar-pessoa-fisica.component.html',
  styleUrls: ['./associar-pessoa-fisica.component.css']
})
export class AssociarPessoaFisicaComponent implements OnInit {

  associaEleitorForm: FormGroup

  pessoaFisica: PessoaFisica

  opcoesTipoAssocicao: any[] = [
    { label: 'Eleitor', value: 'eleitor' },
    { label: 'Candidadto', value: 'candidato' }
  ]

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.pessoaFisica = new PessoaFisica();

    this.associaEleitorForm = this.formbuilder.group({
      nome: ['', Validators.required],
      tituloEleitoral: ['', Validators.required],
      identidade: ['', Validators.required],
      cpf: ['', Validators.required],
      impressaoDigital: ['', Validators.required],
      tipoAssociacao: ['', Validators.required],
      partido: [''],
      numeroCandidato: [''],
      cargoPretendido: [''],
      fotoCandidato: [''],
      nomeVice: [''],
      fotoVice: [''],
    })
  }

  carregarDigital(file) {
    let self = this

    var fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = function (e) {
      self.pessoaFisica.impressaoDigital = fileReader.result.toString()
    }
  }

  criarPessoaFisica() {
    this.pessoaFisica.nome = this.associaEleitorForm.get('nome').value
    this.pessoaFisica.tituloEleitoral = this.associaEleitorForm.get('tituloEleitoral').value
    this.pessoaFisica.identidade = this.associaEleitorForm.get('identidade').value
    this.pessoaFisica.cpf = this.associaEleitorForm.get('cpf').value
    this.pessoaFisica.impressaoDigital = this.associaEleitorForm.get('impressaoDigital').value
  }

  definirPapel(papel) {
    console.log(papel)

    this.pessoaFisica.isCandidato = papel === "candidato" ? true : false

    this.ref.detectChanges()
  }

  associarEleitor() {

    this.criarPessoaFisica()

    console.log(this.associaEleitorForm.get('nome'))

    console.log(this.pessoaFisica)

    this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, false,
      (data) => {

      },
      (error) => {

      })
  }

}
