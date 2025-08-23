import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Get started with core AI tools at no cost',
      features: [
        'Compare ads from Meta + Google',
        'Basic AI ad copy suggestions (text only)',
        '3 AI-generated ad creatives per month'
      ],
      popular: false
    },
    {
      name: 'Starter',
      monthlyPrice: 9,
      yearlyPrice: 90,
      description: 'Perfect for small businesses getting started with AI advertising',
      features: [
        'Compare ads from Meta + Google',
        'Basic AI ad copy suggestions (text only)',
        '10 AI-generated ad creatives per month',
        'Performance insights (CTR, CPC, ROI trends)',
        'Save & export reports (PDF/CSV)',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: 'Advanced AI advertising for growing businesses',
      features: [
        'Unlimited ad comparisons (Meta, Google, LinkedIn, TikTok, X, YouTube)',
        'Advanced AI ad generation (text + image + templates)',
        '50 AI-generated ad creatives per month',
        'Competitor ad benchmarking',
        'Keyword & audience insights',
        'A/B testing recommendations',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete AI advertising solution for large organizations',
      features: [
        'Unlimited ad comparisons (Meta, Google, LinkedIn, TikTok, X, YouTube)',
        'Auto-generate ad videos with AI',
        'White-label dashboard',
        'Team collaboration & role-based access',
        'Dedicated account manager',
        'API access for automation',
        'Custom integrations (CRM, Analytics, etc.)',
        '24/7 premium support'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Advertising <span className="text-gradient">Made Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose a plan that matches your business goals. 
            Unlock data-driven insights, creative generation, and smarter ad decisions.
          </p>
        </motion.div>

        {/* Billing Toggle - Positioned above Enterprise plan */}
        <div className="flex justify-end mb-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {billingCycle === 'yearly' && (
              <span className="inline-flex items-center bg-green-500/10 text-green-600 text-xs px-2 py-1 rounded-full font-medium border border-green-500/20">
                Save 17%
              </span>
            )}
            <span className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                billingCycle === 'yearly' ? 'bg-primary shadow-lg' : 'bg-muted-foreground/20'
              }`}
              style={{
                boxShadow: billingCycle === 'yearly' ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-all duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`pricing-card ${plan.popular ? 'featured' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 bg-yellow-500/15 border border-yellow-400/30 text-yellow-300"
                    style={{ boxShadow: '0 0 18px rgba(250, 204, 21, 0.35), 0 0 6px rgba(250, 204, 21, 0.5)' }}
                  >
                    <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.price === 'Custom' ? (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold">
                        ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`${plan.popular ? 'btn-primary w-full' : 'btn-outline w-full'} text-white`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;