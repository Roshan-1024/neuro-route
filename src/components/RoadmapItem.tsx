import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface RoadmapItemProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export const RoadmapItem = ({ title, completed, onToggle }: RoadmapItemProps) => {
  return (
    <Card className="p-4 shadow-card hover:shadow-elevated transition-all duration-300 border-border/50 group">
      <div className="flex items-center gap-3">
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
      </div>
    </Card>
  );
};
