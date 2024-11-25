import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, GraduationCap, FileText } from 'lucide-react';
import { MorphingCard } from '../3d/MorphingCard';
import { FloatingButton } from '../3d/FloatingButton';
import { useQuery } from '@tanstack/react-query';
import { ResourceCard } from './resource-card';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  icon_url: string;
}

const categories = [
  {
    id: 'Free Resources',
    title: 'Free Resources',
    description: 'Essential learning materials and tutorials to get started with LLMs',
    icon: <Book className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Video Tutorials',
    title: 'Video Tutorials',
    description: 'High-quality video content for visual learners',
    icon: <Video className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Academic Courses',
    title: 'Academic Courses',
    description: 'University courses from top institutions covering ML, AI and NLP',
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Research Papers',
    title: 'Research Papers',
    description: 'Latest research papers and technical reports in the field',
    icon: <FileText className="w-6 h-6 text-primary" />,
  },
];

export const CategoryGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['resources', selectedCategory],
    queryFn: async () => {
      const response = await fetch(selectedCategory 
        ? `/api/resources/${encodeURIComponent(selectedCategory)}`
        : '/api/resources'
      );
      if (!response.ok) throw new Error('Failed to fetch resources');
      return response.json();
    },
  });

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6"
      >
        {categories.map((category) => (
          <FloatingButton
            key={category.id}
            onClick={() => setSelectedCategory(
              selectedCategory === category.id ? null : category.id
            )}
            className={`w-full h-14 ${
              selectedCategory === category.id ? 'bg-primary/30' : ''
            }`}
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      >
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <ResourceCard
              key={index}
              title=""
              description=""
              icon={<div />}
              index={index}
              isLoading={true}
            />
          ))
        ) : resources?.map((resource, index) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ResourceCard
              title={resource.title}
              description={resource.description}
              icon={<img src={resource.icon_url} alt="" className="w-6 h-6" />}
              index={index}
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
};
