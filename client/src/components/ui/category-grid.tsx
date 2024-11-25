import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, GraduationCap, FileText } from 'lucide-react';
import { ResourceCard } from './resource-card';

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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
    >
      {categories.map((category, index) => (
        <ResourceCard
          key={category.title}
          title={category.title}
          description={category.description}
          icon={category.icon}
          index={index}
          isLoading={isLoading}
        />
      ))}
    </motion.div>
  );
};
