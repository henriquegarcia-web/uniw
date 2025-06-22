import axios from 'axios'
import { IBGECity, IBGEState, IViaCepResponse } from '@uniw/shared-types'

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

export const viacepService = {
  async getAddressByCep(cep: string): Promise<IViaCepResponse> {
    try {
      const cleanCep = cep.replace(/\D/g, '')
      const response = await axios.get<IViaCepResponse>(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      )
      return response.data
    } catch (error) {
      throw new Error('Erro ao buscar CEP')
    }
  },
}
