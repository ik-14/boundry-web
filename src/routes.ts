import { sectors } from './data/sectors'

export const origin = 'https://tryboundry.com'
export const pagePaths = ['/', ...sectors.map(sector => `/sectors/${sector.slug}`), '/for-insurers']

export function getPageMeta(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const sector = sectors.find(item => path === `/sectors/${item.slug}`)
  if (sector) return { title: `${sector.name} Insurance | Boundry`, description: sector.metaDescription, path, index: true }
  if (path === '/for-insurers') return {
    title: 'AI Risk Assessment & Opportunities for Insurers | Boundry',
    description: 'Partner with Boundry to source physical and digital AI opportunities and turn system design, testing and safeguards into clear underwriting evidence.',
    path, index: true,
  }
  if (path === '/') return {
    title: 'Boundry | Insurance for physical and digital AI',
    description: 'Boundry assesses AI software, robots and intelligent hardware, helping insurers understand the risk and companies make the case for cover.',
    path, index: true,
  }
  return { title: 'Page not found | Boundry', description: 'Explore insurance and technical risk assessment for physical and digital AI with Boundry.', path, index: false }
}
