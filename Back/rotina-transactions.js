const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var config = require('./config.json');

const app = express();

var contratoJson = require(config.infra.contrato_json);
var n = contratoJson.networks;

var addrContrato = n[config.infra.rede_blockchain].address;
var ABI = contratoJson['abi']

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/48c7f18143b24f88a699c55051377613"));

// app.get('/sendtx', function (req, res) {

const myAddresses = [
    "0xf17f52151ebef6c7334fad080c5704d77216b732",
    "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef",
    "0x821aea9a577a9b44299b9c15c88cf3087f3b5544",
    "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
    "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
    "0x2191ef87e392377ec08e7c08eb105ef5448eced5",
    "0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5",
    "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
    "0x5aeda56215b167893e80b4fe645ba6d5bab767de"];

const privatesKeys = [
    "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
    "0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1",
    "c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c",
    "388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418",
    "659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63",
    "82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8",
    "aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7",
    "0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4",
    "8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5"]

const toAddresses = [
    "0xb2ed8ebb091c17c21b4c6cd1ef768b66c31d15bc",
    "0x0751f545185fae1a882c311fcc3e8c00fb206fba",
    "0x98544babd863f5ce635453728aee5e1e22362782",
    "0x2Fdb700dDE5fD2D763D431a90CE0e77155Bada20"]

// var myAddress = 'ADDRESS_THAT_SENDS_TRANSACTION';
// var toAddress = 'ADRESS_TO_SEND_TRANSACTION';

//contract abi is the array that you can get from the ethereum wallet or etherscan
var contractABI = ABI;
var contractAddress = addrContrato;
//creating contract object
var contract = new web3js.eth.Contract(contractABI, contractAddress);

// Criar a associação de conta
function AssociarContasParaTeste() {

    console.log("Inicio da associação de contas")

    // for (var i = 0; i < myAddresses.length; i++) {

    let fromAddress = myAddresses[0];
    let pk = privatesKeys[0];
    var count;

    web3js.eth.getTransactionCount(fromAddress).then(function (v) {
        console.log("Count: " + v);
        count = v;

        var privateKey = Buffer.from(pk, 'hex')

        rawTransaction = {
            "from": fromAddress, "gasPrice": web3js.utils.toHex(20 * 1e9), "gasLimit": web3js.utils.toHex(210000),
            "to": contractAddress, "value": "0x0", "data": contract.methods.registerVoter("6v15sdvv61sd651v6sd1vsdv165sd1v1s6d5v", false).encodeABI(),
            "nonce": 10000
        }

        console.log(rawTransaction);

        var transaction = new Tx(rawTransaction);
        transaction.sign(privateKey);

        console.log(transaction)

        web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('transactionHash', console.log);
    })
    // }
}

// Criar random para toAddresses
function realizarVotosDasContasDeTeste() {
    console.log("Inicio da votação das contas")

    // for (var i = 0; i < myAddresses.length; i++) {

    let fromAddress = myAddresses[0];
    let toAddress = toAddresses[0];
    let pk = privatesKeys[0];

    var count;
    // get transaction count, later will used as nonce
    web3js.eth.getTransactionCount(fromAddress).then(function (v) {
        console.log("Count: " + v);
        count = v;

        var privateKey = Buffer.from(pk, 'hex');

        //creating raw transaction
        var rawTransaction = {
            "from": fromAddress, "gasPrice": web3js.utils.toHex(20 * 1e9), "gasLimit": web3js.utils.toHex(210000),
            "to": contractAddress, "value": "0x0", "data": contract.methods.vote(toAddress).encodeABI(),
            "nonce": 10000
        }
        console.log(rawTransaction);

        //creating transaction via ethereumjs-tx
        var transaction = new Tx(rawTransaction);
        //signing transaction with private key
        transaction.sign(privateKey);
        //sending transacton via web3js module
        web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('transactionHash', console.log);
    })

    // }

}

function aguarde(segundos) {
    for (i = 1; i <= segundos; i++) {
        console.log(".");
        var futuro = Date.now() + 1000
        while (Date.now() < futuro);
    }
}


// AssociarContasParaTeste();

// aguarde(5);

realizarVotosDasContasDeTeste();

app.listen(3000, () => console.log('Example app listening on port 3000!'))




