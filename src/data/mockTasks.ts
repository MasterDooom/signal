import type { Task } from '../types/task'

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

function isoFromNow(offsetMs: number, nowMs: number): string {
  return new Date(nowMs + offsetMs).toISOString()
}

function buildMockTasks(nowMs: number): Task[] {
  return [
    {
      id: 'task-dsa-graphs',
      title: 'DSA Assignment — Graph Algorithms',
      description:
        'Implement the graph algorithms from the assignment PDF and submit before Friday night.',
      type: 'assignment',
      importance: 'high',
      deadline: isoFromNow(DAY_MS + 14 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 240,
      status: 'todo',
      source: 'DSA WhatsApp Group',
      sourceType: 'whatsapp_import',
      originalMessage:
        'Guys Prof Sharma said the DSA assignment has to be submitted by Friday 11:59 PM. Implement the graph algorithms mentioned in the PDF. Worth 20 marks.',
      timestamp: isoFromNow(-5 * HOUR_MS, nowMs),
      tags: ['dsa', 'assignment', 'graphs'],
      createdAt: isoFromNow(-5 * HOUR_MS, nowMs),
      aiAnalysis: {
        overview:
          'You need to implement the required graph algorithms and prepare the submission before the deadline. This is worth 20 marks.',
        suggestedApproach: [
          'Read assignment requirements — 20 min',
          'Identify required algorithms — 15 min',
          'Implement and test — 2 hr',
          'Debug and document — 1 hr',
          'Final review and submission — 20 min',
        ],
        estimatedTimeLabel: '~4 hours',
        recommendedStart: 'Today or tomorrow.',
        workloadPressure: 'high',
      },
    },
    {
      id: 'task-hackathon-reg',
      title: 'Hackathon Registration — CodeSprint 2026',
      description:
        'Team registration for the campus CodeSprint hackathon closes today.',
      type: 'registration',
      importance: 'critical',
      deadline: isoFromNow(6 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 25,
      status: 'todo',
      source: 'Hackathon Announcements',
      sourceType: 'whatsapp_import',
      originalMessage:
        'Reminder: CodeSprint 2026 registrations close TODAY at 11:59 PM. Teams of 2–4. Limited slots, first come first served. Form in the group description.',
      timestamp: isoFromNow(-2 * HOUR_MS, nowMs),
      tags: ['hackathon', 'registration', 'opportunity'],
      createdAt: isoFromNow(-2 * HOUR_MS, nowMs),
      aiAnalysis: {
        overview:
          'This is a time-sensitive opportunity, not an assignment. Registration closes in a few hours and slots are limited.',
        suggestedApproach: [
          'Confirm teammates — 10 min',
          'Fill the registration form — 10 min',
          'Save the confirmation mail — 5 min',
        ],
        estimatedTimeLabel: '~25 minutes',
        recommendedStart: 'Now.',
        workloadPressure: 'moderate',
      },
    },
    {
      id: 'task-physics-lab',
      title: 'Complete Physics Lab Record',
      description:
        'Finish the optics experiment write-up, observations, and viva questions from the lab PDF.',
      type: 'assignment',
      importance: 'high',
      deadline: isoFromNow(5 * DAY_MS, nowMs),
      estimatedDurationMinutes: 180,
      status: 'in_progress',
      source: 'Physics Lab Group',
      sourceType: 'pdf',
      originalMessage:
        'Lab record for Experiment 4 (Interference in Thin Films) is due next lab. Include aim, apparatus, theory, observations, calculations, and the viva set on page 3.',
      timestamp: isoFromNow(-2 * DAY_MS, nowMs),
      tags: ['physics', 'lab', 'record'],
      createdAt: isoFromNow(-2 * DAY_MS, nowMs),
      documentName: 'Physics Lab Assignment.pdf',
      aiAnalysis: {
        overview:
          'The PDF is a lab record brief. You still need observations, calculations, and the viva answers before the next lab session.',
        suggestedApproach: [
          'Skim the experiment PDF — 20 min',
          'Complete observation table — 45 min',
          'Write theory and calculations — 1 hr',
          'Answer viva questions — 25 min',
        ],
        estimatedTimeLabel: '~3 hours',
        recommendedStart: 'Tonight or tomorrow evening.',
        workloadPressure: 'high',
      },
    },
    {
      id: 'task-cat-exam',
      title: 'CAT-2 — Digital Logic Design',
      description:
        'Internal exam covering combinational circuits, K-maps, and sequential logic.',
      type: 'exam',
      importance: 'critical',
      deadline: isoFromNow(8 * DAY_MS + 10 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 360,
      status: 'todo',
      source: 'Professor Email',
      sourceType: 'email',
      originalMessage:
        'Dear students, CAT-2 for Digital Logic Design will be held next week during the regular slot. Syllabus: Units 3–4. Bring your ID card. No makeup without a medical certificate.',
      timestamp: isoFromNow(-18 * HOUR_MS, nowMs),
      tags: ['dld', 'exam', 'cat-2'],
      createdAt: isoFromNow(-18 * HOUR_MS, nowMs),
      aiAnalysis: {
        overview:
          'This is a graded internal exam, not homework. Two units are in scope, so a multi-session revision plan is more useful than last-night cramming.',
        suggestedApproach: [
          'List Unit 3–4 topics — 20 min',
          'Revise combinational circuits — 2 hr',
          'Practice K-maps and previous CAT questions — 2 hr',
          'Sequential logic + short notes — 1.5 hr',
        ],
        estimatedTimeLabel: '~6 hours',
        recommendedStart: 'Start this weekend.',
        workloadPressure: 'moderate',
      },
    },
    {
      id: 'task-club-apps',
      title: 'IEEE Student Branch applications',
      description:
        'Core committee applications for the IEEE student branch close next week.',
      type: 'registration',
      importance: 'medium',
      deadline: isoFromNow(6 * DAY_MS + 8 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 45,
      status: 'todo',
      source: 'VIT Student Activities',
      sourceType: 'email',
      originalMessage:
        'IEEE VIT is opening core committee applications (Technical, Design, Content). Deadline is next Thursday 6 PM. SOP max 250 words + résumé.',
      timestamp: isoFromNow(-1 * DAY_MS, nowMs),
      tags: ['club', 'ieee', 'opportunity'],
      createdAt: isoFromNow(-1 * DAY_MS, nowMs),
      aiAnalysis: {
        overview:
          'Optional but time-bounded. A short SOP and résumé are enough; the cost of missing the window is higher than the work required.',
        suggestedApproach: [
          'Pick a committee — 5 min',
          'Draft a 250-word SOP — 25 min',
          'Attach résumé and submit — 15 min',
        ],
        estimatedTimeLabel: '~45 minutes',
        recommendedStart: 'This week, not the last hour.',
        workloadPressure: 'low',
      },
    },
    {
      id: 'task-guest-lecture',
      title: 'Guest lecture — Systems at scale',
      description:
        'Optional evening talk by an alumni engineer. Attendance counts toward activity points.',
      type: 'event',
      importance: 'low',
      deadline: isoFromNow(10 * DAY_MS + 4 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 90,
      status: 'todo',
      source: 'VIT Student Activities',
      sourceType: 'email',
      originalMessage:
        'Alumni guest lecture this month: “Shipping systems at scale.” TT 204, 6:00–7:30 PM. Register on the student portal if you want activity points.',
      timestamp: isoFromNow(-3 * DAY_MS, nowMs),
      tags: ['event', 'alumni', 'activity-points'],
      createdAt: isoFromNow(-3 * DAY_MS, nowMs),
      aiAnalysis: {
        overview:
          'Low-pressure event. Useful if you want activity points or the topic, but it should not compete with assignments due sooner.',
        suggestedApproach: [
          'Decide whether you need activity points — 5 min',
          'Register on the portal if yes — 5 min',
          'Add it to your calendar — 2 min',
        ],
        estimatedTimeLabel: '~90 minutes (including the talk)',
        recommendedStart: 'Register anytime this week.',
        workloadPressure: 'low',
      },
    },
    {
      id: 'task-math-tutorial',
      title: 'Submit Discrete Math tutorial 5',
      description:
        'Tutorial on recurrence relations and generating functions, already mostly done.',
      type: 'assignment',
      importance: 'medium',
      deadline: isoFromNow(3 * DAY_MS + 9 * HOUR_MS, nowMs),
      estimatedDurationMinutes: 50,
      status: 'in_progress',
      source: 'Manual',
      sourceType: 'manual',
      originalMessage:
        'You added this after the tutorial hour. Remaining: questions 6–8 and a clean scan before the next class.',
      timestamp: isoFromNow(-26 * HOUR_MS, nowMs),
      tags: ['math', 'tutorial'],
      createdAt: isoFromNow(-26 * HOUR_MS, nowMs),
      aiAnalysis: {
        overview:
          'This is leftover tutorial work, not a new discovery. Finish the last three questions and submit a readable scan.',
        suggestedApproach: [
          'Solve questions 6–8 — 35 min',
          'Scan and upload — 15 min',
        ],
        estimatedTimeLabel: '~50 minutes',
        recommendedStart: 'A quiet weekday evening.',
        workloadPressure: 'moderate',
      },
    },
  ]
}

export const mockTasks: Task[] = buildMockTasks(Date.now())
