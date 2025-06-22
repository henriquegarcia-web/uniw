import * as yup from 'yup'

export const contactSupportSchema = yup.object({
  subject: yup.string().required('O assunto é obrigatório.'),
  message: yup
    .string()
    .required('A mensagem é obrigatória.')
    .min(20, 'Sua mensagem deve ter pelo menos 20 caracteres.'),
  orderId: yup.string().optional(),
})
