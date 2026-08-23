import { useEffect, useState } from 'react'
import type { Task } from '../../types/task'
import {
  formatAbsoluteDeadline,
  formatDuration,
  formatImportance,
  formatPressure,
  formatRelativeTimestamp,
  formatTaskType,
  formatTimeRemaining,
} from '../../utils/format'
import './detail.css'

type TaskDetailDrawerProps = {
  task: Task | null
  nowMs: number
  onClose: () => void
}

export function TaskDetailDrawer({ task, nowMs, onClose }: TaskDetailDrawerProps) {
  const isOpen = task !== null
  // Keep rendering the last task's content while the close transition plays,
  // so the panel doesn't flash empty as it slides away.
  const [displayTask, setDisplayTask] = useState<Task | null>(task)

  useEffect(() => {
    if (task) setDisplayTask(task)
  }, [task])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!displayTask) return null

  const { aiAnalysis } = displayTask

  return (
    <>
      <div
        className={`drawer-scrim${isOpen ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className={`task-drawer${isOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={displayTask.title}
      >
        <div className="drawer-header">
          <span className="drawer-type">{formatTaskType(displayTask.type)}</span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close task detail"
          >
            ×
          </button>
        </div>

        <div className="drawer-body">
          <h2 className="drawer-title">{displayTask.title}</h2>
          <p className="drawer-description">{displayTask.description}</p>

          <section className="signal-take" aria-label="Signal's take">
            <p className="signal-take-kicker">Signal's take</p>
            <p className="signal-take-text">{aiAnalysis.overview}</p>
          </section>

          <dl className="key-facts" aria-label="Key facts">
            <div>
              <dt>Deadline</dt>
              <dd>{formatAbsoluteDeadline(displayTask.deadline)}</dd>
            </div>
            <div>
              <dt>Time left</dt>
              <dd>{formatTimeRemaining(displayTask.deadline, nowMs)}</dd>
            </div>
            <div>
              <dt>Estimated work</dt>
              <dd>{formatDuration(displayTask.estimatedDurationMinutes)}</dd>
            </div>
            <div>
              <dt>Importance</dt>
              <dd className={`importance-text importance-${displayTask.importance}`}>
                {formatImportance(displayTask.importance)}
              </dd>
            </div>
            <div>
              <dt>Pressure</dt>
              <dd className={`pressure-text pressure-${aiAnalysis.workloadPressure}`}>
                {formatPressure(aiAnalysis.workloadPressure)}
              </dd>
            </div>
          </dl>

          <section className="drawer-steps" aria-label="Suggested steps">
            <p className="drawer-section-label">Suggested steps</p>
            <ol>
              {aiAnalysis.suggestedApproach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="drawer-start">
              <span>Start</span> {aiAnalysis.recommendedStart}
            </p>
          </section>

          <section className="drawer-provenance" aria-label="Source">
            <p className="drawer-section-label">Source</p>
            <p className="provenance-line">
              {displayTask.source}
              {displayTask.documentName ? ` · ${displayTask.documentName}` : ''}
            </p>
            <p className="provenance-timestamp">
              Detected {formatRelativeTimestamp(displayTask.timestamp, nowMs)}
            </p>
            <blockquote className="provenance-message">
              {displayTask.originalMessage}
            </blockquote>
          </section>
        </div>
      </aside>
    </>
  )
}
