import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { FileQuestion, Globe, Github } from 'lucide-react';
import { useState, isValidElement } from 'react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode | string;
  index: number;
  isLoading?: boolean;
  url?: string;
}

export const ResourceCard = ({ title, description, icon, index, url }: ResourceCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoadingIcon, setIsLoadingIcon] = useState(true);

  const renderIcon = () => {
    if (isLoadingIcon) {
      return <div className="w-6 h-6 rounded-full bg-primary/20 animate-pulse" />;
    }

    if (typeof icon === 'string') {
      if (imageError) {
        // Use category-specific fallback icons
        const fallbackIcon = url?.includes('github.com') ? 
          <Github className="w-6 h-6 text-primary" /> : 
          <Globe className="w-6 h-6 text-primary" />;
        return fallbackIcon;
      }
      return (
        <img
          src={icon}
          alt=""
          className="w-6 h-6 object-contain"
          onLoad={() => setIsLoadingIcon(false)}
          onError={() => {
            setImageError(true);
            setIsLoadingIcon(false);
          }}
          loading="lazy"
        />
      );
    }

    // If icon is a React node (Lucide icon), render it directly
    if (isValidElement(icon)) {
      setIsLoadingIcon(false);
      return icon;
    }

    setIsLoadingIcon(false);
    return <FileQuestion className="w-6 h-6 text-primary" />;
  };
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
            {renderIcon()}
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg">{title || (
              <div className="h-6 bg-primary/20 rounded w-3/4 animate-pulse" />
            )}</h3>
            <p className="text-sm text-muted-foreground">{description || (
              <div className="h-4 bg-primary/10 rounded w-full animate-pulse" />
            )}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
