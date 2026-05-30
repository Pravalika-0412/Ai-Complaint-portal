import StatCard from './StatCard.jsx'

export default function StatisticsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total" value={stats.total} tone="slate" />
      <StatCard label="Pending" value={stats.pending} tone="coral" />
      <StatCard label="In Progress" value={stats.in_progress} tone="gold" />
      <StatCard label="Resolved" value={stats.resolved} tone="teal" />
    </div>
  )
}
