import { useState } from "react";
import { SubjectCard } from "@/components/SubjectCard";
import { SubjectView } from "@/components/SubjectView";
import { AddSubjectDialog } from "@/components/AddSubjectDialog";
import { Brain } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  completed: boolean;
}

interface Subject {
  id: string;
  title: string;
  description: string;
  roadmapItems: RoadmapItem[];
}

const Index = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const addSubject = (title: string, description: string) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      title,
      description,
      roadmapItems: [],
    };
    setSubjects([...subjects, newSubject]);
  };

  const addRoadmapItem = (title: string) => {
    if (!selectedSubject) return;
    
    const newItem: RoadmapItem = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    const updatedSubjects = subjects.map(subject =>
      subject.id === selectedSubject.id
        ? { ...subject, roadmapItems: [...subject.roadmapItems, newItem] }
        : subject
    );

    setSubjects(updatedSubjects);
    setSelectedSubject({
      ...selectedSubject,
      roadmapItems: [...selectedSubject.roadmapItems, newItem],
    });
  };

  const toggleRoadmapItem = (itemId: string) => {
    if (!selectedSubject) return;

    const updatedSubjects = subjects.map(subject =>
      subject.id === selectedSubject.id
        ? {
            ...subject,
            roadmapItems: subject.roadmapItems.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            ),
          }
        : subject
    );

    setSubjects(updatedSubjects);
    const updated = updatedSubjects.find(s => s.id === selectedSubject.id);
    if (updated) setSelectedSubject(updated);
  };

  if (selectedSubject) {
    return (
      <SubjectView
        subject={selectedSubject}
        onBack={() => setSelectedSubject(null)}
        onAddItem={addRoadmapItem}
        onToggleItem={toggleRoadmapItem}
      />
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl neural-gradient shadow-elevated">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent neural-gradient">
              Deep Learning Roadmap
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Build and track your journey through deep learning research topics.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Research Subjects</h2>
          <AddSubjectDialog onAdd={addSubject} />
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full neural-gradient mb-4 shadow-elevated">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Start Your Learning Journey</h3>
            <p className="text-muted-foreground mb-6">
              Create your first subject to begin building your research roadmap.
            </p>
            <AddSubjectDialog onAdd={addSubject} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => {
              const completedItems = subject.roadmapItems.filter(item => item.completed).length;
              return (
                <SubjectCard
                  key={subject.id}
                  title={subject.title}
                  description={subject.description}
                  totalItems={subject.roadmapItems.length}
                  completedItems={completedItems}
                  onClick={() => setSelectedSubject(subject)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
