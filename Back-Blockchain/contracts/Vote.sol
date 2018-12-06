pragma solidity ^0.4.17;

import "./TokenERC20.sol";

contract Vote is TokenERC20(0, "CryptoVote", "CPT") {

    struct Voter {
        string fingerprint;
        address candidate; // TODO Verificar importância
        bool voted;
    }

    mapping(address => Voter) public voters;
    mapping(string => address) private addresses;

    constructor() public { }

    event Register(address _address, string fingerprint);
    event VoteConfirmed(address _addressVoter, address _addressCandidate, uint128 _token);

    /* Associa um eleitor a uma conta blockchain */

    function registerVoter(string _fingerprint) public {
        address addressVoter = msg.sender;
        bytes memory fingerprint = bytes(_fingerprint);

        require(fingerprint.length != 0, "Missing fingerprint");

        require(addresses[_fingerprint] == 0x0, "fingerprint already associated");

        require(voters[addressVoter].candidate == 0x0, "has an associate candidate");

        voters[addressVoter] = Voter(_fingerprint, 0x0, false);
        addresses[_fingerprint] = addressVoter;
        balanceOf[addressVoter] = 1;

        emit Register(addressVoter, _fingerprint);
    }

    /* Tranferência de um token do eleitor para o candidato por meio de um voto */

    function vote(address addressCandidate) public {
        Voter storage sender = voters[msg.sender];

        require(!sender.voted, "Already voted.");

        sender.voted = true;
        sender.candidate = addressCandidate;

        _transfer(msg.sender, addressCandidate, 1);

        emit VoteConfirmed(msg.sender, addressCandidate, 1);
    }

    /* Valida a digital passada com o endereço blockchain selecionado no metamask */

    function validaDigital(string fingerprint) public view returns (bool) {
        address addressVoter = msg.sender;
        
        if(addressVoter == addresses[fingerprint])
            return true;

        return false;
    }
}