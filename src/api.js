export const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Exercicio 3: erro proprio, com o status HTTP guardado
export class ApiError extends Error {
  constructor(status, statusText) {
    super(statusText || `Status ${status}`)
    this.name = 'ApiError'
    this.status = status
  }
}

// Funcao base: todas as chamadas passam por aqui
export async function requisicao(caminho, opcoes = {}) {
  // Exercicio 5: separa os headers da chamada para mesclar com o padrao
  // Exercicio 4: separa o signal para o AbortController
  const { headers: headersDaChamada, signal, ...resto } = opcoes

  const resposta = await fetch(`${BASE_URL}${caminho}`, {
    ...resto,
    signal,
    headers: { 'Content-Type': 'application/json', ...headersDaChamada },
  })

  if (!resposta.ok) {
    throw new ApiError(resposta.status, resposta.statusText)
  }
  return resposta.json()
}

export function apiGet(caminho, opcoes) {
  return requisicao(caminho, { ...opcoes, method: 'GET' })
}

export function apiPost(caminho, dados, opcoes) {
  return requisicao(caminho, {
    ...opcoes,
    method: 'POST',
    body: JSON.stringify(dados),
  })
}

export function apiPut(caminho, dados, opcoes) {
  return requisicao(caminho, {
    ...opcoes,
    method: 'PUT',
    body: JSON.stringify(dados),
  })
}

export function apiDelete(caminho, opcoes) {
  return requisicao(caminho, { ...opcoes, method: 'DELETE' })
}
