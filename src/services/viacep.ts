// src/services/viacep.ts

import axios from 'axios'

interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export const viacepService = {
  async getAddressByCep(cep: string): Promise<ViaCepResponse> {
    try {
      const cleanCep = cep.replace(/\D/g, '')
      const response = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      )
      return response.data
    } catch (error) {
      throw new Error('Erro ao buscar CEP')
    }
  }
}
