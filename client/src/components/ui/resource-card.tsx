import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  isLoading?: boolean;
}

export const ResourceCard = ({ title, description, icon, index, isLoading = false }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      dragSnapToOrigin
      className="h-full"
    >
      <Card className={cn(
        "h-full p-6 bg-card/50 backdrop-blur-sm border-muted",
        "hover:border-primary/50 transition-all duration-300",
        "transform perspective-1000",
        isLoading && "animate-pulse"
      )}>
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-primary/10">
            {isLoading ? (
              <div className="w-6 h-6 rounded-full bg-primary/20" />
            ) : icon}
          </div>
          <div className="space-y-1 flex-1">
            {isLoading ? (
              <>
                <div className="h-6 bg-primary/20 rounded w-3/4" />
                <div className="h-4 bg-primary/10 rounded w-full" />
              </>
            ) : (
              <>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
