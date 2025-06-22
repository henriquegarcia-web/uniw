// ─── Tipagem da Resposta da API ViaCEP ──────────────────────────────────────

/**
 * Representa o formato de resposta da API https://viacep.com.br/ws/[cep]/json/
 */
export interface IViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}
