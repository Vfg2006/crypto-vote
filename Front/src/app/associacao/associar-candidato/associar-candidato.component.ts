import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Service } from '../../shared/Web3Service';
import { PessoaFisica } from '../../model/PessoaFisica.model';
import { PessoaFisicaService } from '../pessoa-fisica.service';

import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { ConstantesService } from '../../shared/ConstantesService';

const URL = ConstantesService.serverUrl + "upload"

@Component({
  selector: 'vg-associar-candidato',
  templateUrl: './associar-candidato.component.html',
  styleUrls: ['./associar-candidato.component.css']
})
export class AssociarCandidatoComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: URL });

  associaCandidatoForm: FormGroup

  pessoaFisica: PessoaFisica

  candidatoFotoPath: any
  viceFotoPath: any

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service,
    private ref: ChangeDetectorRef, private pessoaFisicaService: PessoaFisicaService) { }

  ngOnInit() {
    this.pessoaFisica = new PessoaFisica();

    this.createReactiveForms()

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  createReactiveForms() {
    this.associaCandidatoForm = this.formbuilder.group({
      nome: ['', Validators.required],
      tituloEleitoral: ['', Validators.required],
      identidade: ['', Validators.required],
      cpf: ['', Validators.required],
      tipoAssociacao: ['', Validators.required],
      partido: [''],
      numeroCandidato: [''],
      cargoPretendido: [''],
      fotoCandidato: [''],
      nomeVice: [''],
      fotoVice: [''],
    })
  }

  criarPessoaFisica() {
    this.pessoaFisica.nome = this.associaCandidatoForm.get('nome').value
    this.pessoaFisica.tituloEleitoral = this.associaCandidatoForm.get('tituloEleitoral').value
    this.pessoaFisica.identidade = this.associaCandidatoForm.get('identidade').value
    this.pessoaFisica.cpf = this.associaCandidatoForm.get('cpf').value
    this.pessoaFisica.isCandidato = true
    
    this.pessoaFisica.dadosCandidato.partido = this.associaCandidatoForm.get('partido').value
    this.pessoaFisica.dadosCandidato.numero = this.associaCandidatoForm.get('numeroCandidato').value
    this.pessoaFisica.dadosCandidato.cargo = this.associaCandidatoForm.get('cargoPretendido').value
    this.pessoaFisica.dadosCandidato.vice.nome = this.associaCandidatoForm.get('nomeVice').value
    this.pessoaFisica.dadosCandidato.contaBlockchainCandidato = this.web3Service.recuperaContaSelecionada()
  }

  uploadFotos(identificador) {
    this.uploader.uploadAll()

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("Upload de fotos feito com sucesso!")
      let filename = JSON.parse(response).filename;

      if (identificador == "candidato") {
        this.pessoaFisica.dadosCandidato.fotoPath = URL + '/' + filename
      } else {
        this.pessoaFisica.dadosCandidato.vice.fotoPath = URL + '/' + filename
      }
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

    // this.web3Service.cadastra(this.pessoaFisica.impressaoDigital, true,
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
