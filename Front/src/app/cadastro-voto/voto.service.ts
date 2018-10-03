import { Injectable } from '@angular/core'

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {ErrorHandler} from '../app.error-handler'

import { Candidato } from './../candidato.model'

@Injectable()
export class VotoService {

    API = 'http://localhost:8080/api'

    constructor(private http: HttpClient) { }

    candidatoBy(numero: number): Observable<Candidato> {
        console.log("VOTO SERVICE: " + numero)
        console.log(`${this.API}/candidatos/${numero}`)

        return this.http.get(`${this.API}/candidatos/${numero}`)
            // .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }
}