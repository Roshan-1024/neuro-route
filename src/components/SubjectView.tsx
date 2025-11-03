import { Button } from "@/components/ui/button";
import { RoadmapItem } from "./RoadmapItem";
import { AddRoadmapDialog } from "./AddRoadmapDialog";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RoadmapItemType {
  id: string;
  title: string;
  completed: boolean;
}

interface SubjectViewProps {
  subject: {
    id: string;
    title: string;
    description: string;
    roadmapItems: RoadmapItemType[];
  };
  onBack: () => void;
  onAddItem: (title: string) => void;
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export const SubjectView = ({ subject, onBack, onAddItem, onToggleItem, onDeleteItem }: SubjectViewProps) => {
  const completedCount = subject.roadmapItems.filter(item => item.completed).length;
  const progress = subject.roadmapItems.length > 0 
    ? (completedCount / subject.roadmapItems.length) * 100 
    : 0;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl neural-gradient glow-neural">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent neural-gradient">{subject.title}</h1>
          </div>
          {subject.description && (
            <p className="text-muted-foreground text-lg mt-2">{subject.description}</p>
          )}
          
          <div className="mt-6 p-4 rounded-xl border border-border/50 bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-semibold text-primary">{completedCount}/{subject.roadmapItems.length} completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Learning Roadmap</h2>
          <AddRoadmapDialog onAdd={onAddItem} />
        </div>

        <div className="space-y-3">
          {subject.roadmapItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-2">No milestones yet.</p>
              <p className="text-sm">Add your first milestone to start building your roadmap!</p>
            </div>
          ) : (
            subject.roadmapItems.map((item) => (
              <RoadmapItem
                key={item.id}
                title={item.title}
                completed={item.completed}
                onToggle={() => onToggleItem(item.id)}
                onDelete={() => onDeleteItem(item.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
