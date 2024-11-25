import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { Input } from './input';
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

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['resources', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await fetch(`/api/resources/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        {isLoading ? (
          <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        )}
        <Input
          className="w-full pl-8 pr-3 h-10 bg-background/50 backdrop-blur-sm border-muted"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay to allow clicking on results
            setTimeout(() => setIsFocused(false), 200);
          }}
        />
      </div>

      <AnimatePresence>
        {isFocused && (searchQuery || (resources && resources.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute w-full mt-2 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-muted shadow-lg max-h-[60vh] overflow-auto"
          >
            {!searchQuery && (
              <p className="text-sm text-muted-foreground">Start typing to search...</p>
            )}
            {searchQuery && resources?.length === 0 && !isLoading && (
              <p className="text-sm text-muted-foreground">No results found</p>
            )}
            {resources?.map((resource, index) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 last:mb-0"
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};
