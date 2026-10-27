import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from './api'
import { mensagemDeErro } from './mensagemDeErro'
import ListaUsuarios from './components/ListaUsuarios.jsx'
import FormUsuario from './components/FormUsuario.jsx'

// CRUD da Aula 06 refatorada: nenhuma chamada direta de rede aqui,
// tudo passa pelo api.js
function App() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroLista, setErroLista] = useState(null)
  const [form, setForm] = useState(null) // null = fechado | 'novo' | usuario em edicao

  // Exercicio 4: useEffect com signal
  useEffect(() => {
    const controller = new AbortController()

    async function carregarUsuarios() {
      try {
        const dados = await apiGet('/users', { signal: controller.signal })
        console.log('apiGet /users:', dados) // Exercicio 1: confere a lista
        setUsuarios(dados)
      } catch (e) {
        // AbortError nao e erro de verdade: nunca vira mensagem na tela
        if (e.name === 'AbortError') return
        setErroLista(mensagemDeErro(e))
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }
    carregarUsuarios()

    return () => controller.abort()
  }, [])

  async function criarUsuario(dados) {
    // Exercicio 5: header extra, mesclado com o Content-Type padrao
    const novo = await apiPost('/users', dados, {
      headers: { 'X-Custom': 'aula07' },
    })
    // O JSONPlaceholder sempre devolve id 11, entao garantimos um id unico
    setUsuarios((atual) => {
      const id = atual.some((u) => u.id === novo.id)
        ? Math.max(...atual.map((u) => u.id)) + 1
        : novo.id
      return [...atual, { ...novo, id }]
    })
    setForm(null)
  }

  async function editarUsuario(id, dados) {
    const atualizado = await apiPut(`/users/${id}`, { ...dados, id })
    setUsuarios((atual) => atual.map((u) => (u.id === id ? atualizado : u)))
    setForm(null)
  }

  async function excluirUsuario(id) {
    await apiDelete(`/users/${id}`)
    setUsuarios((atual) => atual.filter((u) => u.id !== id))
  }

  return (
    <div>
      <h1>CRUD de usuários</h1>
      <button onClick={() => setForm('novo')}>Novo</button>

      {form && (
        <FormUsuario
          key={form === 'novo' ? 'novo' : form.id}
          usuarioInicial={form === 'novo' ? null : form}
          onSalvar={
            form === 'novo' ? criarUsuario : (dados) => editarUsuario(form.id, dados)
          }
          onCancelar={() => setForm(null)}
        />
      )}

      {carregando && <p>Carregando...</p>}
      {erroLista && <p>Erro: {erroLista}</p>}

      <ListaUsuarios
        usuarios={usuarios}
        onEditar={setForm}
        onExcluir={excluirUsuario}
      />
    </div>
  )
}

export default App
