import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vg-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

@Output() impressaoDigital = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  carregarDigital(file) {
    let self = this

    var fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");

    fileReader.onload = function (e) {
      self.impressaoDigital.emit(fileReader.result.toString())
    }
  }

}
