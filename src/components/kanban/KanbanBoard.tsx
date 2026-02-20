import { useState, useCallback } from "react";
import { DndContext, DragEndEvent, DragOverEvent, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { Task, TaskStatus, COLUMNS } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import KanbanColumn from "./KanbanColumn";
import TaskDialog from "./TaskDialog";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Sparkles } from "lucide-react";

const KanbanBoard = () => {
  const { tasks, loading, addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const taskId = active.id as string;
      const overId = over.id as string;

      const isColumn = COLUMNS.some((c) => c.id === overId);
      if (isColumn) {
        moveTask(taskId, overId as TaskStatus);
        return;
      }

      const overTask = tasks.find((t) => t.id === overId);
      if (overTask && overTask.id !== taskId) {
        moveTask(taskId, overTask.status);
      }
    },
    [moveTask, tasks]
  );

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSave = async (data: Partial<Task>) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await addTask(data);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            My Board
          </h1>
          <p className="text-sm text-muted-foreground">{tasks.length} tasks total</p>
        </div>
        <Button onClick={() => handleAddTask("todo")} className="rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              colorVar={col.colorVar}
              tasks={getTasksByStatus(col.id)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>
      </DndContext>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSave={handleSave}
        onDelete={deleteTask}
      />
    </>
  );
};

export default KanbanBoard;
