// ─── Busca de Dados de CEP via ViaCEP ──────────────────────────────────────

import { IViaCepResponse } from '@uniw/shared-types'

/**
 * Realiza a consulta do endereço correspondente a um CEP usando a API ViaCEP.
 * Retorna null se o CEP for inválido ou se ocorrer erro.
 */
export async function fetchCepData(cep: string): Promise<IViaCepResponse | null> {
  const cleaned = cep.replace(/\D/g, '')

  if (cleaned.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`)
    const data = (await res.json()) as IViaCepResponse

    if (data.erro) return null

    return data
  } catch (err) {
    console.error('Erro ao buscar CEP:', err)
    return null
  }
}
