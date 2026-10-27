import { useEffect, useState } from 'react'
import App from './App.jsx'

// Usado so para testar o exercicio 4: monta o App e desmonta logo em
// seguida, no meio da carga inicial. O console deve ficar sem warnings.
function TesteAbort() {
  const [mostrar, setMostrar] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setMostrar(false), 5)
    return () => clearTimeout(timer)
  }, [])

  return mostrar ? <App /> : <p>App desmontado. Veja o console: sem warnings.</p>
}

export default TesteAbort
