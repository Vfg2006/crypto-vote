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

var PessoasFisicas = mongoose.model('Pessoasfisicas', {
	nome: String,
	tituloEleitoral: String,
	identidade: String,
	cpf: String,
	isCandidato: Boolean,
	dadosCandidato: {
		contaBlockchainCandidato: String,
		partido: String,
		numero: Number,
		cargo: String,
		fotoPath: String,
		vice: {
			nome: String,
			fotoPath: String,
		}
	}
})



var n = contratoJson.networks;
var accounts;

console.log("config.infra.rede_blockchain (4=Rinkeby|4447=local) = " + config.infra.rede_blockchain);

ABI = contratoJson['abi']
// console.log(contratoJson)
// console.log("abi = ", ABI)

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


app.get('/api/abi', function (req, res) {
	res.json(contratoJson);
})

//recupera constantes front
app.post('/api/constantesFront', function (req, res) {
	res.json({ addrContrato: addrContrato });
});

app.post('/api/associar-pessoa-fisica', associarPessoaFisica);

function associarPessoaFisica(req, res) {
	let requisicao = req.body;

	console.log(requisicao)
	console.log(requisicao.pessoaFisica)

	if (requisicao.pessoaFisica.isCandidato) {
		associarCandidato(req, res);
	} else {
		associarEleitor(req, res);
	}
}

function associarCandidato(req, res) {

	console.log("Backend - Associa Candidato")

	let requisicao = req.body;

	PessoasFisicas.create({
		nome: requisicao.pessoaFisica.nome,
		tituloEleitoral: requisicao.pessoaFisica.tituloEleitoral,
		identidade: requisicao.pessoaFisica.identidade,
		cpf: requisicao.pessoaFisica.nome,
		isCandidato: requisicao.pessoaFisica.isCandidato,
		dadosCandidato: {
			contaBlockchainCandidato: requisicao.pessoaFisica.dadosCandidato.contaBlockchainCandidato,
			partido: requisicao.pessoaFisica.dadosCandidato.partido,
			numero: requisicao.pessoaFisica.dadosCandidato.numero,
			cargo: requisicao.pessoaFisica.dadosCandidato.cargo,
			fotoPath: requisicao.pessoaFisica.dadosCandidato.fotoPath,
			vice: {
				nome: requisicao.pessoaFisica.dadosCandidato.vice.nome,
				fotoPath: requisicao.pessoaFisica.dadosCandidato.vice.fotoPath,
			}
		}
	},
		function (err, pf) {
			if (err) {
				console.log("Erro ao criar a pessoa fisica");
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log("Candidato salvo com sucesso!")
				res.json({ sucesso: true });
			}
		}
	);
}

function associarEleitor(req, res) {

	console.log("Backend - Associa Eleitor")

	let requisicao = req.body;

	PessoasFisicas.create({
		nome: requisicao.pessoaFisica.nome,
		tituloEleitoral: requisicao.pessoaFisica.tituloEleitoral,
		identidade: requisicao.pessoaFisica.identidade,
		cpf: requisicao.pessoaFisica.nome,
		isCandidato: requisicao.pessoaFisica.isCandidato,
	},
		function (err, pf) {
			if (err) {
				console.log("Erro ao criar a pessoa fisica");
				console.log(err);
				res.sendStatus(500);
			} else {
				console.log("Eleitor salvo com sucesso!")
				res.json({ sucesso: true });
			}
		}
	);
}

app.get('/api/candidatos', function (req, res) {

	Promise.props({
		pessoaFisica: PessoasFisicas.find().execAsync()
	})
		.then(function (result) {
			console.log("Candidatos encontrados com sucesso!");

			console.log(result)

			let candidatos = result.pessoaFisica;
			console.log(candidatos)

			res.json(candidatos);
		})
		.catch(function (err) {
			console.log("Erro ao buscar candidatos");
			console.log(error)
			res.sendStatus(500);
		})
});

app.get('/api/candidatos/:numero', function (req, res) {

	console.log("Backend - Buscar Candidato por Número")

	let param = req.params;

	console.log(param.numero)

	Promise.props({
		pessoaFisica: PessoasFisicas.find(
			{ 'dadosCandidato.numero': param.numero }
		).execAsync()
	})
		.then(function (result) {
			console.log("Candidato encontrado com sucesso!");

			console.log(result)

			let candidato = result.pessoaFisica[0];
			console.log(candidato)

			res.json(candidato);
		})
		.catch(function (err) {
			console.log("Erro ao buscar candidato");
			console.log(error)
			res.sendStatus(500);
		})
});


var store = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);

	}
});

var DIR = './uploads/';
var upload = multer({ dest: DIR, storage: store }).single('file');

app.post('/api/upload', function (req, res, next) {
	upload(req, res, function (err) {
		if (err) {
			return res.status(501).json({ error: err });
		}

		res.json({ filename: req.file.filename })
	});
});

app.post('/api/download-image', function (req, res) {
	let filename = req.body.filename

	filepath = __dirname + '/uploads/' + filename;
	res.sendFile(filepath);
});


// listen (start app with node server.js) 
app.listen(8080, "0.0.0.0");

let data = "\n" + new Date() + "\nApp listening on port 8080 ";
console.log(data);