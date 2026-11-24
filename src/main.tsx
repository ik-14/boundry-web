import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/site.css'
import './styles/motion.css'
import './styles/cards.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
