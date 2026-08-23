import type { Task } from '../../types/task'
import {
  formatDuration,
  formatImportance,
  formatPressure,
  formatTaskType,
  formatTimeRemaining,
} from '../../utils/format'

type PriorityListProps = {
  tasks: Task[]
  nowMs: number
}

export function PriorityList({ tasks, nowMs }: PriorityListProps) {
  return (
    <section className="priorities" aria-label="Your priorities">
      <div className="section-heading">
        <h2>Your priorities</h2>
        <p>Ordered by importance, then by what is due soonest.</p>
      </div>
      {tasks.length === 0 ? (
        <p className="empty-copy">No other active tasks right now.</p>
      ) : (
        <ul className="priority-list">
          {tasks.map((task) => (
            <li key={task.id} className="priority-row">
              <div className="priority-main">
                <span className="priority-type">{formatTaskType(task.type)}</span>
                <p className="priority-title">{task.title}</p>
                <p className="priority-source">{task.source}</p>
              </div>
              <dl className="priority-meta">
                <div>
                  <dt>Due</dt>
                  <dd>{formatTimeRemaining(task.deadline, nowMs)}</dd>
                </div>
                <div>
                  <dt>Work</dt>
                  <dd>{formatDuration(task.estimatedDurationMinutes)}</dd>
                </div>
                <div>
                  <dt>Importance</dt>
                  <dd className={`importance-text importance-${task.importance}`}>
                    {formatImportance(task.importance)}
                  </dd>
                </div>
                <div>
                  <dt>Pressure</dt>
                  <dd
                    className={`pressure-text pressure-${task.aiAnalysis.workloadPressure}`}
                  >
                    {formatPressure(task.aiAnalysis.workloadPressure)}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
