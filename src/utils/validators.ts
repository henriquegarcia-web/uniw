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

// ─── Validador de Telefone ──────────────────────────────────────────────────

export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length === 10 || cleaned.length === 11
}

// ─── Validador de Data de Validade ──────────────────────────────────────────

export function isValidExpiryDate(expiryDate: string): boolean {
  if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return false
  }

  const [monthStr, yearStr] = expiryDate.split('/')
  const month = parseInt(monthStr, 10)
  const year = parseInt(`20${yearStr}`, 10)
  if (month < 1 || month > 12) {
    return false
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  if (year < currentYear) {
    return false
  }

  if (year === currentYear && month < currentMonth) {
    return false
  }

  return true
}

// ─── Validador de Num. de Cartão de Crédito ─────────────────────────────────

export function isValidCreditCard(cardNumber: string): boolean {
  if (!cardNumber) return false

  const cleanedCardNumber = cardNumber.replace(/\D/g, '')

  if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
    return false
  }

  let sum = 0
  let isSecondDigit = false

  for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedCardNumber.charAt(i), 10)

    if (isSecondDigit) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isSecondDigit = !isSecondDigit
  }

  return sum % 10 === 0
}
