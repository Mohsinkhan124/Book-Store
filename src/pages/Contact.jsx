import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Formspree form ID - aapka jo pehle use kiya tha
  const FORMSPREE_ID = 'xwvzboqe';  // ✅ Aapka form ID

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });
      
      if (response.ok) {
        toast.success("Your message has been sent to our keepers. We'll reply soon!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      <div className="text-center space-y-4 mb-20">
         <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="font-display text-7xl font-bold italic"
         >
           Get in <span className="text-primary italic">Touch</span>
         </motion.h1>
         <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="text-muted font-serif italic text-lg"
         >
           Questions, feedback, or a recommendation? We're all ears.
         </motion.p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-8 bg-white dark:bg-black/20 p-12 rounded-[3rem] border border-primary/10 shadow-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-primary/10 focus:border-primary outline-none transition-all font-serif" 
                    placeholder="Arthur Dent" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-primary/10 focus:border-primary outline-none transition-all font-serif" 
                    placeholder="arthur@guide.com" 
                  />
               </div>
               <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-primary/10 focus:border-primary outline-none transition-all font-serif" 
                    placeholder="Regarding the collection..." 
                  />
               </div>
               <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Your Message</label>
                  <textarea 
                    name="message"
                    rows="6" 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl bg-secondary/30 border border-primary/10 focus:border-primary outline-none transition-all font-serif resize-none" 
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
               </div>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="col-span-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:shadow-2xl shadow-primary/20 disabled:opacity-50"
               >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    <><Send size={20}/> Send Message</>
                  )}
               </button>
            </form>
         </div>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-8 py-8"
         >
            <div className="space-y-4">
               <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                     <Mail size={24} />
                  </div>
                  <div className="space-y-1 pt-1">
                     <p className="text-xs font-bold uppercase tracking-widest text-muted">Email Us</p>
                     <p className="font-serif italic text-lg">mohsinkhantwy@gmail.com</p>
                  </div>
               </div>

               <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                     <Phone size={24} />
                  </div>
                  <div className="space-y-1 pt-1">
                     <p className="text-xs font-bold uppercase tracking-widest text-muted">Call Us</p>
                     <p className="font-serif italic text-lg">+92 3183822290</p>
                  </div>
               </div>

               <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                     <MapPin size={24} />
                  </div>
                  <div className="space-y-1 pt-1">
                     <p className="text-xs font-bold uppercase tracking-widest text-muted">Visit Us</p>
                     <p className="font-serif italic text-lg">12 Feather Lane, London <br/>EC1A 1BB, UK</p>
                  </div>
               </div>
            </div>

            <div className="pt-8 space-y-4">
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Social Reach</p>
               <div className="flex gap-4">
                  {['Twitter', 'Instagram', 'Pinterest'].map(social => (
                    <span key={social} className="text-primary font-bold hover:underline cursor-pointer italic font-serif text-lg">{social}</span>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
};

export default Contact;