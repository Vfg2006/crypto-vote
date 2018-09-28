import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../shared/Web3Service';
import { PessoaFisica } from '../model/PessoaFisica.model';
import { PessoaFisicaService } from './pessoa-fisica.service';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { ConstantesService } from '../shared/ConstantesService';

const URL = ConstantesService.serverUrl + "upload"

@Component({
  selector: 'vg-associar-pessoa-fisica',
  templateUrl: './associar-pessoa-fisica.component.html',
  styleUrls: ['./associar-pessoa-fisica.component.css']
})
export class AssociarPessoaFisicaComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: URL });

  associaEleitorForm: FormGroup

  pessoaFisica: PessoaFisica

  candidatoFotoPath: any
  viceFotoPath: any

  opcoesTipoAssocicao: any[] = [
    { label: 'Eleitor', value: 'eleitor' },
    { label: 'Candidadto', value: 'candidato' }
  ]

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service,
    private ref: ChangeDetectorRef, private pessoaFisicaService: PessoaFisicaService) { }

  ngOnInit() {
    this.pessoaFisica = new PessoaFisica();

    // this.inicializarPessoaFisica()
    this.createReactiveForms()

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  // inicializarPessoaFisica() {

  //   this.pessoaFisica.nome = ''
  //   this.pessoaFisica.tituloEleitoral = ''
  //   this.pessoaFisica.identidade = ''
  //   this.pessoaFisica.cpf = ''
  //   this.pessoaFisica.impressaoDigital = ''
  //   this.pessoaFisica.partido = ''
  //   this.pessoaFisica.numero = 0
  //   this.pessoaFisica.cargo = ''
  //   this.pessoaFisica.vice.nome = ''
  // }

  createReactiveForms() {
    this.associaEleitorForm = this.formbuilder.group({
      nome: ['', Validators.required],
      tituloEleitoral: ['', Validators.required],
      identidade: ['', Validators.required],
      cpf: ['', Validators.required],
      impressaoDigital: [''],
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

    console.log(this.pessoaFisica)

    this.pessoaFisica.nome = this.associaEleitorForm.get('nome').value
    this.pessoaFisica.tituloEleitoral = this.associaEleitorForm.get('tituloEleitoral').value
    this.pessoaFisica.identidade = this.associaEleitorForm.get('identidade').value
    this.pessoaFisica.cpf = this.associaEleitorForm.get('cpf').value
    this.pessoaFisica.impressaoDigital = this.associaEleitorForm.get('impressaoDigital').value
    this.pessoaFisica.partido = this.associaEleitorForm.get('partido').value
    this.pessoaFisica.numero = this.associaEleitorForm.get('numeroCandidato').value
    this.pessoaFisica.cargo = this.associaEleitorForm.get('cargoPretendido').value
    // this.pessoaFisica.vice.nome = this.associaEleitorForm.get('nomeVice').value
  }

  definirPapel(papel) {
    console.log(papel)

    this.pessoaFisica.isCandidato = papel === "candidato" ? true : false

    this.ref.detectChanges()
  }

  uploadFotos(identificador) {
    this.uploader.uploadAll()

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("Upload de fotos feito com sucesso!")
      let filename = JSON.parse(response).filename;

      if (identificador == "candidato") {
        this.pessoaFisica.fotoPath = URL + '/' + filename
      } else {
        this.pessoaFisica.vice.fotoPath = URL + '/' + filename
      }
      console.log(this.pessoaFisica)
    }
  }

  readURL(event, id): void {

    const identificador = id

    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = e => identificador === "candidato" ? this.candidatoFotoPath = reader.result : this.viceFotoPath = reader.result
    reader.readAsDataURL(file);

    this.uploadFotos(identificador)
  }

  associarEleitor() {

    let self = this

    this.criarPessoaFisica()

    console.log(this.pessoaFisica)

    this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, this.pessoaFisica.isCandidato,
      (data) => {
        console.log(data)

        self.pessoaFisicaService.associarPessaFisica(self.pessoaFisica).subscribe(
          data => {
            console.log(data)
          },
          error => {
            console.error(error)
          }
        )
      },
      (error) => {
        console.error(error)
      })
  }

}
