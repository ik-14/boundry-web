import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/site.css'
import './styles/motion.css'
import './styles/cards.css'
import './styles/navigation.css'
import './styles/pages.css'
import './styles/brands.css'
import App from './App'
import { getPageMeta, origin } from './routes'

const pathname = window.location.pathname
const meta = getPageMeta(pathname)
document.title = meta.title
document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${origin}${meta.path}`)
const root = document.getElementById('root')!
const app = <StrictMode><App pathname={pathname} /></StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
