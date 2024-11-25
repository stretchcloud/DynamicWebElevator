import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, GraduationCap, FileText } from 'lucide-react';
import { MorphingCard } from '../3d/MorphingCard';
import { FloatingButton } from '../3d/FloatingButton';

const categories = [
  {
    title: 'Free Resources',
    description: 'Essential learning materials and tutorials to get started with LLMs',
    icon: <Book className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Video Tutorials',
    description: 'High-quality video content for visual learners',
    icon: <Video className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Academic Courses',
    description: 'University courses from top institutions covering ML, AI and NLP',
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
  },
  {
    title: 'Research Papers',
    description: 'Latest research papers and technical reports in the field',
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
];

export const CategoryGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6"
      >
        {categories.map((category) => (
          <FloatingButton
            key={category.title}
            onClick={() => setSelectedCategory(category.title)}
            className="w-full h-14"
          >
            <span className="flex items-center space-x-2">
              {category.icon}
              <span>{category.title}</span>
            </span>
          </FloatingButton>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
      >
        {categories.map((category, index) => (
          <MorphingCard
            key={category.title}
            className={`transition-all duration-300 ${
              selectedCategory && selectedCategory !== category.title
                ? 'opacity-50 scale-95'
                : ''
            }`}
          >
            <div className="p-6 space-y-4">
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                {isLoading ? (
                  <div className="w-6 h-6 rounded-full bg-primary/20" />
                ) : category.icon}
              </div>
              <div className="space-y-2">
                {isLoading ? (
                  <>
                    <div className="h-6 bg-primary/20 rounded w-3/4" />
                    <div className="h-4 bg-primary/10 rounded w-full" />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </MorphingCard>
        ))}
      </motion.div>
    </div>
  );
};
