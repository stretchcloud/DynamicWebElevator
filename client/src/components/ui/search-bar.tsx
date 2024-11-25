import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from './input';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          className="w-full pl-10 pr-4 h-12 bg-background/50 backdrop-blur-sm border-muted"
          placeholder="Search resources..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute w-full mt-2 p-4 bg-background/80 backdrop-blur-sm rounded-lg border border-muted shadow-lg"
          >
            <p className="text-sm text-muted-foreground">Start typing to search...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
