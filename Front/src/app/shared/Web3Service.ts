import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConstantesService } from './ConstantesService';
import { formattedError } from '@angular/compiler';

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
        console.log(this.voteContract);
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

    // registraEventosCadastro(callback) {
    //     this.eventoCadastro = this.voteContract.Cadastro({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoCadastro.watch(callback);
    // }
    // registraEventosTroca(callback) {
    //     this.eventoCadastro = this.voteContract.Troca({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoCadastro.watch(callback);
    // }
    // registraEventosLiberacao(callback) {
    //     this.intializeWeb3(); //forca inicializa
    //     this.eventoLiberacao = this.voteContract.Liberacao({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLiberacao.watch(callback);
    // }
    // registraEventosTransferencia(callback) {
    //     this.eventoTransferencia = this.voteContract.Transferencia({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoTransferencia.watch(callback);
    // }
    // registraEventosRepasse(callback) {
    //     this.eventoRepasse = this.voteContract.Repasse({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoRepasse.watch(callback);
    // }
    // registraEventosResgate(callback) {
    //     this.eventoResgate = this.voteContract.Resgate({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoResgate.watch(callback);
    // }
    // registraEventosLiquidacaoResgate(callback) {
    //     this.eventoLiquidacaoResgate = this.voteContract.LiquidacaoResgate({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLiquidacaoResgate.watch(callback);
    // }

    // registraEventosLog(callback) {
    //     this.eventoLog[0] = this.voteContract.LogUint({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLog[1] = this.voteContract.LogInt({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLog[2] = this.voteContract.LogBytes({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLog[3] = this.voteContract.LogBytes32({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLog[4] = this.voteContract.LogAddress({}, { fromBlock: 0, toBlock: 'latest' });
    //     this.eventoLog[5] = this.voteContract.LogBool({}, { fromBlock: 0, toBlock: 'latest' });

    //     this.eventoLog[0].watch(callback);
    //     this.eventoLog[1].watch(callback);
    //     this.eventoLog[2].watch(callback);
    //     this.eventoLog[3].watch(callback);
    //     this.eventoLog[4].watch(callback);
    //     this.eventoLog[5].watch(callback);
    // }

    // registraWatcherEventosLocal(txHashProcurado, callback) {
    //     //this.intializeWeb3(); //forca inicializa
    //     let self = this;
    //     console.info("Callback ", callback);
    //     var event = this.voteContract.allEvents({fromBlock: 0, toBlock: 'latest'}, function (error, result) {
    //         console.log( "Entrou no watch" );
    //         console.log( "txHashProcurado: " + txHashProcurado );
    //         console.log( "result.transactionHash: " + result.transactionHash );
    //         let meuErro;
    //         if ( txHashProcurado === result.transactionHash 
    //             && !self.vetorTxJaProcessadas.includes(txHashProcurado)) {
    //             console.log( "Chama callback " + result );
    //             self.vetorTxJaProcessadas.push(txHashProcurado);
    //             meuErro=error;
    //         }
    //         else {
    //             meuErro = new Error('"Nao eh o evento de confirmacao procurado"');
    //         } 
    //         callback(meuErro, result);

    //     });
    //     console.log("registrou o watcher de eventos");
    // }

    recuperaContaSelecionada() {
        return this.web3.eth.accounts[0];
    }

    cadastra(fingerprint: string, isCandidato: boolean,
        fSuccess: any, fError: any): void {
        console.log("Web3Service - Associa eleitor")

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

    getTotalSupply(fSuccess: any, fError: any): number {
        console.log("vai recuperar o totalsupply. ");
        let self = this;
        return this.voteContract.getTotalSupply(
            (error, totalSupply) => {
                if (error) fError(error);
                // else fSuccess( self.converteInteiroParaDecimal(  parseInt ( totalSupply ) ) );
            });
    }

    getBalanceOf(address: string, fSuccess: any, fError: any): number {
        console.log("vai recuperar o balanceOf de " + address);
        let self = this;
        return this.voteContract.getBalanceOf(address,
            (error, valorSaldoCNPJ) => {
                if (error) fError(error);
                // else fSuccess( self.converteInteiroParaDecimal( parseInt ( valorSaldoCNPJ ) ) );
            });

    }

    // getCNPJ(addr: string, fSuccess: any, fError: any): number {
    //     return this.voteContract.getCNPJ(addr,
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

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

    // transfer(target: string, transferAmount: number, fSuccess: any, fError: any): void {

    //     console.log("Web3Service - Transfer");
    //     console.log('UnlockedAccount=' + this.web3.eth.accounts[0]);
    //     console.log('Target=' + target);
    //     console.log('TransferAmount=' + transferAmount);

    //     transferAmount = this.converteDecimalParaInteiro(transferAmount);     
    //     this.voteContract.transfer(target, transferAmount, { from: this.web3.eth.accounts[0], gas: 500000 },
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });

    // }

    // liberacao(target: string, transferAmount: number, fSuccess: any, fError: any): void {
    //     console.log("Web3Service - Liberacao")

    //     this.transfer(target, transferAmount, fSuccess, fError);
    // }

    // aguardaLiberacao(cnpj: string, subcredito: number, valor: number)
    // {
    //     this.intializeWeb3(); //forca inicializa        
    //     var evento = this.bndescoinContract.Liberacao({cnpj: cnpj, sucredito: subcredito, valor: valor}, 
    //         { fromBlock: 'pending', toBlock: 'latest' });

    //     evento.watch(function (erro, result) {
    //         evento.stopWatching();
    //         if (!erro) return true;
    //         else return erro;
    //     });

    //     Liberacao(pjsInfo[_to].cnpj, pjsInfo[_to].idSubcredito, _value);                    

    // }

    // resgata(transferAmount: number, fSuccess: any, fError: any): void {

    //     console.log("Web3Service - Resgata")
    //     let self = this;

    //     this.getAddressOwner(
    //         function (addrOwner) {
    //             self.transfer(addrOwner, transferAmount, fSuccess, fError);
    //             console.log("owner abaixo - dentro do resgata");
    //             console.log(addrOwner);
    //         },
    //         function (error) {
    //             console.log("erro na recuperacao do owner dentro do metodo resgata");
    //             console.log(error);
    //         }
    //     );

    // }

    // liquidaResgate(hashResgate: any, hashComprovante: any, fSuccess: any, fError: any) {
    //     console.log("Web3Service - liquidaResgate")
    //     console.log("HashResgate - " + hashResgate)
    //     console.log("HashComprovante - " + hashComprovante)

    //     this.voteContract.notificaLiquidacaoResgate(hashResgate, hashComprovante,
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    // cancelarAssociacaoDeConta(cnpj: number, subcredito: number, cnpjOrigemRepasse: number,
    //     isRepassador: boolean, fSuccess: any, fError: any) {
    //     console.log("Web3Service - Cancelar Associacao")
    //     console.log("CNPJ: " + cnpj + ", Subcredito: " + subcredito + ", cnpjOrigemRepasse: " + cnpjOrigemRepasse +
    //         ", isRepassador: " + isRepassador)

    //     this.voteContract.troca(cnpj, subcredito, { gas: 500000 },
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    setBalanceOf(address: string, valor: number, fSuccess: any, fError: any): void {
        // valor = this.converteDecimalParaInteiro(valor);
        this.voteContract.setBalanceOf(address, valor, { from: this.web3.eth.accounts[0], gas: 500000 },
            (error, result) => {
                if (error) fError(error);
                else fSuccess(result);
            }
        );
    }

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

    // isRepassador(address: string, fSuccess: any, fError: any): boolean {
    //     return this.voteContract.isRepassador(address,
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    // isFornecedor(address: string, fSuccess: any, fError: any): boolean {
    //     return this.voteContract.isFornecedor(address,
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    // isRepassadorSucredito(addrRepassador: string, addrSubcredito, fSuccess: any, fError: any): boolean {
    //     return this.voteContract.isRepassadorSubcredito(addrRepassador, addrSubcredito,
    //         (error, result) => {
    //             if (error) fError(error);
    //             else fSuccess(result);
    //         });
    // }

    // accountIsActive(address: string, fSuccess: any, fError: any): boolean {
    //     return this.voteContract.accountIsActive(address, 
    //     (error, result) => {
    //         if(error) fError(error);
    //         else fSuccess(result);
    //     });
    // }
}
