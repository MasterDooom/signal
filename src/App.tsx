import { Dashboard } from './components/dashboard/Dashboard'
import './index.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <a className="wordmark" href="/" aria-label="Signal home">
            <span className="wordmark-mark" aria-hidden="true">
              <span />
            </span>
            <span className="wordmark-name">Signal</span>
          </a>
          <nav className="app-nav" aria-label="Primary">
            <span className="app-nav-item is-current">Overview</span>
            <span className="app-nav-item">Inbox</span>
            <span className="app-nav-item">Documents</span>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
