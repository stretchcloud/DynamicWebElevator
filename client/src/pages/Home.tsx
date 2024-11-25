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
        <div className="relative h-auto min-h-[600px] overflow-hidden py-12">
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
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/80 via-primary to-primary/80"
              >
                The Ultimate AI/ML Resources Hub: Master AI Language Models in 2024
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto"
              >
                Embark on your AI journey with our comprehensive collection of cutting-edge resources. 
                Whether you're a beginner or an expert, discover everything you need to master Large Language Models 
                and stay ahead in the rapidly evolving field of AI.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 space-y-6 max-w-2xl mx-auto text-left"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-primary">Transform your AI journey with access to:</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Comprehensive LLM Tutorials</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Academic Research Papers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Industry Best Practices</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Deployment Strategies</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-primary">Featured Resources Include:</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Latest LLM Research Papers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Model Training Guides</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Optimization Techniques</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>Real-world Applications</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
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
