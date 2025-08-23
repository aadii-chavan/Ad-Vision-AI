import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="expertise" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
      {/* Removed grid-bg and lightning background for clean Threads background */}
      <div className="relative container mx-auto px-6 text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Next-Gen Ad Tech</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight whitespace-nowrap text-white text-center"
          >
            Your Vision, Our Ads
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base md:text-lg font-semibold tracking-wide text-[#999999] mb-12 max-w-3xl mx-auto text-center"
          >
            AI-powered campaigns that create, analyze, optimize, and outsmart the competition so every ad you run isn't just seen, it performs.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button className="bg-blue-500 text-white hover:bg-blue-700 px-6 py-2 text-base font-semibold rounded-lg">
              Request Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-6 py-2 text-base font-semibold rounded-lg">
              <Play className="mr-2 h-4 w-4" />
              Explore Features
            </Button>
          </motion.div>
        </motion.div>

        {/* Removed stats section for a cleaner, centered hero */}
      </div>
    </section>
  );
};

export default Hero;