import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash2 } from "lucide-react";

interface SubjectCardProps {
  title: string;
  description: string;
  totalItems: number;
  completedItems: number;
  onClick: () => void;
  onDelete: () => void;
}

export const SubjectCard = ({ title, description, totalItems, completedItems, onClick, onDelete }: SubjectCardProps) => {
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Card 
      className="card-gradient shadow-card hover:shadow-elevated transition-all duration-300 border-border/50 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="relative cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors glow-neural">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {completedItems}/{totalItems}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative cursor-pointer" onClick={onClick}>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
