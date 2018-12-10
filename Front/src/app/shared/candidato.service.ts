import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

import { ErrorHandler } from '../app.error-handler'
import { Observable } from "rxjs";

@Injectable()
export class CandidatoService {

    API = 'http://localhost:8080/api'

    constructor(private http: HttpClient) {
    }

    associarCandidato(candidato) {
        console.log("CandidatoService - Associar um candidato")
        console.log(candidato)

        return this.http.post<Object>(`${this.API}/associar-pessoa-fisica`, { pessoaFisica: candidato })
            .catch(ErrorHandler.handleError)
    }

    getCandidatos() {
        console.log("CandidatoService - Pegar todos os candidatos")

        return this.http.get<Object>(`${this.API}/candidatos`)
            .catch(ErrorHandler.handleError)

    }

    carregaImagem(filename: string): Observable<Object> {
        console.log("CandidatoService - carregar imagem")

        return this.http.post(`${this.API}/download-image`, { filename: filename }, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        }).catch(ErrorHandler.handleError)
    }
}