import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Zap, Rocket, Mail, ArrowRight, Shield, Users, Globe } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const productLinks = [
    { name: 'AI Campaign Builder', href: '#' },
    { name: 'Analytics Dashboard', href: '#' },
    { name: 'Creative Studio', href: '#' },
    { name: 'Performance Tracking', href: '#' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src="AD_logo-removebg-preview.png"
                alt="ADVision logo"
                className="w-10 h-10 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.6)] object-cover"
              />
              <span className="text-2xl font-medium text-gray-300">Vision</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transform your advertising with AI-powered insights, creative automation, and performance optimization.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-700 hover:from-blue-600 hover:to-blue-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-400" />
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold mb-6 text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest AI advertising insights and tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 py-6 border-t border-gray-800/50"
        >
          <a href="#expertise" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
            <Zap className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 text-blue-400" />
            Expertise
          </a>
          <a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
            <Rocket className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 text-blue-400" />
            Services
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
            <Shield className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 text-blue-400" />
            Pricing
          </a>
          <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group">
            <Globe className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 text-blue-400" />
            Contact
          </a>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI-Powered
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Open Source
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Enterprise Ready
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Security</a>
              <span>© 2025 ADVision</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;