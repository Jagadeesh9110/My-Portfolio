import React, { memo } from 'react';
import { motion, type Variants } from 'framer-motion'; 
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillConstellation } from './SkillConstellation';

import {
  SiGit,
  SiGithub,
  SiVsco, 
  SiVercel,
  SiNetlify,
  SiRender,
  SiGithubactions,
} from 'react-icons/si';

const tools = [
  { name: 'VS Code', icon: SiVsco, color: '#007ACC' }, 
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#E8E8E8' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'Vercel', icon: SiVercel, color: '#E8E8E8' },
  { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
  { name: 'Render', icon: SiRender, color: '#46E3B7' },
];


const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const toolItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const About = memo(() => {
  return (
    <section className="py-20 bg-dark-navy relative">
      <div className="max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="font-mono text-neon-blue mr-4">01.</span>
            About Me
          </h2>
          <div className="w-24 h-1 bg-neon-blue mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-8 hover-glow">
              <h3 className="text-2xl font-bold text-neon-blue mb-6">
                Background
              </h3>
              <div className="space-y-4 text-light-slate">
                <p>
                  I'm a passionate Full Stack AI Engineer with a B.Tech in Data
                  Science from IIIT Dharwad and a minor in Generative AI. I love
                  creating intelligent solutions that bridge the gap between
                  complex AI technologies and user-friendly applications.
                </p>
                <p>
                  My journey in tech started with web development, but I quickly
                  discovered my passion for artificial intelligence and machine
                  learning. Today, I specialize in building full-stack
                  applications that leverage cutting-edge AI technologies to
                  solve real-world problems.
                </p>
                <p>
                  When I'm not coding, you can find me exploring the latest AI
                  research papers, contributing to open-source projects, or
                  experimenting with new technologies that push the boundaries
                  of what's possible.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="glass-effect p-8 hover-glow">
              <h3 className="text-2xl font-bold text-neon-blue mb-6">
                Education
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-lightest-slate">
                    B.Tech in Data Science
                  </h4>
                  <p className="text-neon-blue font-medium">IIIT Dharwad</p>
                  <p className="text-slate text-sm">2020 - 2024</p>
                  <p className="text-light-slate mt-2">
                    Full-Stack development • Minor in Generative AI • Focus on Machine Learning, Deep
                    Learning, and AI Applications. 
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8 hover-glow">
              <h3 className="text-2xl font-bold text-neon-blue mb-6">
                Learning Path
              </h3>
              <div className="space-y-3 text-light-slate">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
                  Deep Learning & Transformers (CNNs, LLMs)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
                  Advanced ML Frameworks (JAX, Flax)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
                  MLOps & AI Infrastructure (Docker, Kubernetes)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
                  Systems Programming (Rust & Go)
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Skills Section */}
        <SkillConstellation />

        {/* --- TOOLS SECTION --- */}
        <div className="mt-24">
          {/* Tools Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-center mb-4">Tools I Use</h3>
            <div className="w-20 h-1 bg-neon-blue mx-auto rounded-full" />
          </motion.div>

          {/* Staggered Tools Grid */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Animation triggers when 20% is in view
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6"
          >
            {tools.map((tool) => (
              <motion.div key={tool.name} variants={toolItemVariants}>
                <Card className="glass-effect hover-glow p-6 flex flex-col items-center justify-center aspect-square transition-all duration-300 group">
                  <tool.icon
                    className="w-12 h-12 mb-3 text-light-slate group-hover:scale-110 transition-transform duration-300"
                    style={{ color: tool.color }} // Apply the specific tool color
                  />
                  <p className="text-sm font-medium text-light-slate group-hover:text-lightest-slate transition-colors">
                    {tool.name}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* --- END: TOOLS SECTION --- */}
        
      </div>
    </section>
  );
});

export default About;