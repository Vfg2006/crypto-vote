import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vg-confirma-branco-nulo',
  templateUrl: './confirma-branco-nulo.component.html',
  styleUrls: ['./confirma-branco-nulo.component.css']
})
export class ConfirmaBrancoNuloComponent implements OnInit {

  @Input() tipoVoto: string

  constructor() { }

  ngOnInit() {
    console.log("TIPO DE VOTO: " + this.tipoVoto)
  }

}
