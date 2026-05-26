import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Feather, Book, Coffee, Globe, Users, Award, Heart, Star, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    readers: 0,
    downloads: 0
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Animated counter effect
  useEffect(() => {
    const counters = [
      { key: 'books', target: 2847, duration: 2000 },
      { key: 'authors', target: 124, duration: 1500 },
      { key: 'readers', target: 15234, duration: 2500 },
      { key: 'downloads', target: 89234, duration: 3000 }
    ];

    counters.forEach(counter => {
      let start = 0;
      const increment = counter.target / (counter.duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= counter.target) {
          setStats(prev => ({ ...prev, [counter.key]: counter.target }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [counter.key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, []);

  const teamMembers = [
    {
      name: "Mohsin Khan",
      role: "Founder & Curator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300",
      bio: "Book enthusiast with a passion for digital innovation."
    },
    {
      name: "Sarah Chen",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300",
      bio: "Literature graduate turned digital librarian."
    },
    {
      name: "David Williams",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300",
      bio: "Building bridges between books and technology."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20 space-y-25  lg:space-y-32">

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
            <Heart size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Since 2024</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-bold italic leading-[1.1]">
            The Lumina <br />
            <span className="text-primary tracking-widest">Philosophy</span>
          </h1>
          <p className="text-lg md:text-xl mb-0 font-serif text-muted leading-relaxed">
            Founded in a small atelier in 2024, Lumina was born from a simple observation:
            digital reading had lost its soul. We decided to build a sanctuary—a place where
            typography matters, where covers are celebrated, and where the act of browsing
            is as rewarding as the reading itself.
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 gap-8 pt-6 lg:pt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2 border-r border-primary/10 pr-6"
            >
              <div className="text-4xl font-bold text-primary font-display tracking-tighter">
                {stats.books.toLocaleString()}+
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted">
                Curated Titles
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-primary font-display tracking-tighter">
                {stats.authors}+
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted">
                Featured Authors
              </div>
            </motion.div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              to="/"
              className="bg-primary text-white px-6 py-3 rounded-2xl lg:rounded-full font-bold hover:shadow-xl transition-all"
            >
              Explore Library
            </Link>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="border border-primary/20 px-6 py-3 rounded-2xl lg:rounded-full font-bold hover:bg-primary/5 transition-all"
            >
              Meet the Team
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-[2rem] lg:rounded-[4rem] group overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
            alt="Cozy library"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl p-4">
            <p className="text-sm font-serif italic">"A sanctuary for story lovers"</p>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto space-y-6 mb-6 lg:mb-14"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold italic">Our Mission</h2>
        <p className="text-xl font-serif text-muted leading-relaxed">
          To create a digital library that feels like a warm, cozy reading room.
          We believe every book deserves a beautiful home and every reader deserves
          an experience that honors the written word.
        </p>
      </motion.section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-4 gap-12">
        {[
          { icon: Feather, title: "Artisanal", desc: "Every pixel is crafted to respect the literary tradition." },
          { icon: Book, title: "Diverse", desc: "From avant-garde poetry to technical manuals and everything between." },
          { icon: Coffee, title: "Atmospheric", desc: "Designed for late-night reading sessions with dark mode support." },
          { icon: Globe, title: "Universal", desc: "Bringing the world's wisdom to your doorstep, completely free." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="text-center space-y-4 p-6 rounded-3xl bg-white/50 dark:bg-black/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary dark:text-white">
              <feature.icon size={32} />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tighter">{feature.title}</h3>
            <p className="text-muted text-sm font-serif">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section - Full width */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] lg:rounded-[4rem] bg-gradient-to-r from-primary/90 to-primary p-6 lg:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold">{stats.readers.toLocaleString()}+</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Active Readers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold">{stats.downloads.toLocaleString()}+</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Downloads</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold">100%</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Free Access</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold">24/7</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Availability</div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold italic">The Keepers</h2>
          <p className="text-muted font-serif text-lg">The passionate souls behind LuminaBooks</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center space-y-4 group"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">{member.name}</h3>
                <p className="text-primary font-serif text-sm">{member.role}</p>
                <p className="text-muted text-sm mt-2 font-serif">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-6 py-12 border-t border-b border-primary/10"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold italic">Ready to Start Your Journey?</h2>
        <p className="text-muted font-serif max-w-2xl mx-auto">
          Join thousands of readers who have already discovered their next favorite book at LuminaBooks.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all">
            Browse Library
          </Link>
          <Link to="/signup" className="border border-primary/20 px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-all">
            Join Free
          </Link>
        </div>
      </motion.section>

    </div>
  );
};

export default About;