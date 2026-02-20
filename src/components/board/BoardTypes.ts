export type BoardStatus = "todo" | "in_progress" | "completed";
export type BoardPriority = "low" | "medium" | "high";

export interface BoardTask {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: BoardStatus;
  priority: BoardPriority;
  category: string | null;
  due_date: string | null;
  time_estimate: number | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export const BOARD_COLUMNS: { id: BoardStatus; label: string; icon: string }[] = [
  { id: "todo", label: "To Do", icon: "📋" },
  { id: "in_progress", label: "In Progress", icon: "⚡" },
  { id: "completed", label: "Done", icon: "✅" },
];

export const BOARD_CATEGORIES = ["Design", "Development", "Marketing", "Research", "General"];

export const PRIORITY_MAP: Record<BoardPriority, { label: string; color: string }> = {
  high: { label: "High", color: "destructive" },
  medium: { label: "Medium", color: "warning" },
  low: { label: "Low", color: "success" },
};
