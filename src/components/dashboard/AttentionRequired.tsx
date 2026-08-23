import type { Task } from '../../types/task'
import {
  formatImportance,
  formatTaskType,
  formatTimeRemaining,
} from '../../utils/format'

type AttentionRequiredProps = {
  task: Task | undefined
  nowMs: number
  onSelectTask: (task: Task) => void
}

export function AttentionRequired({
  task,
  nowMs,
  onSelectTask,
}: AttentionRequiredProps) {
  if (!task) {
    return (
      <section className="attention" aria-label="Attention required">
        <p className="section-kicker">Attention required</p>
        <p className="attention-empty">Nothing needs immediate action.</p>
      </section>
    )
  }

  return (
    <section className="attention" aria-label="Attention required">
      <button
        type="button"
        className="attention-trigger"
        onClick={() => onSelectTask(task)}
      >
        <div className="attention-top">
          <p className="section-kicker">Attention required</p>
          <span className={`importance-tag importance-${task.importance}`}>
            {formatImportance(task.importance)}
          </span>
        </div>
        <p className="attention-type">{formatTaskType(task.type)}</p>
        <h2 className="attention-title">{task.title}</h2>
        <div className="attention-body">
          <p className="attention-context">{task.description}</p>
          <p className="attention-time">{formatTimeRemaining(task.deadline, nowMs)}</p>
        </div>
        <p className="attention-source">Source · {task.source}</p>
      </button>
    </section>
  )
}
