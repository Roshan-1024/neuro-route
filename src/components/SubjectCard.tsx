import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface SubjectCardProps {
  title: string;
  description: string;
  totalItems: number;
  completedItems: number;
  onClick: () => void;
}

export const SubjectCard = ({ title, description, totalItems, completedItems, onClick }: SubjectCardProps) => {
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Card 
      className="card-gradient shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer border-border/50 group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {completedItems}/{totalItems}
          </Badge>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
