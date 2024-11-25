import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export const ResourceCard = ({ title, description, icon, index }: ResourceCardProps) => {
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
        "transform perspective-1000"
      )}>
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
