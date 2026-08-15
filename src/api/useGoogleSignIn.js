import { useEffect, useRef } from 'react'

/**
 * Wraps Google Identity Services (loaded via the <script> tag in index.html) so any
 * page can trigger "Sign in with Google" from its own custom-styled button.
 *
 * onCredential(idToken) is called with the Google ID token once the person completes
 * the Google flow - the caller is responsible for sending that token to the backend's
 * POST /api/auth/google endpoint.
 *
 * Requires VITE_GOOGLE_CLIENT_ID to be set (see .env.development / .env.production).
 */
export function useGoogleSignIn(onCredential) {
  const initialized = useRef(false)
  const callbackRef = useRef(onCredential)
  callbackRef.current = onCredential

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.warn('VITE_GOOGLE_CLIENT_ID is not set - "Continue with Google" will not work yet.')
      return
    }

    let cancelled = false

    const init = () => {
      if (cancelled || initialized.current) return
      if (!window.google?.accounts?.id) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => callbackRef.current(response.credential),
      })
      initialized.current = true
    }

    // The GSI script loads async; poll briefly until window.google is ready.
    if (window.google?.accounts?.id) {
      init()
    } else {
      const interval = setInterval(init, 150)
      setTimeout(() => clearInterval(interval), 10000)
      return () => {
        cancelled = true
        clearInterval(interval)
      }
    }
  }, [])

  const trigger = () => {
    if (!window.google?.accounts?.id) {
      console.error('Google Identity Services has not loaded yet - try again in a moment.')
      return
    }
    window.google.accounts.id.prompt()
  }

  return { trigger }
}