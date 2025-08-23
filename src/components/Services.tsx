import { motion } from 'framer-motion';
import { BarChart3, Sparkles, PiggyBank, TrendingUp, Eye, Target } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: BarChart3,
      title: 'Compare Ads',
      description: 'Side-by-side analysis of your ads vs. competitor ads. See what\'s working for them and what you can improve.'
    },
    {
      icon: Sparkles,
      title: 'AI Ad Generation',
      description: 'Instantly create ad copies, creatives, and targeting ideas powered by AI. Sleek, fast, and tailored to your niche.'
    },
    {
      icon: PiggyBank,
      title: 'Smart Budgeting',
      description: 'AI-driven suggestions on how to split your budget across Google, Meta, LinkedIn, etc., for the best ROI.'
    },
    {
      icon: TrendingUp,
      title: 'Ad Performance Dashboard',
      description: 'A clean, detailed view of impressions, CTR, conversions, and engagement across all platforms.'
    },
    {
      icon: Eye,
      title: 'Competitor Insights',
      description: 'NLP + CV analysis of competitor ad text, images, and videos. Uncover patterns that make their ads click.'
    },
    {
      icon: Target,
      title: 'Predictive Success Score',
      description: 'AI predicts how likely your ad is to succeed before you launch it. Know what works before spending a dollar.'
    }
  ];

  return (
    <section id="services" className="py-8 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Advertising Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform Your Ad Campaigns with AI-Powered Insights and Optimization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black border border-gray-700 rounded-lg p-6 text-center group hover:border-gray-600 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:shadow-[0_-10px_30px_rgba(59,130,246,0.8)] transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;