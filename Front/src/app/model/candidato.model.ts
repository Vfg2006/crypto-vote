export class Candidato {
  contaBlockchain: string
  numero: number
  nome: string
  partido: string
  cargo: string
  fotoPath: any
  vice: {
    nome: string
    fotoPath: any
  }

  constructor(contaBlockchain: string, numero: number, nome: string, 
              partido: string, cargo: string, fotoPath: string, vice: object) {

  }
}