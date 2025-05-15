import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Importamos el Provider que has creado
import { ActuaProvider } from './context/ActuaContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActuaProvider>
      <App />
    </ActuaProvider>
  </React.StrictMode>
)
