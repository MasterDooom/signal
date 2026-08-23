import { useState } from 'react'
import { mockTasks } from '../../data/mockTasks'
import type { Importance, Task, WorkloadPressure } from '../../types/task'
import { greetingForNow } from '../../utils/format'
import { TaskDetailDrawer } from '../detail/TaskDetailDrawer'
import { AttentionRequired } from './AttentionRequired'
import { PriorityList } from './PriorityList'
import { RecentlyDetected } from './RecentlyDetected'
import { SituationOverview } from './SituationOverview'
import { WorkloadOverview } from './WorkloadOverview'
import './dashboard.css'

const IMPORTANCE_RANK: Record<Importance, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

const ATTENTION_WINDOW_MS = 48 * 60 * 60 * 1000

function byDeadline(a: Task, b: Task): number {
  return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
}

function selectAttentionTask(active: Task[]): Task | undefined {
  const critical = active.filter((task) => task.importance === 'critical')
  const pool = critical.length > 0 ? critical : active
  return [...pool].sort(byDeadline)[0]
}

function countAttentionNeeded(active: Task[], nowMs: number): number {
  return active.filter((task) => {
    const dueSoon =
      new Date(task.deadline).getTime() - nowMs <= ATTENTION_WINDOW_MS
    return task.importance === 'critical' || task.importance === 'high' || dueSoon
  }).length
}

function orderPriorityTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const importance = IMPORTANCE_RANK[a.importance] - IMPORTANCE_RANK[b.importance]
    if (importance !== 0) return importance
    return byDeadline(a, b)
  })
}

function countWorkload(active: Task[]): Record<WorkloadPressure, number> {
  const counts: Record<WorkloadPressure, number> = {
    low: 0,
    moderate: 0,
    high: 0,
  }

  for (const task of active) {
    counts[task.aiAnalysis.workloadPressure] += 1
  }

  return counts
}

export function Dashboard() {
  const nowMs = Date.now()
  const active = mockTasks.filter((task) => task.status !== 'completed')
  const attentionTask = selectAttentionTask(active)
  const attentionCount = countAttentionNeeded(active, nowMs)
  const priorityTasks = orderPriorityTasks(
    active.filter((task) => task.id !== attentionTask?.id),
  )
  const workloadCounts = countWorkload(active)
  const recentlyDetected = [...active]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 3)

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const selectedTask =
    mockTasks.find((task) => task.id === selectedTaskId) ?? null

  return (
    <div className="dashboard">
      <SituationOverview
        greeting={greetingForNow(new Date(nowMs))}
        attentionCount={attentionCount}
      />
      <AttentionRequired
        task={attentionTask}
        nowMs={nowMs}
        onSelectTask={(task) => setSelectedTaskId(task.id)}
      />
      <div className="dashboard-split">
        <PriorityList
          tasks={priorityTasks}
          nowMs={nowMs}
          onSelectTask={(task) => setSelectedTaskId(task.id)}
        />
        <aside className="dashboard-rail">
          <WorkloadOverview counts={workloadCounts} />
          <RecentlyDetected
            tasks={recentlyDetected}
            nowMs={nowMs}
            onSelectTask={(task) => setSelectedTaskId(task.id)}
          />
        </aside>
      </div>
      <TaskDetailDrawer
        task={selectedTask}
        nowMs={nowMs}
        onClose={() => setSelectedTaskId(null)}
      />
    </div>
  )
}
