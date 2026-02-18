import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, PRIORITY_CONFIG } from "@/types/task";
import { Calendar, Clock, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      className={`group cursor-pointer rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md ${isDragging ? "z-50 shadow-lg ring-2 ring-primary/20" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 cursor-grab text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium leading-snug">{task.title}</h4>
            <Badge variant="secondary" className={`shrink-0 text-xs ${priority.className}`}>
              {priority.label}
            </Badge>
          </div>

          {task.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{task.description}</p>
          )}

          {task.category && (
            <Badge variant="outline" className="text-xs">
              {task.category}
            </Badge>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {task.due_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(task.due_date), "MMM d")}
              </span>
            )}
            {task.time_estimate != null && task.time_estimate > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {task.time_estimate}h
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
