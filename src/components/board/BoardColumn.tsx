import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BoardTask, BoardStatus } from "./BoardTypes";
import BoardCard from "./BoardCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BoardColumnProps {
  id: BoardStatus;
  label: string;
  icon: string;
  tasks: BoardTask[];
  onAddTask: (status: BoardStatus) => void;
  onEditTask: (task: BoardTask) => void;
}

const COL_STYLES: Record<BoardStatus, { gradient: string; dot: string; badge: string }> = {
  todo: {
    gradient: "from-primary/5 to-primary/10",
    dot: "bg-primary",
    badge: "bg-primary/15 text-primary",
  },
  in_progress: {
    gradient: "from-warning/5 to-warning/10",
    dot: "bg-warning",
    badge: "bg-warning/15 text-warning",
  },
  completed: {
    gradient: "from-success/5 to-success/10",
    dot: "bg-success",
    badge: "bg-success/15 text-success",
  },
};

const BoardColumn = ({ id, label, icon, tasks, onAddTask, onEditTask }: BoardColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const styles = COL_STYLES[id];

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[400px] flex-1 flex-col rounded-2xl bg-gradient-to-b ${styles.gradient} border border-border/40 p-4 transition-all ${
        isOver ? "ring-2 ring-primary/30 scale-[1.01]" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <h3 className="font-display text-sm font-semibold">{label}</h3>
          <Badge className={`ml-1 h-5 min-w-[20px] justify-center rounded-full border-0 px-1.5 text-xs font-bold ${styles.badge}`}>
            {tasks.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg hover:bg-primary/10"
          onClick={() => onAddTask(id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <BoardCard key={task.id} task={task} onClick={() => onEditTask(task)} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 py-12 text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
            <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => onAddTask(id)}>
              <Plus className="mr-1 h-3 w-3" /> Add task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
