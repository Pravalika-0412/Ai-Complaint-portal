const statusStyles = {
  Pending: 'bg-civic-coral/10 text-civic-coral border-civic-coral/30',
  'In Progress': 'bg-civic-gold/15 text-amber-700 border-civic-gold/40 dark:text-civic-gold',
  Resolved: 'bg-civic-teal/10 text-civic-teal border-civic-teal/30 dark:text-civic-mint',
}

export default function ComplaintCard({ complaint, onStatusChange, statuses = [] }) {
  return (
    <article className="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Complaint ID</p>
          <h3 className="mt-1 font-bold text-slate-950 dark:text-white">{complaint.id}</h3>
        </div>
        <span className={`w-fit rounded border px-3 py-1 text-xs font-semibold ${statusStyles[complaint.status] || statusStyles.Pending}`}>
          {complaint.status}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">Citizen</dt>
          <dd className="font-medium">{complaint.name}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Location</dt>
          <dd className="font-medium">{complaint.location}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Category</dt>
          <dd className="font-medium">{complaint.category}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Created</dt>
          <dd className="font-medium">{new Date(complaint.created_at).toLocaleDateString()}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{complaint.description}</p>

      {onStatusChange && (
        <label className="mt-4 grid gap-2">
          <span className="text-sm font-semibold">Update Status</span>
          <select className="field" value={complaint.status} onChange={(event) => onStatusChange(complaint.id, event.target.value)}>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      )}
    </article>
  )
}
