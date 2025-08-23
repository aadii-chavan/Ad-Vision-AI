import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cloud, Server, Smartphone, Globe, Users, BarChart3 } from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      icon: Cloud,
      label: 'INTELLIGENCE',
      title: 'Competitor Ad Intelligence',
      description: 'Track and analyze competitor advertising across platforms with automated insights and forecasting.',
      features: ['Aggregate ad data from Meta, Google, LinkedIn, Open Ads, etc.', 'Real-time alerts on new competitor campaigns.', 'Forecast competitor ad spend with ML.']
    },
    {
      icon: Server,
      label: 'CREATION',
      title: 'AI-Powered Campaign Creation',
      description: 'Use Generative AI to create ad copies, creatives, and targeting ideas with automated workflows.',
      features: ['Use Generative AI to create ad copies, creatives, and targeting ideas.', 'Automated budget allocation & platform selection.', 'Cross-platform A/B testing simulator.']
    },
    {
      icon: Smartphone,
      label: 'INSIGHTS',
      title: 'Smart Insights & Recommendations',
      description: 'Leverage AI to predict winning ads and drive ROI with automated optimization guidance.',
      features: ['Predict which ads are likely to succeed.', 'Automated optimization suggestions.', 'ROI-focused dashboards with AI-driven insights.']
    },
    {
      icon: Globe,
      label: 'ANALYTICS',
      title: 'Ad Performance Analytics',
      description: 'Deep analytics across creative, copy, and media using NLP and computer vision.',
      features: ['NLP-based competitor ad copy analysis.', 'Computer vision to analyze images/videos in ads.', 'Engagement and conversion predictions.']
    },
    {
      icon: Users,
      label: 'WORKFLOWS',
      title: 'Campaign Management Dashboard',
      description: 'Unified, exportable dashboards to track your campaigns vs competitors across platforms.',
      features: ['Unified view of all platforms (Google, Meta, LinkedIn, etc.).', 'Track competitor vs. your campaigns.', 'Exportable and customizable dashboards.']
    },
    {
      icon: BarChart3,
      label: 'TRUST',
      title: 'Trust & Explainability',
      description: 'Transparency into AI decisions so teams understand and trust recommendations.',
      features: ['Transparency into why AI suggests certain campaigns.', 'Clear reasoning for budget recommendations.', 'Build user confidence in AI-driven decisions.']
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -4 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
  };

  return (
    <section id="solutions" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 inline-block relative">
            AI Advertising <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI solutions to plan, create, analyze, and optimize ads across every platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -100px 0px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{
                type: 'spring' as const,
                stiffness: 110,
                damping: 22,
                mass: 0.9,
                delay: (index % 2 === 0 ? 0 : 0.04) + Math.floor(index / 2) * 0.04,
              }}
              viewport={{ once: true, amount: 0.5, margin: '0px 0px -80px 0px' }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.995 }}
              className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
              style={{ perspective: 1000 }}
            >
              {/* Glow pulse */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ boxShadow: '0 0 0px rgba(59,130,246,0)' }}
                whileHover={{ boxShadow: '0 0 40px rgba(59,130,246,0.25)' }}
                transition={{ duration: 0.3 }}
              />
              {/* Sheen sweep */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-y-8 -left-40 w-40 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                whileHover={{ x: 400 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="flex flex-col items-center text-center gap-5">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: (index % 3) * 0.2 }}
                >
                  <solution.icon className="h-6 w-6 text-primary" />
                </motion.div>

                <span className="text-xs tracking-[0.2em] font-semibold text-primary/80">
                  {solution.label}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                <ul className="space-y-2 mb-4 w-full">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-left">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="text-primary hover:text-primary-glow hover:bg-primary/10 p-0 h-auto group/btn">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;