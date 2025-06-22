// ─── Validador de CEP ───────────────────────────────────────────────────────

export function isValidCep(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '')
  return /^[0-9]{8}$/.test(cleaned)
}
