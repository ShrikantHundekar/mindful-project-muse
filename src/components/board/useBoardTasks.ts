import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BoardTask, BoardStatus } from "./BoardTypes";
import { toast } from "@/hooks/use-toast";

export const useBoardTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("position", { ascending: true });

    if (error) {
      toast({ title: "Error loading tasks", description: error.message, variant: "destructive" });
    } else {
      setTasks((data as BoardTask[]) || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (task: Partial<BoardTask>) => {
    if (!user) return;
    const status = task.status || "todo";
    const maxPos = tasks.filter((t) => t.status === status).length;
    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...task, user_id: user.id, title: task.title!, position: maxPos, status } as any)
      .select()
      .single();

    if (error) {
      toast({ title: "Error creating task", description: error.message, variant: "destructive" });
    } else {
      setTasks((prev) => [...prev, data as BoardTask]);
      toast({ title: "Task created" });
    }
  };

  const updateTask = async (id: string, updates: Partial<BoardTask>) => {
    const { error } = await supabase.from("tasks").update(updates as any).eq("id", id);
    if (error) {
      toast({ title: "Error updating task", description: error.message, variant: "destructive" });
    } else {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting task", description: error.message, variant: "destructive" });
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast({ title: "Task deleted" });
    }
  };

  const moveTask = async (taskId: string, newStatus: BoardStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;
    const newPos = tasks.filter((t) => t.status === newStatus).length;
    await updateTask(taskId, { status: newStatus, position: newPos });
  };

  const getTasksByStatus = (status: BoardStatus) =>
    tasks.filter((t) => t.status === status).sort((a, b) => a.position - b.position);

  return { tasks, loading, addTask, updateTask, deleteTask, moveTask, getTasksByStatus, fetchTasks };
};
