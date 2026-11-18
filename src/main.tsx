import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    const { error } = this.state
    if (error) {
      return (
        <div style={{ fontFamily: 'monospace', padding: '32px', color: '#dc2626', background: '#fff1f1', minHeight: '100vh' }}>
          <strong style={{ fontSize: 18 }}>Runtime Error</strong>
          <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap', fontSize: 13 }}>{(error as Error).message}</pre>
          <pre style={{ marginTop: 8, whiteSpace: 'pre-wrap', fontSize: 11, color: '#64748b' }}>{(error as Error).stack}</pre>
          <button onClick={() => { localStorage.clear(); location.reload() }} style={{ marginTop: 20, padding: '8px 16px', cursor: 'pointer' }}>
            Bersihkan data &amp; muat ulang
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
