import { useState } from 'react'
import { Search } from 'lucide-react'
import ComplaintCard from '../components/ComplaintCard.jsx'
import { getComplaint } from '../services/api.js'

export default function TrackComplaint() {
  const [id, setId] = useState('')
  const [complaint, setComplaint] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    setError('')
    setComplaint(null)
    try {
      const response = await getComplaint(id.trim())
      setComplaint(response.data)
    } catch {
      setError('Complaint not found. Please verify the complaint ID.')
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Track Complaint</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Enter the unique complaint ID generated after submission.</p>

      <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-3 rounded border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
        <input
          className="field flex-1"
          placeholder="Example: CMP-1A2B3C4D"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />
        <button className="inline-flex items-center justify-center gap-2 rounded bg-civic-teal px-5 py-3 font-semibold text-white hover:bg-teal-700">
          <Search size={18} /> Search
        </button>
      </form>

      {error && <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>}

      {complaint && <div className="mt-6"><ComplaintCard complaint={complaint} /></div>}
    </main>
  )
}
