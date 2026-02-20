import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import AIChatPanel from "@/components/chat/AIChatPanel";
import { useTasks } from "@/hooks/useTasks";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { session, loading: authLoading } = useAuth();
  const { tasks } = useTasks();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <Navigate to="/auth" replace />;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-accent/10 to-primary/5">
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-hidden p-6">
          <div className="mb-2 flex items-center md:hidden">
            <SidebarTrigger />
          </div>
          <KanbanBoard />
        </main>
        <AIChatPanel tasks={tasks} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
