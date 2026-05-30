export default function StatCard({ label, value, tone = 'teal' }) {
  const tones = {
    teal: 'border-civic-teal/30 bg-civic-teal/10 text-civic-teal',
    gold: 'border-civic-gold/40 bg-civic-gold/15 text-amber-700 dark:text-civic-gold',
    coral: 'border-civic-coral/30 bg-civic-coral/10 text-civic-coral',
    slate: 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
  }

  return (
    <div className={`rounded border p-5 ${tones[tone]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  )
}
