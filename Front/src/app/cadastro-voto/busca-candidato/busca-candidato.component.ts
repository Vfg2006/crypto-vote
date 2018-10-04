import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VotoService } from '../voto.service';
import { Candidato } from '../../candidato.model';

@Component({
    selector: 'vg-busca-candidato',
    templateUrl: './busca-candidato.component.html',
    styleUrls: ['./busca-candidato.component.css']
})
export class BuscaCandidatoComponent implements OnInit {

    buscaCandidatoForm: FormGroup

    @Output() candidato = new EventEmitter();

    constructor(private formbuilder: FormBuilder, private votoService: VotoService) { }

    ngOnInit() {
        this.buscaCandidatoForm = this.formbuilder.group({
            primeiroNumero: ['', Validators.maxLength(1)],
            segundoNumero: ['', Validators.maxLength(1)]
        })
    }

    buscarCandidato() {
        let numero = parseInt(this.buscaCandidatoForm.controls.primeiroNumero.value + this.buscaCandidatoForm.controls.segundoNumero.value)

        console.log(numero)

        this.votoService.candidatoBy(numero).subscribe(
            (data) => {
                console.log(data);

                if (data) {

                    this.candidato.emit({
                        contaBlockchain: data['dadosCandidato'].contaBlockchainCandidato,
                        numero: data['dadosCandidato'].numero,
                        nome: data.nome,
                        partido: data['dadosCandidato'].partido,
                        cargo: data['dadosCandidato'].cargo,
                        fotoPath: data['dadosCandidato'].fotoPath,
                        vice: data['dadosCandidato'].vice
                    });
                } else {
                  console.log("Não foi encontrado nenhum candidato com esse numero")
                }
            },
            (error) => {
                console.error("Erro ao encontrar o candidato")
                console.error(error)
            });
    }

}
