import type { WorkloadPressure } from '../../types/task'

type WorkloadCounts = Record<WorkloadPressure, number>

type WorkloadOverviewProps = {
  counts: WorkloadCounts
}

const ROWS: { key: WorkloadPressure; label: string; hint: string }[] = [
  { key: 'low', label: 'Manageable', hint: 'Low pressure' },
  { key: 'moderate', label: 'Building up', hint: 'Moderate' },
  { key: 'high', label: 'Leaning on you', hint: 'High pressure' },
]

function supportLine(counts: WorkloadCounts): string {
  if (counts.high >= 2) return 'A couple of items are already leaning on you.'
  if (counts.high === 1) return 'One item is starting to lean on you.'
  if (counts.moderate > 0) return 'Mostly manageable, with a few things heating up.'
  return 'The load is still light. Keep it that way.'
}

export function WorkloadOverview({ counts }: WorkloadOverviewProps) {
  const total = counts.low + counts.moderate + counts.high
  const max = Math.max(counts.low, counts.moderate, counts.high, 1)

  return (
    <section className="workload" aria-label="Workload">
      <div className="section-heading">
        <h2>Workload</h2>
        <p>{supportLine(counts)}</p>
      </div>
      <ul className="workload-rows">
        {ROWS.map((row) => {
          const value = counts[row.key]
          const width = total === 0 ? 0 : (value / max) * 100
          return (
            <li key={row.key} className="workload-row">
              <div className="workload-row-top">
                <span>{row.label}</span>
                <span className="workload-count">
                  {value} {value === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              <div className="workload-track" aria-hidden="true">
                <span
                  className={`workload-fill pressure-${row.key}`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="workload-hint">{row.hint}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
