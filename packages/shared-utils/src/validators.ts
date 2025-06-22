// src/utils/validators.ts

// ─── Validador de CEP ───────────────────────────────────────────────────────

export function isValidCep(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '')
  return /^[0-9]{8}$/.test(cleaned)
}

// ─── Validador de E-mail ────────────────────────────────────────────────────

// export function isValidEmail(email: string): boolean {
//   if (!email) return false
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }

export function isValidEmail(email: string): boolean {
  if (!email) return false
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(String(email).toLowerCase())
}

// ─── Validador de Telefone ──────────────────────────────────────────────────

// export function isValidPhone(phone: string): boolean {
//   if (!phone) return false
//   const cleaned = phone.replace(/\D/g, '')
//   return cleaned.length === 10 || cleaned.length === 11
// }

export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  const cleaned = phone.replace(/\D/g, '')
  // Verifica se o DDD é válido (de 11 a 99)
  const ddd = parseInt(cleaned.substring(0, 2), 10)
  if (ddd < 11 || ddd > 99) return false

  return cleaned.length === 10 || cleaned.length === 11
}

// ─── Validador de Nome ──────────────────────────────────────────────────────

export function isValidName(name: string): boolean {
  if (!name || name.trim().length < 3) return false
  // Verifica se contém pelo menos duas palavras e apenas letras/espaços
  const nameParts = name.trim().split(' ')
  const nameRegex = /^[a-zA-Z\u00C0-\u017F´ ]+$/ // Suporte a acentos
  return nameParts.length >= 2 && nameRegex.test(name)
}

// ─── Validador de Data de Nasc. ─────────────────────────────────────────────

export function isValidBirthDate(dateStr: string): boolean {
  if (!dateStr || !/^\d{2}\/\d{4}$/.test(dateStr)) return false

  const [day, month, year] = dateStr.split('/').map(Number)

  const date = new Date(year, month - 1, day)

  // Valida se a data é real (evita overflow, ex: 31/04 virando 01/05)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false
  }

  // Valida se a data não está no futuro
  if (date > new Date()) {
    return false
  }

  return true
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

// ─── Validador de CNPJ ────────────────────────────────────────────────────────

export function isValidCnpj(cnpj: string): boolean {
  if (!cnpj) return false

  const cleanedCnpj = cnpj.replace(/\D/g, '')

  if (cleanedCnpj.length !== 14 || /^(\d)\1{13}$/.test(cleanedCnpj)) {
    return false
  }

  let length = cleanedCnpj.length - 2
  let numbers = cleanedCnpj.substring(0, length)
  const digits = cleanedCnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false
  }

  length = length + 1
  numbers = cleanedCnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false
  }

  return true
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

// ─── Validadores de Segurança e Autenticação ────────────────────────────────

export function isValidPassword(password: string): boolean {
  if (!password) return false

  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}
