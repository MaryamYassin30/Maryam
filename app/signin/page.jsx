'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SignInPage() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    setMsg('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMsg('Check your email for confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setMsg('Signed in successfully!')
      }
    } catch (error) {
      setErr(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl mb-4">
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {err && <p className="text-red-500 mt-2">{err}</p>}
      {msg && <p className="text-green-500 mt-2">{msg}</p>}

      <div className="mt-4">
        {mode === 'signin' ? (
          <button className="underline" onClick={() => setMode('signup')}>
            Need an account? Sign up
          </button>
        ) : (
          <button className="underline" onClick={() => setMode('signin')}>
            Already have an account? Sign in
          </button>
        )}
      </div>
    </main>
  )
}
