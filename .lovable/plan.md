

# Kanban Board with AI Assistant

## Overview
A beautiful, interactive Kanban board inspired by the clean modern design from your reference images, with drag-and-drop task management, an integrated AI chatbot, and persistent database storage behind user authentication.

---

## 1. Authentication & User Setup
- **Login / Signup page** with email authentication using Supabase Auth
- Each user gets their own private board and tasks
- User profile with name display in the sidebar

## 2. Main Layout (Inspired by Reference Images)
- **Left sidebar** with navigation icons and user profile at the bottom — clean, minimal style matching your references
- **Top header** area with board title and an "Add Task" button
- Modern, spacious design with soft card shadows and rounded corners

## 3. Kanban Board — 3 Columns
- **To-Do** → **In Progress** → **Completed**
- Each column shows a task count badge
- **Drag & drop** cards between columns to change status
- "+" button on each column to quickly add a task there

## 4. Task Cards
Each card displays:
- **Title & Description** — prominent title with a brief description below
- **Category Tag** — color-coded label (e.g., "Design", "Development", "Marketing")
- **Due Date** — calendar icon with the date
- **Time Estimate** — clock icon with hours
- **Priority Level** — visual indicator (High = red, Medium = orange, Low = green)
- Click a card to open a **detail modal** for editing all fields

## 5. AI Chatbot Panel
- A collapsible **chat panel** on the right side or as a floating button
- Powered by **Lovable AI** (Gemini) via a Supabase edge function
- Capabilities:
  - **Board insights** — "How many tasks are overdue?", "What's my progress this week?"
  - **Task suggestions** — "Break down this task into subtasks", "What should I prioritize?"
- The AI has context about your current board state to give relevant answers

## 6. Database & Persistence (Lovable Cloud + Supabase)
- **Tasks table** — stores title, description, status, priority, due date, time estimate, category, position order, user ownership
- **Row-Level Security** — each user can only see and manage their own tasks
- All changes (drag-drop, edits, deletes) persist automatically
- Come back anytime and your board is exactly where you left it

## 7. Interactive Polish
- Smooth drag-and-drop animations
- Hover effects on cards and buttons
- Toast notifications for actions (task created, moved, deleted)
- Responsive layout that works on desktop and tablet

