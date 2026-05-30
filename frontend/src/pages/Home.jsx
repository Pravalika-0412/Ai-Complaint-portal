import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, BrainCircuit, Clock3 } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import StatCard from '../components/StatCard.jsx'
import StatisticsCards from '../components/StatisticsCards.jsx'
import { getStats } from '../services/api.js'

export default function Home() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    categories: {},
  })

  useEffect(() => {
    getStats().then((response) => setStats(response.data)).catch(() => {})
  }, [])

  const chartData = Object.entries(stats.categories).map(([name, value]) => ({ name, value }))

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(22,125,127,0.14),transparent_38%,rgba(242,184,75,0.16))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded border border-civic-teal/30 bg-civic-teal/10 px-3 py-1 text-sm font-semibold text-civic-teal dark:text-civic-mint">
              CivicTech Hackathon Project
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 dark:text-white sm:text-5xl">
              AI Smart Complaint Portal
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              A responsive civic grievance platform where citizens submit complaints, AI classifies them, and administrators track resolution progress from one dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/submit"
                className="inline-flex items-center justify-center gap-2 rounded bg-civic-teal px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
              >
                Submit Complaint <ArrowRight size={18} />
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center justify-center rounded border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Track Complaint
              </Link>
            </div>
          </div>
          <div className="grid content-end gap-4">
            <div className="rounded border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-civic-teal" />
                <div>
                  <p className="font-semibold">AI categorization</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Road, water, electricity, garbage, street lights, and more.</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatCard label="Total" value={stats.total} tone="teal" />
                <StatCard label="Resolved" value={stats.resolved} tone="gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold">About Project</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            The portal reduces manual sorting by classifying complaint descriptions automatically, generating a unique complaint ID, and keeping citizens informed through tracking.
          </p>
          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <Clock3 size={20} className="text-civic-coral" /> Faster routing to departments
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
              <BarChart3 size={20} className="text-civic-gold" /> Analytics for admin decisions
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <StatisticsCards stats={stats} />
          <div className="mt-6 h-80 rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#167D7F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  )
}
