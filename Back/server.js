// Set up
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var Promise = require('bluebird');
var config = require('./config.json');
var multer = require('multer');

var crypto = require('crypto');
var fs = require('fs')
//const Web3 = require('web3')


var contratoJson = require(config.infra.contrato_json);

var smartContract;
var ABI;
var endereco_websocket;

// Configuration
mongoose.connect(config.infra.addr_bd);

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

	next();
});

Promise.promisifyAll(mongoose); // key part - promisification



var n = contratoJson.networks;
var accounts;

console.log(contratoJson.networks)
console.log(n)

console.log("config.infra.rede_blockchain (4=Rinkeby|4447=local) = " + config.infra.rede_blockchain);

ABI = contratoJson['abi']
console.log( "abi = ", this.ABI )

let addrContrato;
if (config.infra.rede_blockchain == 4) { //Rinkeby 
	addrContrato = config.infra.endereco_contrato_rinkeby
	endereco_websocket = config.infra.endereco_websocket_rinkeby
}
else {
	addrContrato = n[config.infra.rede_blockchain].address;
	endereco_websocket = config.infra.endereco_websocket
}

console.log("endereco do contrato=" + addrContrato);
// console.info("endereco_websocket", endereco_websocket);

// if (1 == 2) {
// 	instanciaWeb3eSmartC()
// 	let bloco = 1;

// 	console.log("/api/liberacao/eventos/from :: bloco = ", bloco);

// 	smartContract
// 		.getPastEvents('Liberacao', { fromBlock: bloco })
// 		.then(events => { console.info('getPastEvents', events); })
// }

// if (1 == 2) {
// 	instanciaWeb3eSmartC()
// 	console.log("/api/liberacao/eventos");

// 	smartContract.events
// 		.Liberacao()
// 		.on('data', event => { console.info('data', event); })
// 		.on('error', event => { console.info('data', event); })
// 		.on('changed', event => { console.info('data', event); })
// }

// // Exemplo de como seria o node fazer chamadas ao smartcontract
// function instanciaWeb3eSmartC() {
// 	console.log("endereco_websocket" + endereco_websocket)
// 	console.log("ABI" + ABI)
// 	console.log("addrContrato" + addrContrato)
// 	var provedor = new Web3.providers.WebsocketProvider(endereco_websocket)

// 	/* Trecho comentado porque a biblioteca scrypt precisa ser compilada qdo faz o npm install (inviavel no servidor do bndes)
// 	web3 = new Web3( provedor )
// 	smartContract = new web3.eth.Contract( ABI, addrContrato )
// 	// caso seja metodo de leitura use o call - https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#id16
// 	// senao, use o send
// 	if (1==2) {
// 		smartContract.methods.getVersao().call( function(error, result){ 
// 			if (error) console.log("Backend - associaContaCliente - instanciaWeb3eSmartC - erro " + error );
// 			if (result) console.log("Backend - associaContaCliente - instanciaWeb3eSmartC - OK " + result );
// 		});
// 	}
// 	if (1==2) {
// 		smartContract.methods.setTotalSupply(1)
// 					.send( { from: "0xd636349f5D7E03037e0f224c9B1AC3cCf104f4a5", gas: 500000 }, function(error, transactionHash){ 
// 			if (error) console.log("Backend - associaContaCliente - setTotalSupply - erro " + error );
// 			if (transactionHash) console.log("Backend - associaContaCliente - setTotalSupply - OK " + transactionHash );
// 		});
// 	}
// 	*/
// }
// function web3BuscaAccounts() {
// 	if (accounts === undefined || accounts === null) {
// 		web3.eth.getAccounts().then(accounts => {
// 			console.log("Backend - associaContaCliente - a[] " + accounts)
// 		}
// 		);
// 	}

// }
// function web3BuscaAccount(indice) {
// 	if (accounts === undefined || accounts === null) {
// 		web3.eth.getAccounts().then(accounts => {
// 			console.log("Backend - associaContaCliente - a[" + indice + "] " + accounts[indice])
// 		}
// 		);
// 	}

// }


app.get('/api/abi', function (req, res) {
	res.json(contratoJson);
})

//recupera constantes front
app.post('/api/constantesFront', function (req, res) {
	res.json({ addrContrato: addrContrato });
});

// listen (start app with node server.js) 
app.listen(8080, "0.0.0.0");

let data = "\n" + new Date() + "\nApp listening on port 8080 ";
console.log(data);
