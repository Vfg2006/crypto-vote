export class PessoaFisica {
    nome: string;
	tituloEleitoral: string;
	identidade: string;
	cpf: string;
    isCandidato: Boolean;
    impressaoDigital: string;
    contaBlockchain: string;
	dadosCandidato: {
		contaBlockchainCandidato: string;
		partido: string;
		numero: Number;
		cargo: string;
		fotoPath: string;
		vice: {
			nome: string;
			fotoPath: string;
        }
    }
}