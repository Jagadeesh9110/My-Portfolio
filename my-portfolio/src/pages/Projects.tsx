import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import AIChatbot from '@/components/AIChatbot';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

// 1. --- CONSTANTS ---
// All this data is now created only ONCE, not on every render.
const projectsData = [
  {
    id: 1,
    title: 'AI-Powered Content Generator',
    description: 'A full-stack application that uses advanced LLMs to generate high-quality content for various use cases.',
    longDescription: 'This project leverages state-of-the-art language models to create an intelligent content generation platform. Built with React, Node.js, and integrated with OpenAI APIs, it features real-time content generation, user authentication, and a responsive design.',
    image: '/placeholder.svg',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/jagadeswar/ai-content-generator',
    liveUrl: 'https://ai-content-gen-demo.com',
    featured: true,
    lighthouseScore: 95,
    category: 'AI/ML'
  },
  {
    id: 2,
    title: 'Smart Analytics Dashboard',
    description: 'A comprehensive data visualization platform with real-time analytics and machine learning insights.',
    longDescription: 'An advanced analytics dashboard built with modern web technologies and machine learning algorithms. Features include real-time data processing, predictive analytics, interactive visualizations, and automated reporting.',
    image: '/placeholder.svg',
    technologies: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL', 'D3.js', 'AWS'],
    githubUrl: 'https://github.com/jagadeswar/analytics-dashboard',
    liveUrl: 'https://analytics-dashboard-demo.com',
    featured: true,
    lighthouseScore: 92,
    category: 'Data Science'
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A modern, scalable e-commerce solution with advanced features and seamless user experience.',
    longDescription: 'A full-featured e-commerce platform built with modern technologies. Includes user authentication, payment processing, inventory management, order tracking, and an admin dashboard.',
    image: '/placeholder.svg',
    technologies: ['React', 'Node.js', 'Stripe API', 'Redis', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/jagadeswar/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    featured: false,
    lighthouseScore: 89,
    category: 'Full Stack'
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: 'A scalable chat application with real-time messaging, file sharing, and group management.',
    longDescription: 'A modern chat application built with Socket.io and React. Features include real-time messaging, file sharing, group chat, user authentication, message encryption, and mobile responsiveness.',
    image: '/placeholder.svg',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT', 'Cloudinary'],
    githubUrl: 'https://github.com/jagadeswar/chat-app',
    liveUrl: 'https://chat-app-demo.com',
    featured: false,
    lighthouseScore: 91,
    category: 'Full Stack'
  },
];

const categories = ['All', 'AI/ML', 'Full Stack', 'Data Science'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type Project = typeof projectsData[0];

// 2. --- CHILD COMPONENT: ProjectCard ---
// This component is wrapped in React.memo to prevent re-rendering
// if its props (project, onSelect) have not changed.

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard = memo(({ project, onSelect }: ProjectCardProps) => {
  // Memoize click handlers to prevent creating new functions on render
  const handleGithubClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    window.open(project.githubUrl, '_blank');
  }, [project.githubUrl]);

  const handleLiveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    window.open(project.liveUrl, '_blank');
  }, [project.liveUrl]);

  const handleSelectProject = useCallback(() => {
    onSelect(project);
  }, [project, onSelect]);

  return (
    <motion.div variants={itemVariants} layout className="group">
      <Card className="glass-effect hover-glow h-full transition-all duration-500 group-hover:scale-105 cursor-pointer overflow-hidden">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-lightest-navy to-dark-slate rounded-t-lg flex items-center justify-center">
            <div className="text-4xl font-bold text-neon-blue/30">
              {project.title.charAt(0)}
            </div>
          </div>
          
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-neon-green text-dark-navy">
                <FiStar className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          <div className="absolute inset-0 bg-dark-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <Button
              size="sm"
              onClick={handleGithubClick}
              className="bg-lightest-navy hover:bg-neon-blue hover:text-dark-navy"
            >
              <FiGithub className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleLiveClick}
              className="bg-lightest-navy hover:bg-neon-blue hover:text-dark-navy"
            >
              <FiExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6" onClick={handleSelectProject}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-lightest-slate group-hover:text-neon-blue transition-colors">
              {project.title}
            </h3>
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
          </div>

          <p className="text-light-slate text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-lightest-navy/50 text-light-slate"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-lightest-navy/50 text-light-slate">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate">
            <span>Lighthouse Score</span>
            <span className="text-neon-green font-medium">{project.lighthouseScore}/100</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

// 3. --- CHILD COMPONENT: ProjectModal ---
// Also memoized. This component only renders when 'project' is not null,
// and it won't re-render if its props don't change.

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  if (!project) return null; // Render nothing if no project is selected

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect border-neon-blue/20">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-lightest-navy to-dark-slate flex items-center justify-center rounded-lg">
            <div className="text-6xl font-bold text-neon-blue/30">
              {project.title.charAt(0)}
            </div>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-lightest-slate mb-6">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => window.open(project.githubUrl, '_blank')}
              className="bg-lightest-navy hover:bg-neon-blue hover:text-dark-navy"
            >
              <FiGithub className="w-4 h-4 mr-2" />
              Code
            </Button>
            <Button
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="bg-neon-blue hover:bg-neon-blue/90 text-dark-navy"
            >
              <FiExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </div>

          <p className="text-light-slate text-lg leading-relaxed">
            {project.longDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-neon-blue mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-lightest-navy/50 text-light-slate border border-neon-blue/20"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neon-blue mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-light-slate">Lighthouse Score</span>
                  <span className="text-neon-green font-semibold">{project.lighthouseScore}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-slate">Category</span>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                {project.featured && (
                  <div className="flex justify-between items-center">
                    <span className="text-light-slate">Status</span>
                    <Badge className="bg-neon-green text-dark-navy">
                      <FiStar className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

// 4. --- MAIN PAGE COMPONENT ---
// This is now much cleaner. It only manages state and renders the layout.
// All the heavy lifting is done by the memoized child components.

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // useMemo ensures this filtering logic only re-runs when
  // activeCategory changes. projectsData is stable.
  const filteredProjects = useMemo(() => {
    return activeCategory === 'All'
      ? projectsData
      : projectsData.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  // useCallback ensures these functions are not re-created on every render
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleSetCategory = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <div className="min-h-screen bg-dark-navy">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-dark-navy to-light-navy">
        <div className="max-w-6xl mx-auto section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="font-mono text-neon-blue mr-4">02.</span>
              My Projects
            </h1>
            <p className="text-xl text-light-slate max-w-3xl mx-auto">
              A collection of projects that showcase my skills in full-stack development,
              artificial intelligence, and modern web technologies.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleSetCategory(category)} // Uses memoized handler
                variant={activeCategory === category ? "default" : "outline"}
                className={`${
                  activeCategory === category
                    ? 'bg-neon-blue text-dark-navy'
                    : 'glass-effect text-light-slate hover:bg-neon-blue/10 hover:text-neon-blue'
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-light-navy">
        <div className="max-w-7xl mx-auto section-padding">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onSelect={handleSelectProject} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />

      <AIChatbot />
    </div>
  );
};

export default Projects;