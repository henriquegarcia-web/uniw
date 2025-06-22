// src/services/viacep.ts

import axios from 'axios'
import { IViaCepResponse } from '@uniw/shared-types'

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
