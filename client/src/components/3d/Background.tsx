import { motion } from 'framer-motion';
import Ripple from '../ui/ripple';

export const Background = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-[500px] overflow-hidden bg-gradient-to-br from-black/90 to-black"
    >
      <div className="absolute inset-0 z-0">
        <Ripple />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <p className="text-5xl font-medium tracking-tighter text-white">
          Welcome to LLM Resources Hub
        </p>
      </div>
    </motion.div>
  );
};
