import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { createComplaint } from '../services/api.js'

const initialForm = {
  name: '',
  email: '',
  location: '',
  description: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ComplaintForm() {
  const [form, setForm] = useState(initialForm)
  const [created, setCreated] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const validateForm = () => {
    if (form.name.trim().length < 2) return 'Name must be at least 2 characters.'
    if (!emailPattern.test(form.email.trim())) return 'Enter a valid email address.'
    if (form.location.trim().length < 2) return 'Location must be at least 2 characters.'
    if (form.description.trim().length < 8) return 'Complaint description must be at least 8 characters.'
    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')
    setCreated(null)
    try {
      // Send trimmed values so the backend stores clean citizen-submitted data.
      const response = await createComplaint({
        name: form.name.trim(),
        email: form.email.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
      })
      setCreated(response.data)
      setForm(initialForm)
    } catch (err) {
      setError(err.response?.data?.detail?.[0]?.msg || 'Unable to submit complaint. Please check the form.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Complaint</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Describe the civic issue clearly. The AI classifier will assign the right category automatically.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Name</span>
              <input className="field" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Email</span>
              <input className="field" type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Location</span>
              <input className="field" name="location" value={form.location} onChange={handleChange} required />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Complaint Description</span>
              <textarea className="field min-h-36 resize-y" name="description" value={form.description} onChange={handleChange} required />
            </label>
          </div>

          {error && <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-civic-teal px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <Send size={18} /> {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>

        <aside className="rounded border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold">AI Example</h2>
          <div className="mt-4 rounded bg-slate-100 p-4 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">Input</p>
            <p className="mt-1">Street light is not working near my house</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Output</p>
            <p className="mt-1 font-semibold text-civic-teal dark:text-civic-mint">Street Lights</p>
          </div>

          {created && (
            <div className="mt-6 rounded border border-civic-teal/30 bg-civic-teal/10 p-4 text-civic-teal dark:text-civic-mint">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 size={20} /> Complaint submitted
              </div>
              <p className="mt-3 text-sm">Complaint ID</p>
              <p className="text-2xl font-bold">{created.id}</p>
              <p className="mt-3 text-sm">AI Category: {created.category}</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
