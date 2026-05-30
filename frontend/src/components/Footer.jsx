import { ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-civic-teal" />
          <span>AI Smart Complaint Portal</span>
        </div>
        <p>Built for faster civic complaint routing and transparent resolution.</p>
      </div>
    </footer>
  )
}
