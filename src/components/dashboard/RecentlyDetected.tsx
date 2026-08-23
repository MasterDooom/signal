import type { Task } from '../../types/task'
import { formatRelativeTimestamp } from '../../utils/format'

type RecentlyDetectedProps = {
  tasks: Task[]
  nowMs: number
}

export function RecentlyDetected({ tasks, nowMs }: RecentlyDetectedProps) {
  return (
    <section className="recent" aria-label="Recently detected">
      <div className="section-heading">
        <h2>Recently detected</h2>
        <p>Pulled from incoming messages and documents.</p>
      </div>
      {tasks.length === 0 ? (
        <p className="empty-copy">No recent detections.</p>
      ) : (
        <ul className="recent-list">
          {tasks.map((task) => (
            <li key={task.id} className="recent-row">
              <time dateTime={task.timestamp}>
                {formatRelativeTimestamp(task.timestamp, nowMs)}
              </time>
              <div>
                <p className="recent-title">{task.title}</p>
                <p className="recent-source">{task.source}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
