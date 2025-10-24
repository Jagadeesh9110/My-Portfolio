import React, { useEffect, useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiCode, FiTarget } from 'react-icons/fi';
import { Trophy } from 'lucide-react';

//  All constants moved outside the component to optmize the performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const achievements = [
  {
    icon: Trophy,
    title: 'LeetCode Rating',
    value: '1500',
    label: 'Highest Contest Rating',
    color: 'text-neon-green',
  },
  {
    icon: FiCode,
    title: 'Problems Solved',
    value: '385',
    label: 'Total on LeetCode',
    color: 'text-neon-blue',
  },
  {
    icon: FiTarget,
    title: 'Weekly Contests',
    value: 'Active',
    label: 'Regular Participant',
    color: 'text-neon-green',
  },
];

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Jagadeesh9110', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/jagadeeswar-reddy-manyam', label: 'LinkedIn' },
  { icon: FiMail, href: 'manyamjagadeeswar7989@gmail.com', label: 'Email' },
];

//  Created a new memoized component for the static content
const MemoizedHeroContent = memo(() => {
  return (
    <>
      {/* Profile Photo */}
      <motion.div variants={itemVariants} className="mb-8 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-green p-1 animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-dark-navy"></div>
          </div>
          <Avatar className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-transparent hover-glow transition-all duration-300">
            <AvatarImage
              src="/profile.jpg"
              alt="Manyam Jagadeswar Reddy"
              className="object-cover"
            />
            <AvatarFallback className="bg-lightest-navy text-neon-blue text-2xl md:text-3xl font-bold">
              MJR
            </AvatarFallback>
          </Avatar>
          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <span className="font-mono text-neon-blue text-sm md:text-base">
          Hi, my name is
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-lightest-slate mb-4"
      >
        Manyam Jagadeswar Reddy
      </motion.h1>

      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate mb-8"
      >
        I build intelligent digital experiences.
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        I'm a Full Stack AI Engineer specializing in creating exceptional digital
        solutions that live at the intersection of design, technology, and
        artificial intelligence.
      </motion.p>

      {/* Achievements Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="text-xl md:text-2xl font-bold text-neon-blue mb-6 font-mono">
          Competitive Programming Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="glass-effect p-6 hover-glow group transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <achievement.icon
                    className={`w-8 h-8 mb-3 ${achievement.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <div
                    className={`text-2xl md:text-3xl font-bold ${achievement.color} mb-2`}
                  >
                    {achievement.value}
                  </div>
                  <div className="text-lightest-slate font-semibold mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-slate text-sm">
                    {achievement.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* LeetCode Problem Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <Card className="glass-effect p-6 hover-glow">
            <h4 className="text-lg font-semibold text-neon-green mb-4">
              Problem Difficulty Breakdown
            </h4>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-green-500/20 text-green-400 border-green-500/30 mb-2"
                >
                  Easy
                </Badge>
                <div className="text-xl font-bold text-lightest-slate">150</div>
              </div>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-2"
                >
                  Medium
                </Badge>
                <div className="text-xl font-bold text-lightest-slate">224</div>
              </div>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className="bg-red-500/20 text-red-400 border-red-500/30 mb-2"
                >
                  Hard
                </Badge>
                <div className="text-xl font-bold text-lightest-slate">11</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
      >
        <Button
          size="lg"
          className="bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-navy font-medium px-8 py-4 rounded-lg transition-all duration-300 group"
        >
          <FiDownload className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          Download Resume
        </Button>

        <div className="flex items-center space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="p-3 text-light-slate hover:text-neon-blue hover:-translate-y-1 transition-all duration-300 hover-glow rounded-lg glass-effect"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <social.icon className="w-6 h-6" />
              <span className="sr-only">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-light-slate rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-light-slate rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </>
  );
});

//  The main Hero component now only handles state and minimal JSX
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []); // Memoized handler

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]); 

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-light-navy to-dark-navy animate-gradient-shift opacity-90" />

      {/* Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-neon-blue/30 rotate-45"
        animate={{
          y: [0, -20, 0],
          rotate: [45, 75, 45],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-neon-green/10 rounded-full"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Main Content (this div moves) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto section-padding text-center"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        {/* 4. Render the memoized content, which will not re-render on mouse move */}
        <MemoizedHeroContent />
      </motion.div>
    </section>
  );
};

export default Hero;