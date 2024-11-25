import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ResourceCard } from './resource-card';
import { useCategoryStore } from './sidebar-nav';
import { 
  Github,
  Database,
  AppWindow,
  Table,
  Box,
  Trophy,
  Users,
  Cloud
} from 'lucide-react';
import { useState } from 'react';

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
    id: 'GitHub Repositories',
    title: 'GitHub Repositories',
    description: 'Essential GitHub repositories for LLM development, training, and deployment',
    icon: <Github className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Data Processing Tools',
    title: 'Data Processing Tools',
    description: 'Tools and utilities for processing, cleaning, and preparing LLM training data',
    icon: <Database className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Open Source Apps / Projects',
    title: 'Open Source Apps / Projects',
    description: 'Ready-to-use applications and implementations',
    icon: <AppWindow className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Datasets',
    title: 'Datasets',
    description: 'High-quality datasets and data collections for LLM training',
    icon: <Table className="w-6 h-6 text-primary" />,
  },
  {
    id: 'Open Source Models',
    title: 'Open Source Models',
    description: 'Collection of open source large language models available for research and deployment',
    icon: <Box className="w-6 h-6 text-primary" />,
  },
  {
    id: 'LLM Leaderboards',
    title: 'LLM Leaderboards',
    description: 'Top benchmarks and leaderboards for comparing LLM performance across different tasks',
    icon: <Trophy className="w-6 h-6 text-primary" />,
  },
  {
    id: 'LLM Communities',
    title: 'LLM Communities',
    description: 'Active communities and forums for LLM developers, researchers, and enthusiasts',
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    id: 'LLM Deployment',
    title: 'LLM Deployment',
    description: 'Tools, frameworks, and platforms for deploying and serving LLM applications',
    icon: <Cloud className="w-6 h-6 text-primary" />,
  },
];

export const CategoryGrid = () => {
  const { selectedCategory } = useCategoryStore();

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
    <div className="space-y-2">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
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
