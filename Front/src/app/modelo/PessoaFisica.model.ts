export class PessoaFisica {
    nome: string
    tituloEleitoral: string
    identidade: string
    cpf: string
    impressaoDigital: string
    isCandidato: boolean
    contaBlockchain: string
    partido: string
    numero: number
    cargo: string
    fotoPath: string
    vice: {
        nome: string
        fotoPath: string
    }
}