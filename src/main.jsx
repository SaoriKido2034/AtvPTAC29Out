import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Para testar o exercicio 4 (desmontar no meio da carga), troque por:
// import App from './TesteAbort.jsx'
// StrictMode foi removido de proposito: em modo dev ele roda o useEffect
// duas vezes e as requisicoes apareceriam duplicadas no Network.
createRoot(document.getElementById('root')).render(<App />)
