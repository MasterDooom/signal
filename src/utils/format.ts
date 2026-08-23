import type { Importance, TaskType, WorkloadPressure } from '../types/task'

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

export function greetingForNow(now = new Date()): string {
  const hour = now.getHours()
  if (hour < 12) return 'Good morning.'
  if (hour < 17) return 'Good afternoon.'
  return 'Good evening.'
}

export function formatTimeRemaining(
  deadlineIso: string,
  nowMs = Date.now(),
): string {
  const diff = new Date(deadlineIso).getTime() - nowMs

  if (diff < 0) {
    return `${formatSpan(-diff)} overdue`
  }

  return `${formatSpan(diff)} left`
}

function formatSpan(ms: number): string {
  const days = Math.floor(ms / DAY_MS)
  const hours = Math.floor((ms % DAY_MS) / HOUR_MS)
  const minutes = Math.floor((ms % HOUR_MS) / MINUTE_MS)

  if (days > 0 && hours > 0) return `${days}d ${hours}h`
  if (days > 0) return `${days}d`
  if (hours > 0 && hours < 2 && minutes > 0) return `${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h`
  return `${Math.max(1, minutes)}m`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `~${minutes}m`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (remaining === 0) return `~${hours}h`
  return `~${hours}h ${remaining}m`
}

export function formatTaskType(type: TaskType): string {
  return type.replaceAll('_', ' ')
}

export function formatRelativeTimestamp(
  iso: string,
  nowMs = Date.now(),
): string {
  const diff = Math.max(0, nowMs - new Date(iso).getTime())
  const days = Math.floor(diff / DAY_MS)
  const hours = Math.floor(diff / HOUR_MS)
  const minutes = Math.floor(diff / MINUTE_MS)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

export function formatImportance(importance: Importance): string {
  return importance
}

export function formatPressure(pressure: WorkloadPressure): string {
  if (pressure === 'low') return 'Low'
  if (pressure === 'moderate') return 'Moderate'
  return 'High'
}
