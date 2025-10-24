// src/components/SkillConstellation.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Icons (No Change) ---
import {
  SiReact, SiNodedotjs, SiTypescript, SiExpress, SiTailwindcss,
  SiFramer, SiReactrouter, SiRedux, SiPython, SiScikitlearn,
  SiPandas, SiNumpy, SiOpencv, SiMlflow, SiTensorflow,
  SiPytorch, SiJavascript, SiHtml5, SiCss3, SiNextdotjs,
  SiMongodb, SiShadcnui, SiGit,
  SiJsonwebtokens, SiAuth0, SiLangchain, SiOpenai, SiHuggingface
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import { AiOutlineApi } from 'react-icons/ai';

// --- Skills Data (No Change) ---
const skills = {
  'Web Development': [
    'React/Next.js', 'TypeScript', 'Node.js', 'Express.js',
    'HTML5/CSS3', 'Tailwind CSS', 'REST APIs', 'ShadCN UI',
    'Framer Motion', 'React Router', 'Redux Toolkit', 'JavaScript',
    'JWT',
    'Social OAuth',
    'MongoDB',
  ],
  'Machine Learning': [
    'Python', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'MLflow', 'TensorFlow', 'PyTorch'
  ],
  'Generative AI': [
    'LLMs', 'RAG', 'Vector Databases', 'Langchain', 'OpenAI API', 'Hugging Face'
  ],
};

// --- Icon Mapping (No Change) ---
const SKILL_ICONS: { [key: string]: React.ElementType } = {
  'React/Next.js': SiNextdotjs,
  'React': SiReact,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'HTML5/CSS3': SiHtml5,
  'Tailwind CSS': SiTailwindcss,
  'REST APIs': AiOutlineApi,
  'ShadCN UI': SiShadcnui,
  'Framer Motion': SiFramer,
  'React Router': SiReactrouter,
  'Redux Toolkit': SiRedux,
  'Python': SiPython,
  'Scikit-learn': SiScikitlearn,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'OpenCV': SiOpencv,
  'MLflow': SiMlflow,
  'TensorFlow': SiTensorflow,
  'PyTorch': SiPytorch,
  'LLMs': FaDatabase,
  'RAG': SiGit,
  'Vector Databases': FaDatabase,
  'Langchain': SiLangchain,
  'OpenAI API': SiOpenai,
  'Hugging Face': SiHuggingface,
  'JWT': SiJsonwebtokens,
  'Social OAuth': SiAuth0,
  'MongoDB': SiMongodb,
};


// --- Animation Variants ---
const containerVariants = { // For the grid of nebulas
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = { // For each nebula item
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const skillContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// ---  Variants for the dot ---
const dotVariants = {
  hidden: { opacity: 1 },         // dots stay visible initially
  visible: { opacity: 0, transition: { duration: 0.1 } }, // dots fade out on hover
};

// ---  Variants for animating the tooltip outwards ---
const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    x: '-50%', 
    y: 0,
    transition: { duration: 0.2 },
  },
  visible: (i: { index: number; total: number; radius: number }) => {
    const angle = (i.index / i.total) * 2 * Math.PI;
    const xOffset = Math.cos(angle) * i.radius;
    const yOffset = Math.sin(angle) * i.radius;
    return {
      opacity: 1,
      scale: 1,
      x: `calc(-50% + ${xOffset}px)`,
      y: `${yOffset}px`,
      transition: { duration: 0.3 },
    };
  },
};


const getStarPosition = () => ({
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`,
});

export const SkillConstellation = () => {
  const starPositions = useMemo(() => {
    const positions: { [key: string]: { top: string; left: string }[] } = {};
    Object.entries(skills).forEach(([category, skillList]) => {
      const displayCount = Math.min(skillList.length, 8);
      positions[category] = skillList.slice(0, displayCount).map(() => getStarPosition());
    });
    return positions;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-16">
        <span className="font-mono text-neon-blue mr-4">02.</span>
        Skills & Technologies
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-24 items-start justify-center" // gap-24 for spacing
      >
        {Object.entries(skills).map(([category, skillList], index) => {
          const colors = [
            { nebula: 'nebula-blue', text: 'text-neon-blue' },
            { nebula: 'nebula-green', text: 'text-neon-green' },
            { nebula: 'nebula-purple', text: 'text-fuchsia-400' },
          ];
          const color = colors[index % colors.length];
          const displaySkills = skillList.slice(0, 8); // Consistent limit
          const radius = 130; // Radius for skills to animate outwards (adjust as needed)

          return (
            // Controls hover state for children 
            <motion.div
              key={category}
              variants={itemVariants}
              initial="hidden"
              whileHover="visible" // Animate children on hover
              animate="hidden"     // Ensure children return to hidden state
              className="relative group flex flex-col items-center gap-4"
            >
              {/* Nebula Orb */}
              <div
                className={`nebula ${color.nebula} w-56 h-56 md:w-64 md:h-64 cursor-pointer`}
              ></div>
              {/* Category Title */}
              <h3 className={`text-xl font-bold tracking-wider ${color.text}`}>
                {category}
              </h3>
              <motion.div
                variants={skillContainerVariants}
                className="absolute top-1/2 left-1/2 w-0 h-0" 
              >
                {displaySkills.map((skill, skillIndex) => {
                  const IconComponent = SKILL_ICONS[skill];
                  const { top, left } = starPositions[category][skillIndex];

                  return (
                    <motion.div
                      key={skill}
                      className="absolute"
                      // Use initial random position for the dot
                      style={{ top, left, transform: 'translate(-50%, -50%)' }}
                    >
                      {/* --- Dot hides on hover --- */}
                      <motion.div
                        variants={dotVariants}
                        className="w-3 h-3 bg-white/80 rounded-full"
                      />

                      {/* --- Tooltip animates outwards --- */}
                      <motion.span
                        custom={{ index: skillIndex, total: displaySkills.length, radius }} 
                        variants={tooltipVariants}
                        className="skill-tooltip absolute z-10 w-max px-3 py-1.5 text-sm font-mono
                                   flex items-center justify-center
                                   bg-lightest-navy text-neon-blue rounded-lg
                                   pointer-events-none origin-center" // Ensure scale radiates from center
                        style={{ top: 0, left: 0 }}
                      >
                        {IconComponent && <IconComponent className="mr-2" size={16} />}
                        {skill}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};