// src/utils/validators.ts

// ─── Validador de CEP ───────────────────────────────────────────────────────

export function isValidCep(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '')
  return /^[0-9]{8}$/.test(cleaned)
}

// ─── Validador de E-mail ────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ─── Validador de CPF ───────────────────────────────────────────────────────

export function isValidCpf(cpf: string): boolean {
  if (!cpf) return false

  const cleanedCpf = cpf.replace(/\D/g, '')

  if (cleanedCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanedCpf)) {
    return false
  }

  let sum = 0
  let remainder: number

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i), 10) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cleanedCpf.substring(9, 10), 10)) {
    return false
  }

  sum = 0

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanedCpf.substring(i - 1, i), 10) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }
  if (remainder !== parseInt(cleanedCpf.substring(10, 11), 10)) {
    return false
  }

  return true
}
