import { renderToString } from 'react-dom/server'
import App from './App'
export { getPageMeta, pagePaths, origin } from './routes'

export function render(pathname: string) {
  return renderToString(<App pathname={pathname} />)
}
