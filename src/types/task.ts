export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  category: string | null;
  due_date: string | null;
  time_estimate: number | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export const COLUMNS: { id: TaskStatus; label: string; colorVar: string }[] = [
  { id: "todo", label: "To-Do", colorVar: "column-todo" },
  { id: "in_progress", label: "In Progress", colorVar: "column-progress" },
  { id: "completed", label: "Completed", colorVar: "column-done" },
];

export const CATEGORIES = ["Design", "Development", "Marketing", "Research", "General"];

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-destructive/10 text-destructive" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning" },
  low: { label: "Low", className: "bg-success/10 text-success" },
};
