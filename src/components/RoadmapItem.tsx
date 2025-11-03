import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";

interface RoadmapItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const RoadmapItem = ({ title, completed, onToggle, onDelete }: RoadmapItemProps) => {
  return (
    <Card className="p-4 shadow-card hover:shadow-elevated transition-all duration-300 border-border/50 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-3 relative">
        <Checkbox
          checked={completed}
          onCheckedChange={onToggle}
          className="w-5 h-5"
        />
        <div className="flex-1">
          <p className={`font-medium transition-all ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {title}
          </p>
        </div>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground/30" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
