import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:manyamjagadeeswar7989@gmail.com',
    color: 'text-red-400',
    handle: 'manyamjagadeeswar7989@gmail.com', // Long email, will test break-all
  },
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/Jagadeesh9110',
    color: 'text-gray-400',
    handle: 'github.com/Jagadeesh9110',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://linkedin.com/in/jagadeeswar-reddy-manyam',
    color: 'text-blue-400',
    handle: 'linkedin.com/in/jagadeeswar-reddy-manyam',
  },
];


const MemoizedContactInfo = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-8" 
    >
      <Card className="glass-effect p-6 sm:p-8 hover-glow"> 
        <h3 className="text-2xl font-bold text-neon-blue mb-6">
          Let's Connect
        </h3>
        <p className="text-light-slate mb-8 text-sm sm:text-base"> 
          I'm currently looking for new opportunities and exciting projects. My
          inbox is always open for interesting collaborations!
        </p>
        <div className="space-y-4 sm:space-y-6"> 
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-lightest-navy/30 hover:bg-lightest-navy/50 transition-all duration-300 group" // Adjusted padding & space-x
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 sm:p-3 rounded-lg bg-lightest-navy/50 ${social.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`} // Added flex-shrink-0
              >
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" /> 
              </div>
              <div className="flex flex-col flex-grow min-w-0">
                <p className="font-medium text-lightest-slate group-hover:text-neon-blue transition-colors text-sm sm:text-base"> {/* Adjusted font size */}
                  {social.name}
                </p>
                <p className="text-xs sm:text-sm text-slate break-all">
                  {social.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </Card>
      <Card className="glass-effect p-6 sm:p-8 hover-glow"> 
        <h4 className="text-lg font-semibold text-neon-green mb-4">
          Quick Info
        </h4>
        <div className="space-y-2 sm:space-y-3 text-light-slate text-sm sm:text-base"> 
          <div className="flex justify-between">
            <span>Location:</span>
            <span className="text-lightest-slate">India</span>
          </div>
          <div className="flex justify-between">
            <span>Response Time:</span>
            <span className="text-lightest-slate">24-48 hours</span>
          </div>
          <div className="flex justify-between">
            <span>Availability:</span>
            <span className="text-neon-green">Open to work</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: 'Message sent!',
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    },
    [toast],
  );

  return (
    <section className="py-16 sm:py-20 bg-light-navy relative overflow-hidden"> 
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-5 w-24 h-24 sm:w-32 sm:h-32 border border-neon-blue rounded-full" />
        <div className="absolute bottom-10 right-5 w-16 h-16 sm:w-24 sm:h-24 bg-neon-green/20 rounded-full" />
      </div>

      <div className="max-w-xl sm:max-w-4xl mx-auto section-padding relative z-10"> {/*  max-w */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16" 
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="font-mono text-neon-blue mr-4">03.</span>
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-neon-blue mx-auto rounded-full mb-6 sm:mb-8" /> 
          <p className="text-base sm:text-lg text-light-slate max-w-xl mx-auto"> 
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, feel free to
            reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12"> 
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 sm:p-8 hover-glow">
              <h3 className="text-2xl font-bold text-neon-blue mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6"> 
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-lightest-navy/50 border-white/20 text-lightest-slate placeholder-slate focus:border-neon-blue"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-lightest-navy/50 border-white/20 text-lightest-slate placeholder-slate focus:border-neon-blue"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-lightest-navy/50 border-white/20 text-lightest-slate placeholder-slate focus:border-neon-blue resize-none"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neon-blue hover:bg-neon-blue/90 text-dark-navy font-medium py-3 transition-all duration-300 group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-5 h-5 border-2 border-dark-navy border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <FiSend className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
          <MemoizedContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;