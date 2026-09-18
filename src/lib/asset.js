// Prefixa caminhos absolutos (ex: "/logo.png") com o base path do build,
// necessário quando o site é publicado num subcaminho (ex: GitHub Pages
// em usuario.github.io/repo/).
export function asset(path) {
  if (!path) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path}`
}
