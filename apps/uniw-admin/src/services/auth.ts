import { auth, db } from '@/libs/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { ref, set, get } from 'firebase/database'
import { setCookie, deleteCookie } from 'cookies-next'

import { UserRole, UserStatus, IBaseProfile } from '@uniw/shared-types'

// ─── Tipagens ───────────────────────────────────────────────────────────────

interface AuthCredentials {
  email: string
  password: string
}

interface RegisterParceiro {
  role: UserRole.PARCEIRO
  nome: string
  email: string
  telefone: string
  password: string
  cpf: string
  dataNascimento: number
  nomeLoja: string
  cnpjOuCpf: string
  endereco: string
}

interface RegisterFornecedor {
  role: UserRole.FORNECEDOR
  nome: string
  email: string
  telefone: string
  password: string
  cpf: string
  dataNascimento: number
  nomeEmpresa: string
}

// ─── Login ──────────────────────────────────────────────────────────────────

export async function loginUser({ email, password }: AuthCredentials) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const uid = cred.user.uid
  const userBaseSnap = await get(ref(db, `usuarios/${uid}`))

  if (!userBaseSnap.exists()) throw new Error('Usuário base não encontrado')

  const baseUser = userBaseSnap.val()
  const role = baseUser.role as UserRole

  let extraData = {}

  if (role === UserRole.PARCEIRO) {
    const parceiroSnap = await get(ref(db, `parceiros/${uid}`))
    extraData = parceiroSnap.exists() ? parceiroSnap.val() : {}
  }

  if (role === UserRole.FORNECEDOR) {
    const fornecedorSnap = await get(ref(db, `fornecedores/${uid}`))
    extraData = fornecedorSnap.exists() ? fornecedorSnap.val() : {}
  }

  if (role === UserRole.ADMINISTRADOR) {
    const adminSnap = await get(ref(db, `admins/${uid}`))
    extraData = adminSnap.exists() ? adminSnap.val() : {}
  }

  const token = await cred.user.getIdToken()
  // Os cookies são necessários para o Middleware (que roda no servidor) validar a sessão.
  setCookie('token', token)
  setCookie('role', role)

  return {
    ...baseUser,
    ...extraData,
  }
}

// ─── Registrar Usuário ──────────────────────────────────────────────────────

export async function registerUser(data: RegisterParceiro | RegisterFornecedor) {
  // const { email, password, nome, telefone, cpf, dataNascimento, role } = data
  // const cred = await createUserWithEmailAndPassword(auth, email, password)
  // const uid = cred.user.uid
  // const now = Date.now()
  // const baseUser: IBaseProfile = {
  //   id: uid,
  //   nome,
  //   email,
  //   telefone,
  //   cpf,
  //   dataNascimento,
  //   role,
  //   status: UserStatus.PENDENTE,
  //   createdAt: now,
  //   updatedAt: now,
  //   isActive: true,
  // }
  // await set(ref(db, `usuarios/${uid}`), baseUser)
  // if (role === UserRole.PARCEIRO) {
  //   const { nomeLoja, cnpjOuCpf, endereco } = data
  //   await set(ref(db, `parceiros/${uid}`), {
  //     id: uid,
  //     lojaId: uid,
  //     nomeLoja,
  //     cnpjOuCpf,
  //     endereco,
  //     redesSociais: [],
  //     colaboradores: [],
  //     clientesCadastrados: [],
  //     meiosPagamento: [],
  //     aprovado: false,
  //     faturamentoUltimos30Dias: 0,
  //   })
  // }
  // if (role === UserRole.FORNECEDOR) {
  //   const { nomeEmpresa } = data
  //   await set(ref(db, `fornecedores/${uid}`), {
  //     id: uid,
  //     nomeEmpresa,
  //     produtosCadastrados: [],
  //     visibilidadePublica: true,
  //     lojistasRelacionados: [],
  //     sorteiosAtivos: [],
  //   })
  // }
  // return await loginUser({ email, password })
}

// ─── Logout ─────────────────────────────────────────────────────────────────

export async function logoutUser() {
  await signOut(auth)
  // Limpa os cookies no logout para invalidar a sessão no servidor
  deleteCookie('token')
  deleteCookie('role')
}

// ─── Reset de Senha ─────────────────────────────────────────────────────────

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email)
}

// ─── Obter Usuário Atual ────────────────────────────────────────────────────

export async function getCurrentUser() {
  const user = auth.currentUser
  if (!user) return null

  const uid = user.uid
  const baseSnap = await get(ref(db, `usuarios/${uid}`))
  if (!baseSnap.exists()) return null

  const base = baseSnap.val()
  const role = base.role as UserRole

  let roleData = {}

  if (role === UserRole.PARCEIRO) {
    const snap = await get(ref(db, `parceiros/${uid}`))
    roleData = snap.exists() ? snap.val() : {}
  }

  if (role === UserRole.FORNECEDOR) {
    const snap = await get(ref(db, `fornecedores/${uid}`))
    roleData = snap.exists() ? snap.val() : {}
  }

  if (role === UserRole.ADMINISTRADOR) {
    const snap = await get(ref(db, `admins/${uid}`))
    roleData = snap.exists() ? snap.val() : {}
  }

  return {
    ...base,
    ...roleData,
  }
}
