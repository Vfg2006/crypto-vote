import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Candidato } from '../../model/candidato.model';
import { Web3Service } from '../../shared/Web3Service';
import { CandidatoService } from '../../shared/candidato.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'vg-confirma-candidato',
  templateUrl: './confirma-candidato.component.html',
  styleUrls: ['./confirma-candidato.component.css']
})
export class ConfirmaCandidatoComponent implements OnInit {

  @Input() recebeCandidato: Candidato

  @Output() corrige = new EventEmitter()

  constructor(private web3Service: Web3Service, private candidatoService: CandidatoService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(this.recebeCandidato)
    console.log(this.web3Service.recuperaContaSelecionada())

    if (this.recebeCandidato.fotoPath.indexOf('assets') == -1) {

      this.candidatoService.carregaImagem(this.recebeCandidato.fotoPath).subscribe(
        data => {
          var url = window.URL.createObjectURL(data);
          let fotoPath = this._sanitizer.bypassSecurityTrustResourceUrl(url)
          this.recebeCandidato.fotoPath = fotoPath
        },
        error => {
          console.log("Erro ao carregar imagem")
        })

      this.candidatoService.carregaImagem(this.recebeCandidato.vice.fotoPath).subscribe(
        data => {
          var url = window.URL.createObjectURL(data);
          let fotoPath = this._sanitizer.bypassSecurityTrustResourceUrl(url)
          this.recebeCandidato.vice.fotoPath = fotoPath
        },
        error => {
          console.log("Erro ao carregar imagem")
        })
    }
  }

}
