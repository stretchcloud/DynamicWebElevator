import { motion } from 'framer-motion';
import { SearchBar } from '../components/ui/search-bar';
import { CategoryGrid } from '../components/ui/category-grid';
import { Button } from '../components/ui/button';
import { Zap } from 'lucide-react';
import { Meteors } from '../components/ui/meteors';

import { SidebarNav } from '../components/ui/sidebar-nav';

export const Home = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-background/80">
      <SidebarNav className="border-r border-border/50 backdrop-blur-sm" />
      <div className="flex flex-col">
        <div className="relative h-[400px] overflow-hidden">
          <Meteors className="absolute inset-0" />
          <main className="container mx-auto px-4 py-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 mb-8"
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl md:text-6xl font-bold"
              >
                Welcome to LLM Resources Hub
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Your one-stop destination for all the resources you need to excel in your
                LLM program.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  size="lg"
                  className="bg-primary/90 hover:bg-primary"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Find Your Learning Path
                  <span className="ml-2 text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
            >
              <SearchBar />
            </motion.div>
          </main>
        </div>
        <div className="px-4 pb-4">
          <CategoryGrid />
        </div>
      </div>
    </div>
  );
};
