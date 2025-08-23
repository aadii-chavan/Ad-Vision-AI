import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ContactProps {
  onContactClick: () => void;
}

const Contact = ({ onContactClick }: ContactProps) => {
  return (
    <section className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 relative">
        {/* Main Container Box */}
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-16 rounded-3xl border border-blue-400/50 bg-transparent backdrop-blur-sm shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Grid Overlay Inside Box */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:30px_30px] rounded-3xl"></div>
            
            {/* Crosshairs Inside Box */}
            <div className="absolute top-12 left-12 w-4 h-4 border border-blue-400/30">
              <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/30"></div>
              <div className="absolute left-1/2 top-0 w-px h-full bg-blue-400/30"></div>
            </div>
            <div className="absolute bottom-12 left-12 w-4 h-4 border border-blue-400/30">
              <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/30"></div>
              <div className="absolute left-1/2 top-0 w-px h-full bg-blue-400/30"></div>
            </div>
            <div className="absolute top-1/2 right-16 w-4 h-4 border border-blue-400/30">
              <div className="absolute top-1/2 left-0 w-full h-px bg-blue-400/30"></div>
              <div className="absolute left-1/2 top-0 w-px h-full bg-blue-400/30"></div>
            </div>

            {/* Content Grid */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text and Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-left"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                  Start your journey now<br />
                  transform your business<br />
                  with <span className="text-blue-400">AI Ads</span>
                </h2>
                
                <Button 
                  onClick={onContactClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  Get Started
                </Button>
              </motion.div>

              {/* Right Side - Crazy Animations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex justify-center items-center h-96"
              >
                {/* Floating Particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Central Holographic Card */}
                <motion.div
                  className="relative w-48 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-blue-400/50 shadow-2xl"
                  animate={{
                    rotateY: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-blue-400/30 animate-pulse"></div>
                  
                  {/* Rotating Inner Elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </motion.div>
                  
                  {/* Animated Data Lines */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded mb-2"
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="h-2 bg-gradient-to-r from-purple-400/40 to-blue-400/40 rounded w-3/4"
                      animate={{ width: ["0%", "75%", "0%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Orbiting Elements */}
                <motion.div
                  className="absolute w-64 h-64"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-blue-400 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `rotate(${i * 60}deg) translateX(80px)`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Dynamic Data Streams */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-px bg-gradient-to-b from-blue-400 to-transparent"
                        style={{ height: `${20 + Math.random() * 30}px` }}
                        animate={{
                          height: [20, 50, 20],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pulsing Rings */}
                <motion.div
                  className="absolute w-80 h-80 border border-blue-400/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-64 h-64 border border-purple-400/20 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.05, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />

                {/* Floating Binary Code */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-4">
                    <motion.div
                      className="w-20 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded border border-blue-400/30 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        y: [0, -10, 0],
                        rotateY: [0, 10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-sm text-blue-400 font-mono">10101</span>
                    </motion.div>
                    <motion.div
                      className="w-20 h-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded border border-purple-400/30 flex items-center justify-center backdrop-blur-sm"
                      animate={{
                        y: [0, 10, 0],
                        rotateY: [0, -10, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    >
                      <span className="text-sm text-purple-400 font-mono">11010</span>
                    </motion.div>
                  </div>
                </div>

                {/* Energy Waves */}
                <motion.div
                  className="absolute w-96 h-96"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border border-blue-400/10 rounded-full" />
                  <div className="absolute inset-4 border border-purple-400/10 rounded-full" />
                  <div className="absolute inset-8 border border-blue-400/10 rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;