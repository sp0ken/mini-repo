import { ROUTES } from './routes.js'

const excluded = [
  '/panier',
  '/commande',
  '/recapitulatif',
  '/suivi-de-commande',
  '/matelas-ted',
  '/mentions-legales',
  '/trois-matelas',
  '/galerie',
  '/pub-tv',
  '/cgv',
  '/presse',
  '/it/carrello',
  '/it/ordine',
  '/it/grazie',
  '/it/tracking',
  '/it/materasso-ted',
  '/it/tre-materassi',
  '/it/galeria',
  '/it/video',
  '/it/condizioni-di-vendita',
  '/it/stampa',
  '/es/carrito',
  '/es/pedido',
  '/es/gracias',
  '/es/tracking',
  '/es/colchon-ted',
  '/es/tres-colchones',
  '/es/galeria',
  '/es/anuncio-tv',
  '/es/terminos-condiciones-cookies',
  '/es/prensa',
  '/shop-widget',
  '/es/shop-widget',
  '/it/shop-widget',
  '/literie/*',
  '/it/gamma/*',
  '/es/gama/*'
]
const excludedITRoutes = ROUTES.map((route) => `/it/${route}`)
const excludedESRoutes = ROUTES.map((route) => `/es/${route}`)
const excludedRoutes = excluded.concat(excludedITRoutes, excludedESRoutes)

export const SITEMAP = {
  hostname: 'https://www.tediber.com',
  exclude: excludedRoutes,
  i18n: 'fr'
}
