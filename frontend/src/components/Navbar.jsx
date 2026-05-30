import { Link, NavLink } from 'react-router-dom'
import { Moon, ShieldCheck, Sun } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/submit', label: 'Submit' },
  { to: '/track', label: 'Track' },
  { to: '/admin', label: 'Admin' },
]

export default function Navbar({ darkMode, onToggleDarkMode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded bg-civic-teal text-white">
            <ShieldCheck size={20} />
          </span>
          <span>AI Smart Complaint Portal</span>
        </Link>
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 rounded border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900 sm:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-white text-civic-teal shadow-sm dark:bg-slate-800 dark:text-civic-mint'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
      <div className="flex border-t border-slate-200 dark:border-slate-800 sm:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex-1 px-2 py-3 text-center text-sm font-medium ${
                isActive
                  ? 'text-civic-teal dark:text-civic-mint'
                  : 'text-slate-600 dark:text-slate-300'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
