import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PessoaFisica } from '../../model/PessoaFisica.model';
import { Web3Service } from '../../shared/Web3Service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'vg-associar-eleitor',
  templateUrl: './associar-eleitor.component.html',
  styleUrls: ['./associar-eleitor.component.css']
})
export class AssociarEleitorComponent implements OnInit {

  eleitor: PessoaFisica

  associaEleitorForm: FormGroup

  constructor(private formbuilder: FormBuilder, private web3Service: Web3Service,
    private ref: ChangeDetectorRef, private _notifications: NotificationsService) { }

  ngOnInit() {
    this.eleitor = new PessoaFisica();

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

  getDigital(impressaoDigital) {
    console.log("IMPRESSÃO DIGITAL CAPTURADA")
    console.log(impressaoDigital)
    this.eleitor.impressaoDigital = impressaoDigital
  }

  createReactiveForms() {
    this.associaEleitorForm = this.formbuilder.group({
      impressaoDigital: [''],
      contaBlockchain: ['']
    })
  }

  criarPessoaFisica() {
    this.eleitor.contaBlockchain = this.recuperaContaSelecionada()
  }

  associarEleitor() {

    let self = this

    this.criarPessoaFisica()

    if(this.eleitor.impressaoDigital == '' || this.eleitor.impressaoDigital == undefined) {
      this._notifications.create('Erro', 'A impressão digital é obrigatória.', NotificationType.Error)
      return;
    }

    this.web3Service.cadastra(this.eleitor.impressaoDigital,
      (data) => {
        console.log(data)
        if(data) {
          this._notifications.create('Sucesso', 'O eleitor foi associado com sucesso', NotificationType.Success)
        } else { 
          this._notifications.create('Erro', 'Erro ao tentar associar o eleitor.', NotificationType.Error)
        }
    },
    (error) => {
      console.error(error)
      this._notifications.create('Erro', 'Erro ao tentar associar o eleitor. É possível que essa digital já esteja associada.', NotificationType.Error)
    })
  }
}
