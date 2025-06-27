declare module '@uniw/shared-utils' {
  // Validators
  export function isValidCep(cep: string): boolean
  export function isValidEmail(email: string): boolean
  export function isValidPhone(phone: string): boolean
  export function isValidName(name: string): boolean
  export function isValidBirthDate(dateStr: string): boolean
  export function isValidCpf(cpf: string): boolean
  export function isValidCnpj(cnpj: string): boolean
  export function isValidExpiryDate(expiryDate: string): boolean
  export function isValidCreditCard(cardNumber: string): boolean
  export function isValidPassword(password: string): boolean

  // Masks
  export function maskCep(value: string): string
  export function maskCpf(value: string): string
  export function maskCnpj(value: string): string
  export function maskPhone(value: string): string
  export function maskDate(value: string): string
  export function maskExpiryDate(value: string): string
  export function maskCreditCard(value: string): string

  // Firebase errors
  export function translateFirebaseError(errorCode: string): string
}
