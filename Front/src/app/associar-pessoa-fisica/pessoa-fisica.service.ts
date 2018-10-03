import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';

import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class PessoaFisicaService {

    API = 'http://localhost:8080/api'

    constructor(private http: HttpClient) {
    }

    associarPessaFisica(pessoaFisica) {
        console.log("PessoaFisicaService - Associar Pessoa fisica")
        console.log(pessoaFisica)

        return this.http.post<Object>(`${this.API}/associar-pessoa-fisica`, { pessoaFisica: pessoaFisica })
            .catch(ErrorHandler.handleError)
    }
}