import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'vg-associacao',
  templateUrl: './associacao.component.html',
  styleUrls: ['./associacao.component.css']
})
export class AssociacaoComponent implements OnInit {

  opcaoSelecionada: boolean;

  constructor() { }

  ngOnInit() {
   
  }

  selecionarAssociacao() {
      this.opcaoSelecionada = true
  }

}
