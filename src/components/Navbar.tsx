import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard'; // kept from main

  const [scrolled, setScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY.current) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      
      if (currentScrollY > 40 && !isScrollingUp) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollingUp]);

  const handleNavigateToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      scrollToSection(sectionId);
    }
  };

  const navItems = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const edgeDistance = 200;

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-border/50"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="relative w-full h-[72px] flex items-center justify-center">
        <div className="flex items-center justify-center gap-x-6 w-full relative">
          
          {/* Left Circle: Logo */}
          <motion.div
            animate={scrolled ? { x: -edgeDistance } : { x: 0 }}
            transition={{ type: 'spring', stiffness: 40, damping: 18, duration: 2.3 }}
            className="flex-shrink-0 flex items-center justify-center rounded-full border border-border/20 bg-black/40 backdrop-blur-md px-6 py-2 min-w-[170px] min-h-[56px] shadow-lg z-10"
          >
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
              <img
                src="AD_logo-removebg-preview.png"
                alt="ADVision logo"
                className="w-8 h-8 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.6)] object-cover"
              />
              <span className="text-xl font-medium text-gray-300">Vision</span>
            </div>
          </motion.div>

          {/* Center Circle: Nav Links */}
          <motion.div
            animate={scrolled ? { opacity: 0, scale: 0.7, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="hidden md:flex items-center justify-center rounded-full border border-border/20 bg-black/40 backdrop-blur-md px-10 py-2 min-w-[400px] min-h-[56px] shadow-lg"
            style={{ pointerEvents: scrolled ? 'none' : 'auto' }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavigateToSection(item.href.replace('#', ''))}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="mx-4 text-muted-foreground hover:text-foreground transition-colors duration-300 relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Circle: Get Started */}
          {!isDashboard && (
            <motion.div
              animate={scrolled ? { x: edgeDistance } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 40, damping: 18, duration: 2.3 }}
              className="flex-shrink-0 flex items-center justify-center rounded-full border border-border/20 bg-black/40 backdrop-blur-md px-6 py-2 min-w-[170px] min-h-[56px] shadow-lg z-10"
            >
              <div className="hidden md:block w-full">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="btn-outline w-full"
                >
                  Get started
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground ml-4 absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pb-4"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigateToSection(item.href.replace('#', ''));
                  setIsOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-left"
              >
                {item.name}
              </button>
            ))}
            {!isDashboard && (
              <Button 
                variant="outline" 
                onClick={() => {
                  navigate('/dashboard');
                  setIsOpen(false);
                }}
                className="btn-outline w-full"
              >
                Get started
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
