pragma solidity ^0.4.17;

import "./TokenERC20.sol";

contract Vote is TokenERC20(0, "CryptoVote", "CPT") {

    struct Voter {
        string fingerprint;
        bool isCandidate;
        address candidate; // TODO Verificar importância
        bool voted;
    }

    mapping(address => Voter) public voters;

    constructor() public { }

    event Register(address _address, string fingerprint);
    event Vote(address _addressVoter, address _addressCandidate);

    /* Associa um eleitor a uma conta blockchain */

    function registerVoter(string _fingerprint, bool _isCandidate) public {
        address addressVoter = msg.sender;

        require(voters[addressVoter].candidate == 0x0);

        voters[addressVoter] = Voter(_fingerprint, _isCandidate, 0x0, false);
        balanceOf[addressVoter] = 1;

        emit Register(addressVoter, _fingerprint);
    }

    /* Tranferência de um token do eleitor para o candidato por meio de um voto */

    function vote(address addressCandidate) public {
        Voter storage sender = voters[msg.sender];

        require(!sender.voted, "Already voted.");

        require(!sender.isCandidate, "Is Candidate.");
        
        sender.voted = true;
        sender.candidate = addressCandidate;

        _transfer(msg.sender, addressCandidate, 1);

        emit Vote(msg.sender, addressCandidate);
    }
}