import { useEffect, useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import ComplaintCard from '../components/ComplaintCard.jsx'
import StatisticsCards from '../components/StatisticsCards.jsx'
import { getComplaints, getStats, updateComplaint } from '../services/api.js'

const categories = ['All', 'Road Damage', 'Water Supply', 'Electricity', 'Garbage', 'Street Lights', 'Others']
const statuses = ['All', 'Pending', 'In Progress', 'Resolved']
const colors = ['#167D7F', '#F2B84B', '#E86952', '#4F46E5', '#14B8A6', '#64748B']

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, resolved: 0, categories: {} })
  const [filters, setFilters] = useState({ category: 'All', status: 'All' })
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const [complaintsResponse, statsResponse] = await Promise.all([
        getComplaints(filters),
        getStats(),
      ])
      setComplaints(complaintsResponse.data)
      setStats(statsResponse.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [filters.category, filters.status])

  const chartData = useMemo(
    () => Object.entries(stats.categories).map(([name, value]) => ({ name, value })),
    [stats.categories],
  )

  const handleStatusUpdate = async (id, status) => {
    await updateComplaint(id, status)
    loadData()
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">View, filter, analyze, and update civic complaints.</p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="mt-8">
        <StatisticsCards stats={stats} />
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold">Category Analytics</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={95} label>
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold">Filters</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Category</span>
              <select className="field" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Status</span>
              <select className="field" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mt-8 hidden overflow-hidden rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-100 dark:bg-slate-950">
              <tr>
                {['ID', 'Citizen', 'Location', 'Category', 'Status', 'Created', 'Action'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-normal text-slate-500">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-4 py-4 text-sm font-semibold">{complaint.id}</td>
                  <td className="px-4 py-4 text-sm">{complaint.name}<br /><span className="text-slate-500">{complaint.email}</span></td>
                  <td className="px-4 py-4 text-sm">{complaint.location}</td>
                  <td className="px-4 py-4 text-sm">{complaint.category}</td>
                  <td className="px-4 py-4 text-sm">{complaint.status}</td>
                  <td className="px-4 py-4 text-sm">{new Date(complaint.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-sm">
                    <select className="field min-w-36" value={complaint.status} onChange={(event) => handleStatusUpdate(complaint.id, event.target.value)}>
                      {statuses.filter((status) => status !== 'All').map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {complaints.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-10 text-center text-slate-500">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:hidden">
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
            statuses={statuses.filter((status) => status !== 'All')}
            onStatusChange={handleStatusUpdate}
          />
        ))}
        {complaints.length === 0 && (
          <div className="rounded border border-slate-200 bg-white px-4 py-10 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900">
            No complaints found.
          </div>
        )}
      </section>
    </main>
  )
}
