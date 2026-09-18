import { useState } from 'react'
import Logo from './Logo'
import { GATE_USERNAME, GATE_PASSWORD } from '../lib/authConfig'

const STORAGE_KEY = 'manobrax-auth'

function isUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function AuthGate({ children }) {
  const [unlocked, setUnlocked] = useState(isUnlocked)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (user.trim().toLowerCase() === GATE_USERNAME.toLowerCase() && pass === GATE_PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // sessionStorage indisponível (ex: modo privado) — segue liberado só nesta sessão em memória
      }
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[320px] flex flex-col gap-4">
        <Logo className="justify-center mb-2" />

        <div>
          <label htmlFor="gate-user" className="block text-[11px] font-medium text-secondary mb-1">
            Usuário
          </label>
          <input
            id="gate-user"
            autoFocus
            autoComplete="username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setError(false)
            }}
            className="w-full rounded-lg border-[0.5px] border-border bg-card px-3 py-2 text-[13px] text-ink outline-none focus:border-ink"
          />
        </div>

        <div>
          <label htmlFor="gate-pass" className="block text-[11px] font-medium text-secondary mb-1">
            Senha
          </label>
          <input
            id="gate-pass"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value)
              setError(false)
            }}
            className="w-full rounded-lg border-[0.5px] border-border bg-card px-3 py-2 text-[13px] text-ink outline-none focus:border-ink"
          />
        </div>

        {error && <p className="text-[12px] text-amber">Usuário ou senha incorretos.</p>}

        <button
          type="submit"
          className="rounded-lg bg-ink py-2 text-[13px] font-medium text-bg transition-opacity duration-150 hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
