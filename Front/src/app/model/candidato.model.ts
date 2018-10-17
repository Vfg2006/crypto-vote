export interface Candidato {
  contaBlockchain: string
  numero: number
  nome: string
  partido: string
  cargo: string
  fotoPath: string
  vice: {
    nome: string
    fotoPath: string
  }
}