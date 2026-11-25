import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

try {
  const { render, getPageMeta, pagePaths, origin } = await server.ssrLoadModule('/src/prerender.tsx')
  const template = await readFile('dist/index.html', 'utf8')
  for (const pathname of [...pagePaths, '/404']) {
    const meta = getPageMeta(pathname)
    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(meta.description)}">`)
      .replace(/<link rel="canonical"[^>]*>/, meta.index ? `<link rel="canonical" href="${origin}${meta.path}">` : '<meta name="robots" content="noindex">')
      .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(meta.title)}">`)
      .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(meta.description)}">`)
      .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${origin}${meta.path}">`)
      .replace('<div id="root"></div>', () => `<div id="root">${render(pathname)}</div>`)
    const file = resolve('dist', pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pagePaths.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`)
  console.log(`Generated ${pagePaths.length} complete HTML pages, a 404 page and the sitemap.`)
} finally {
  await server.close()
}
