import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  id: TaskStatus;
  label: string;
  colorVar: string;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
}

const KanbanColumn = ({ id, label, colorVar, tasks, onAddTask, onEditTask }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[400px] flex-1 flex-col rounded-2xl bg-secondary/50 p-4 transition-colors ${isOver ? "bg-accent/60 ring-2 ring-primary/20" : ""}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full bg-${colorVar}`} />
          <h3 className="font-display text-sm font-semibold">{label}</h3>
          <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] justify-center rounded-full px-1.5 text-xs">
            {tasks.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg"
          onClick={() => onAddTask(id)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onEditTask(task)} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 py-12 text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs"
              onClick={() => onAddTask(id)}
            >
              <Plus className="mr-1 h-3 w-3" /> Add task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
