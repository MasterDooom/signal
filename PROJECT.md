# SIGNAL — PROJECT CONTEXT & BUILD RULES

## 1. WHAT WE ARE BUILDING

Signal is an intelligent productivity layer for students.

Students receive important information across chaotic communication channels:

- WhatsApp groups
- College emails
- PDFs
- Documents
- Announcements
- Event registrations
- Assignment instructions
- Forms and deadlines

Important information gets buried between hundreds of irrelevant messages.

Signal's job is to identify actionable information and turn it into a clear, prioritized workspace.

The core transformation is:

NOISY INFORMATION
        ↓
RELEVANT INFORMATION
        ↓
ACTIONABLE TASK
        ↓
PRIORITY + DEADLINE + WORKLOAD
        ↓
CLEAR NEXT ACTION

Signal should feel like an intelligent filter between the student and the chaos.

---

# 2. CORE USER

Primary user:

A college student who is part of multiple WhatsApp groups, receives college emails, gets assignments through PDFs/messages, and regularly misses or forgets important deadlines.

The student does NOT want another complicated productivity app where they manually enter everything.

The value of Signal is:

"Important things find me instead of me constantly searching for them."

---

# 3. CORE PRODUCT EXPERIENCE

The main dashboard should immediately answer:

1. What do I need to do?
2. What is most important?
3. What is due soon?
4. How much work am I actually dealing with?
5. What should I do next?

The product should avoid becoming a generic Todoist clone.

The intelligence comes from automatically understanding incoming information.

---

# 4. CORE DATA FLOW

For the hackathon prototype:

Communication sources can initially be simulated with realistic mock data.

Later, sources may include:

- Email APIs
- Imported/exported messages
- Shared or forwarded messages
- Uploaded PDFs/documents
- Future supported integrations

IMPORTANT:

Do NOT architect the prototype around the assumption that arbitrary personal WhatsApp group messages can simply be read through an official API.

For the prototype, create a realistic source abstraction and mock connector layer.

Example:

Source
├── Email
├── WhatsApp Import
├── PDF
└── Manual

The UI should behave as though Signal is processing real sources, while mock data powers the initial demo.

---

# 5. MAIN FEATURE — INTELLIGENT TASK EXTRACTION

Signal receives raw information.

Example:

"Guys Prof Sharma said the DSA assignment has to be submitted by Friday 11:59 PM. Implement the graph algorithms mentioned in the PDF. Worth 20 marks."

Signal extracts:

TITLE:
DSA Assignment — Graph Algorithms

TYPE:
Assignment

DEADLINE:
Friday, 11:59 PM

IMPORTANCE:
High

ESTIMATED WORKLOAD:
4 hours

SOURCE:
DSA WhatsApp Group

ORIGINAL MESSAGE:
Stored and viewable

ACTION:
Complete assignment

The extracted task should contain both structured information and a link back to its original context.

---

# 6. TASK MODEL

Every task should eventually support:

id

title

description

type

importance

deadline

estimatedDuration

status

source

sourceType

originalMessage

timestamp

tags

aiAnalysis

createdAt

Possible status:

- todo
- in_progress
- completed

Possible types:

- assignment
- exam
- registration
- event
- meeting
- reminder
- document
- other

Possible importance:

- critical
- high
- medium
- low

---

# 7. PRIORITY SYSTEM

Signal should calculate a priority score.

Priority should NOT just mean "deadline soon".

Priority can combine:

- urgency
- importance
- academic impact
- estimated workload
- time remaining
- explicit language in the message

Conceptually:

priority =
importance
+ urgency
+ workload pressure
+ consequence/impact

The exact algorithm can initially be simple and deterministic.

Do NOT overengineer machine learning for the hackathon.

Example labels:

CRITICAL
HIGH
MEDIUM
LOW

The dashboard should make the priority visually obvious.

---

# 8. THE CORTISOL / WORKLOAD METER

One of Signal's signature features.

Every task can have a workload pressure indicator.

It combines:

- estimated work required
- time remaining
- difficulty
- importance

Conceptually:

Low pressure → GREEN

Moderate pressure → YELLOW

High pressure → RED

The tone can be slightly playful.

Examples:

GREEN:
"Chill. You've got this."

YELLOW:
"Probably don't start this tomorrow night."

RED:
"Yeah, this is becoming your problem."

But do not overdo memes.

The product should still feel polished and intelligent.

Possible display:

Workload Pressure

🟢 LOW
🟡 MODERATE
🔴 HIGH

With a score or meter.

---

# 9. AI TASK OVERVIEW

When the user opens a task, Signal should provide an AI-generated overview.

Example:

WHAT THIS ACTUALLY MEANS

You need to implement the required graph algorithms and prepare the submission before Friday night.

SUGGESTED APPROACH

1. Read assignment requirements — 20 min
2. Identify required algorithms — 15 min
3. Implement and test — 2 hr
4. Debug and document — 1 hr
5. Final review and submission — 20 min

ESTIMATED TIME

~4 hours

RECOMMENDED START

Today or tomorrow.

WORKLOAD PRESSURE

HIGH

For the prototype:

This can initially be generated from deterministic mock analysis.

Later it should be replaceable with a real AI API.

The UI and data architecture should NOT need to be rewritten when replacing mock AI with a real AI provider.

---

# 10. TASK DETAIL VIEW

Clicking a task should open a detailed view.

It should contain:

- Task title
- Priority
- Deadline
- Time remaining
- Estimated workload
- Cortisol/workload meter
- AI overview
- Suggested execution plan
- Source information
- Original message
- Original timestamp
- Relevant attached document if available

The original message is important.

Signal should never feel like it magically invented information.

The user should be able to understand:

"Why did Signal create this task?"

---

# 11. PDF / DOCUMENT FEATURE

Users should be able to upload a PDF or document.

Signal should eventually be able to:

1. Identify the document
2. Extract relevant text
3. Understand whether action is required
4. Extract deadlines/tasks
5. Summarize requirements

Example:

User uploads:

"Physics Lab Assignment.pdf"

Signal creates:

TASK:
Complete Physics Lab Record

DEADLINE:
Extracted from document if available

AI OVERVIEW:
Summary of requirements

ESTIMATED TIME:
Calculated estimate

For the first prototype, file upload UI and mock document processing are acceptable.

However, architect document processing separately from UI.

Example conceptual flow:

UI
↓
documentService
↓
documentParser
↓
taskExtractor

---

# 12. MAIN DASHBOARD

The dashboard is the most important screen.

It should immediately communicate the value of Signal.

Suggested structure:

HEADER

Signal logo/name

Today's overview

Example:

"Good afternoon, Wallis."

"You have 7 active tasks."

Then:

━━━━━━━━━━━━━━━━━━━━

ATTENTION REQUIRED

Critical / urgent tasks

━━━━━━━━━━━━━━━━━━━━

UP NEXT

Tasks sorted by intelligent priority

━━━━━━━━━━━━━━━━━━━━

WORKLOAD

A visual overview showing:

Low pressure
Moderate pressure
High pressure

━━━━━━━━━━━━━━━━━━━━

RECENTLY DETECTED

New tasks Signal discovered from incoming information.

---

# 13. TASK CARD

Every task card should communicate information quickly.

Suggested contents:

TYPE / SOURCE ICON

TITLE

Short description

PRIORITY LABEL

DEADLINE

TIME REMAINING

ESTIMATED WORK

WORKLOAD PRESSURE INDICATOR

Example:

[ASSIGNMENT]                  HIGH

DSA Graph Assignment

Implement required graph algorithms.

Due in 1d 14h

~4 hours work

████████░░ HIGH PRESSURE

Source: DSA WhatsApp Group

Cards should be clickable.

---

# 14. FILTERING AND SORTING

The user should be able to sort/filter tasks by:

- Smart Priority
- Deadline
- Importance
- Workload
- Source
- Task Type
- Status

The default should be:

SMART PRIORITY

Signal's opinionated ranking.

The UI should communicate that Signal is intelligently sorting tasks.

Not just alphabetically displaying a database.

---

# 15. IMPORTANT REGISTRATIONS / EVENTS

Signal should detect time-sensitive opportunities.

Examples:

- Hackathon registrations
- Club applications
- Event registrations
- Exam forms
- Scholarship applications

These should not necessarily appear exactly like normal assignments.

Consider a distinct visual category:

OPPORTUNITY

Example:

🚀 Hackathon Registration

Registration closes in 6 hours.

Priority: HIGH

Why?

"Limited registration window and relevant to your interests."

This makes Signal feel broader than an assignment tracker.

---

# 16. UI DESIGN DIRECTION

Signal should look:

- modern
- intelligent
- premium
- clean
- slightly futuristic

NOT:

- generic dashboard template
- excessive gradients
- rainbow UI
- every component inside a rounded rectangle
- crypto dashboard
- childish student app

Preferred direction:

Dark interface.

Strong typography.

Clear hierarchy.

Controlled use of accent color.

Information density should feel intentional.

Important things should visually dominate.

The dashboard should feel calm even though the underlying information is chaotic.

Visual principle:

CHAOTIC INPUT → CALM OUTPUT

---

# 17. COLOR SYSTEM

Use a restrained palette.

Default interface:

Dark neutral background.

Cards slightly elevated from background.

One primary accent color.

Semantic colors:

GREEN = low pressure / safe

YELLOW = moderate attention

RED = urgent / high pressure

Do not use semantic colors randomly.

Color should communicate meaning.

---

# 18. ANIMATIONS

Animations should be subtle.

Examples:

- task cards entering
- expanding task detail
- pressure meter transitions
- hover states
- filter transitions

Do NOT add animations just because they look cool.

Animations should communicate state or improve perceived quality.

---

# 19. TECH STACK

Initial stack:

Frontend:

React

TypeScript

Vite

Styling:

Use a modern styling approach selected during implementation.

Preferred options may include:

- Tailwind CSS
- CSS modules
- clean component-level CSS

Choose one consistent system.

Do not mix multiple styling approaches without reason.

Future/backend services may include:

- Supabase
- Firebase
- PostgreSQL
- server/API layer

But do NOT build unnecessary backend infrastructure before the prototype works.

For the first working prototype:

Frontend + realistic mock data is acceptable.

The demo must feel real.

---

# 20. PROJECT ARCHITECTURE

The project should gradually evolve toward:

src/

components/
Reusable UI components

features/
Feature-specific components and logic

pages/
Main application screens

data/
Mock data

types/
Shared TypeScript types

services/
External integrations and API abstractions

utils/
Pure helper functions

hooks/
Reusable React hooks

Do NOT create 50 folders immediately.

Only introduce structure when it becomes useful.

Avoid premature abstraction.

---

# 21. MOCK DATA

Mock data must feel REAL.

Do not use generic examples like:

"Complete Homework"

Use realistic college information.

Example sources:

DSA WhatsApp Group

VIT Student Activities

Professor Email

Physics Lab Group

Hackathon Announcements

Examples should contain:

- realistic timestamps
- realistic deadlines
- varying urgency
- different workload levels
- registrations
- assignments
- events

The demo should tell a story.

When judges open the app, they should instantly understand:

"This would actually be useful."

---

# 22. DEMO STORY

The ideal demo flow:

1. User opens Signal.

2. Dashboard shows:

"You have 3 things that need attention."

3. One assignment is due soon.

4. One hackathon registration closes today.

5. One task has high workload pressure.

6. User clicks the assignment.

7. Signal shows:

- extracted deadline
- original message
- estimated workload
- AI breakdown
- suggested execution plan

8. User uploads a PDF.

9. Signal detects a new actionable task.

10. Dashboard updates.

The product demonstration should communicate the entire idea in under 60 seconds.

---

# 23. BUILD PHILOSOPHY

We are building for a hackathon.

Therefore:

A convincing working prototype is more valuable than a giant incomplete system.

Prioritize:

1. Core experience
2. Visual polish
3. Demo quality
4. Reliability
5. Technical architecture

Do NOT build features just because they sound impressive.

Every feature must improve one of:

- usefulness
- demo impact
- product differentiation

---

# 24. AI AGENT RULES

Any AI coding agent working on this repository MUST follow these rules.

RULE 1:

Always read PROJECT.md before making major architectural or feature decisions.

RULE 2:

Do NOT rewrite unrelated parts of the application.

RULE 3:

When given a task, modify only the files necessary for that task.

RULE 4:

Before major changes, explain:

- what you plan to change
- which files will change
- why

Then wait for approval unless explicitly instructed to proceed.

RULE 5:

Do NOT replace the entire application because one feature needs changing.

RULE 6:

Preserve working functionality.

RULE 7:

Use existing architecture and naming conventions.

RULE 8:

Avoid unnecessary dependencies.

Before installing a package, explain:

- what problem it solves
- why it is needed
- whether a simpler existing solution exists

RULE 9:

Never use fake implementation claims.

If a feature uses mock data, clearly structure it as mock data.

RULE 10:

Keep the code understandable.

The project owner is learning development.

Prefer clear, maintainable code over clever code.

RULE 11:

After completing a task, explain:

- what changed
- which files changed
- how the feature works
- how to test it

---

# 25. DEVELOPMENT WORKFLOW

Build Signal incrementally.

Recommended phases:

PHASE 1

Clean the default Vite project.

Create basic application structure.

Create realistic TypeScript task data models.

PHASE 2

Build the main dashboard.

Use realistic mock data.

PHASE 3

Build task cards.

Implement priority sorting.

PHASE 4

Build task detail interaction.

Show AI overview and original source.

PHASE 5

Implement filters and sorting.

PHASE 6

Build workload/cortisol pressure visualization.

PHASE 7

Add document upload experience.

Use mock processing initially if necessary.

PHASE 8

Replace selected mock intelligence with a real AI/API integration if time allows.

PHASE 9

Polish animations, responsiveness, empty states, loading states, and demo flow.

---

# 26. DEFINITION OF SUCCESS

A successful Signal prototype should make someone say:

"I actually need this."

The interface should make sense without explanation.

The core value should be visible immediately.

A judge should understand:

The problem is real.

The solution is useful.

The intelligence is meaningful.

The product feels polished.

The architecture could realistically expand beyond the hackathon.

---

# FINAL PRINCIPLE

Do not build a dashboard full of features.

Build one powerful experience:

Signal finds what matters.

Signal explains what it means.

Signal tells you what to do next.

Everything else must support that.