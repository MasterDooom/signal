export type TaskStatus = 'todo' | 'in_progress' | 'completed'

export type TaskType =
  | 'assignment'
  | 'exam'
  | 'registration'
  | 'event'
  | 'meeting'
  | 'reminder'
  | 'document'
  | 'other'

export type Importance = 'critical' | 'high' | 'medium' | 'low'

export type SourceType = 'email' | 'whatsapp_import' | 'pdf' | 'manual'

export type WorkloadPressure = 'low' | 'moderate' | 'high'

export type AiAnalysis = {
  overview: string
  suggestedApproach: string[]
  estimatedTimeLabel: string
  recommendedStart: string
  workloadPressure: WorkloadPressure
}

export type Task = {
  id: string
  title: string
  description: string
  type: TaskType
  importance: Importance
  deadline: string
  estimatedDurationMinutes: number
  status: TaskStatus
  source: string
  sourceType: SourceType
  originalMessage: string
  timestamp: string
  tags: string[]
  aiAnalysis: AiAnalysis
  createdAt: string
  documentName?: string
}
