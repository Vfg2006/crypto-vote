import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConstantesService } from './ConstantesService';
import { formattedError } from '@angular/compiler';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class Web3Service {

    private serverUrl: string;

    @Output() update = new EventEmitter();
    private contractAddr: string = '';
    private defaultNodeIP: string = 'MetaMask';                    // Default node
    private nodeIP: string;                                        // Current nodeIP
    private nodeConnected: boolean = true;                         // If we've established a connection yet
    private adding: boolean = false;                               // If we're adding a question
    private web3Instance: any;                                     // Current instance of web3

    private voteContract: any;

    // Application Binary Interface so we can use the question contract
    private ABI

    private vetorTxJaProcessadas: any[];

    // private eventoCadastro: any;
    // private eventoLiberacao: any;
    // private eventoTransferencia: any;
    // private eventoRepasse: any;
    // private eventoResgate: any;
    // private eventoLiquidacaoResgate: any;
    // private eventoLog: any[];

    private eventoVoto: any

    private addressOwner: string;

    // private decimais : number;

    constructor(private http: HttpClient, private constantes: ConstantesService) {

        // this.eventoLog = [ {length: 6} ];
        this.vetorTxJaProcessadas = [];

        this.serverUrl = ConstantesService.serverUrl;
        // console.log("Web3Service.ts :: Selecionou URL = " + this.serverUrl)

        this.http.post<Object>(this.serverUrl + 'constantesFront', {}).subscribe(
            data => {

                this.contractAddr = data["addrContrato"];

                // Seta a ABI de acordo com o json do contrato
                this.http.get(this.serverUrl + 'abi').subscribe(
                    data => {
                        this.ABI = data['abi'];
                        this.intializeWeb3();
                        // this.inicializaQtdDecimais();
                    },
                    error => {
                        console.log("Erro ao buscar ABI do contrato")
                    }
                );
            },
            error => {
                console.log("**** Erro ao buscar constantes do front");
            });
    }

    private intializeWeb3(): void {
        this.nodeIP = this.defaultNodeIP;

        if (typeof window['web3'] !== 'undefined' && (this.nodeIP === 'MetaMask')) {
            this.web3 = new this.Web3(window['web3'].currentProvider);
            this.nodeIP = 'MetaMask';
            this.nodeConnected = true;
            this.update.emit(null);
            console.log("Conectado com noh");

        } else {
            console.log('Using HTTP node --- nao suportado');
        }

        this.voteContract = this.web3.eth.contract(this.ABI).at(this.contractAddr);

        let self = this;

        // this.getAddressOwner(function (addrOwner) {
        //     console.log("addOwner=" + addrOwner);
        //     self.addressOwner = addrOwner;
        // }, function (error) {
        //     console.log("Erro ao buscar owner=" + error);
        // });

        console.log("INICIALIZOU O WEB3 - VoteContract abaixo");
        // console.log(this.voteContract);
    }

    get isConnected(): boolean {
        return this.nodeConnected;
    }

    get web3(): any {
        if (!this.web3Instance) {
            this.intializeWeb3();
        }
        return this.web3Instance;
    }
    set web3(web3: any) {
        this.web3Instance = web3;
    }
    get currentAddr(): string {
        return this.contractAddr;
    }
    set currentAddr(contractAddr: string) {
        if (contractAddr.length === 42 || contractAddr.length === 40) {
            this.contractAddr = contractAddr;
        } else {
            console.log('Invalid address used');
        }
    }
    get currentNode(): string {
        return this.nodeIP;
    }
    set currentNode(nodeIP: string) {
        this.nodeIP = nodeIP;
    }

    get Web3(): any {
        return window['Web3'];
    }

    get addingQuestion(): boolean {
        return this.adding;
    }

    recuperarEventVote(callback) {
        this.eventoVoto = this.voteContract.VoteConfirmed({}, { fromBlock: 0, toBlock: 'latest' })
        this.eventoVoto.watch(callback)
    }

    recuperaContaSelecionada() {
        return this.web3.eth.accounts[0];
    }

    cadastra(fingerprint: string, isCandidato: boolean,
        fSuccess: any, fError: any): void {
        console.log("Web3Service - Associa eleitor")

        fingerprint = this.criptografarFingerprint(fingerprint)

        this.voteContract.registerVoter(fingerprint, isCandidato, { from: this.web3.eth.accounts[0], gas: 500000 },
            (error, result) => {
                if (error) fError(error);
                else fSuccess(result);
            });
    }

    votar(enderecoCandidato: string, fSuccess: any, fError: any): void {
        console.log("Web3Service - Votar")

        this.voteContract.vote(enderecoCandidato, { gas: 500000 },
            (error, result) => {
                if (error) fError(error);
                else fSuccess(result);
            });
    }

    validaDigital(fingerprint: string, fSuccess: any, fError: any): void {
        console.log("Web3Service - Validar Digital")

        fingerprint = this.criptografarFingerprint(fingerprint)

        this.voteContract.validaDigital(fingerprint, { gas: 500000 },
            (error, result) => {
                if (error) fError(error);
                else fSuccess(result);
            });
    }

    criptografarFingerprint(fingerprint: string) {
        var fingerprintEncrypted = CryptoJS.SHA512(fingerprint)

        console.log("IMPRESSÃO DIGITAL CRIPTOGRAFADA")
        console.log(fingerprintEncrypted.toString())

        return fingerprintEncrypted.toString()
    }

    // getTotalSupply(fSuccess: any, fError: any): number {
    //     console.log("Vai recuperar o totalsupply. ");
    //     let self = this;
    //     return this.voteContract.getTotalSupply(
    //         (error, totalSupply) => {
    //             if (error) fError(error);
    //             // else fSuccess( self.converteInteiroParaDecimal(  parseInt ( totalSupply ) ) );
    //         });
    // }

    getBalanceOf(address: string, fSuccess: any, fError: any): number {
        console.log("Vai recuperar a quantidade de votos de " + address);
        
        return this.voteContract.getBalanceOf(address,
            (error, qtdVotos) => {
                if (error) fError(error);
                else fSuccess(qtdVotos);
            });

    }

    // getAddressOwner(fSuccess: any, fError: any): number {
    //     return this.voteContract.getOwner(
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    getAddressOwnerCacheble() {
        return this.addressOwner;
    }

    // inicializaQtdDecimais() {
    //     let self = this;
    //     this.voteContract.getDecimals(
    //         (error, result) => {
    //             if (error) { 
    //                 console.log( "Decimais: " +  error);  
    //                 self.decimais = -1 ;
    //             } 
    //             else {
    //                 console.log ( "Decimais: " +  result.c[0] );
    //                 self.decimais = result.c[0] ;
    //             }

    //         }); 
    // }

    // converteDecimalParaInteiro( _x : number ): number {
    //     return ( _x * ( 10 ** this.decimais ) ) ;
    // }

    // converteInteiroParaDecimal( _x: number ): number {    
    //     return ( _x / ( 10 ** this.decimais ) ) ;
    // }

    conexaoComBlockchainEstaOK() {
        try {
            let contaBlockchain = this.recuperaContaSelecionada();
            //console.log( "recuperaContaSelecionada = " + contaBlockchain );
            if (contaBlockchain != undefined)
                return true;
            else
                throw new Error('Conta nao definida');
        } catch (e) {
            //throw e;
            return false;
            //console.log("nao conseguiu recuperar conta no web3/metamask");
        }
    }


    getBlockTimestamp(blockHash: number, fResult: any) {
        this.web3.eth.getBlock(blockHash, fResult);
    }

    // accountIsActive(address: string, fSuccess: any, fError: any): boolean {
    //     return this.voteContract.accountIsActive(address, 
    //     (error, result) => {
    //         if(error) fError(error);
    //         else fSuccess(result);
    //     });
    // }
}
