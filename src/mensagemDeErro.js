import { ApiError } from './api'

// Transforma qualquer erro numa mensagem para mostrar na tela
export function mensagemDeErro(erro) {
  if (erro instanceof ApiError) {
    if (erro.status === 404) return 'Recurso não encontrado'
    if (erro.status === 500) return 'Erro no servidor'
    return `Erro ${erro.status}`
  }
  // Quando a rede cai, o fetch lanca TypeError: Failed to fetch
  if (erro instanceof TypeError) return 'Falha de rede'
  return erro.message
}
