import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft,
  Book, 
  Video, 
  GraduationCap, 
  FileText,
  Github,
  Database,
  AppWindow,
  Table,
  Box,
  Trophy,
  Users,
  Cloud,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ScrollArea } from './scroll-area';

import { useCallback } from 'react';
import { create } from 'zustand';

interface CategoryStore {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

interface SidebarNavProps {
  className?: string;
}

export const SidebarNav = ({ className }: SidebarNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  }, [selectedCategory, setSelectedCategory]);

  const categories = [
    {
      id: 'Free Resources',
      title: 'Free Resources',
      icon: <Book className="w-4 h-4" />,
    },
    {
      id: 'Video Tutorials',
      title: 'Video Tutorials',
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: 'Academic Courses',
      title: 'Academic Courses',
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: 'Research Papers',
      title: 'Research Papers',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'GitHub Repositories',
      title: 'GitHub Repositories',
      icon: <Github className="w-4 h-4" />,
    },
    {
      id: 'Data Processing Tools',
      title: 'Data Processing Tools',
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: 'Open Source Apps / Projects',
      title: 'Open Source Apps / Projects',
      icon: <AppWindow className="w-4 h-4" />,
    },
    {
      id: 'Datasets',
      title: 'Datasets',
      icon: <Table className="w-4 h-4" />,
    },
    {
      id: 'Open Source Models',
      title: 'Open Source Models',
      icon: <Box className="w-4 h-4" />,
    },
    {
      id: 'LLM Leaderboards',
      title: 'LLM Leaderboards',
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: 'LLM Communities',
      title: 'LLM Communities',
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: 'LLM Deployment',
      title: 'LLM Deployment',
      icon: <Cloud className="w-4 h-4" />,
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen border-r border-border bg-sidebar/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && <span className="font-semibold">Categories</span>}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)] pb-10">
        <div className="space-y-1 p-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "w-full justify-start",
                isCollapsed ? "px-2" : "px-4",
                selectedCategory === category.id && "bg-primary/20"
              )}
              aria-pressed={selectedCategory === category.id}
            >
              {category.icon}
              {!isCollapsed && <span className="ml-2">{category.title}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};
