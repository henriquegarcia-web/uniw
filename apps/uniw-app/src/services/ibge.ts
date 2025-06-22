// src/services/ibge.ts

import axios from 'axios'
import { IBGECity, IBGEState } from '@uniw/shared-types'

export const ibgeService = {
  async getStates(): Promise<IBGEState[]> {
    try {
      const response = await axios.get<IBGEState[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      const data = response.data
      return data.sort((a, b) => a.nome.localeCompare(b.nome))
    } catch (error) {
      console.error('Erro ao buscar estados:', error)
      throw new Error('Não foi possível buscar a lista de estados.')
    }
  },

  async getCitiesByState(stateSigla: string): Promise<IBGECity[]> {
    try {
      const response = await axios.get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSigla}/municipios`,
      )
      const data = response.data
      return data.sort((a, b) => a.nome.localeCompare(b.nome))
    } catch (error) {
      console.error(`Erro ao buscar cidades para o estado ${stateSigla}:`, error)
      throw new Error('Não foi possível buscar a lista de cidades.')
    }
  },
}
