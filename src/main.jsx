import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LanguageProvider from './components/LanguageProvider'
import { removeSplash } from './splash'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* basename tracks Vite's base, so the router's paths sit under the same
        /<repo>/ prefix the assets do. It is '/' on a root deploy. */}
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
)

removeSplash()
