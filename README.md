# CRUD com api.js (React + Vite)

## Como rodar
```bash
npm install
npm run dev
```

## Onde está cada exercício
| Exercício | Onde |
|-----------|------|
| 1 | `src/api.js` (BASE_URL, requisicao, apiGet, apiPost, apiPut, apiDelete) |
| 2 | `src/App.jsx` e `src/components/` (nenhum `fetch(` fora do `api.js`) |
| 3 | `ApiError` em `src/api.js` + `src/mensagemDeErro.js` |
| 4 | `useEffect` do `src/App.jsx` com `signal` (teste: `src/TesteAbort.jsx`) |
| 5 | `requisicao` mescla `headers`; `criarUsuario` envia `X-Custom: aula07` |

## Como testar cada erro (Exercício 3)
- **404:** troque `apiGet('/users', ...)` por `apiGet('/usuarios', ...)` no `App.jsx`.
- **500:** crie um usuário com "Novo" e depois tente editá-lo (o PUT em id maior que 10 dá 500).
- **Falha de rede:** com a página carregada, DevTools > Network > Throttling > Offline e clique em "Excluir".

## Exercício 5
Clique em "Novo", salve e veja no DevTools > Network a requisição POST:
os Request Headers mostram `Content-Type: application/json` e `X-Custom: aula07`.
