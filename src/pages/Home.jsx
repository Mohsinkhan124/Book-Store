import React, { useEffect, useState } from 'react';
import { bookService } from '../services/api';
import BookCard from '../components/BookCard';
import { motion } from 'motion/react';
import { Search, Sparkles, Filter, ChevronRight, X } from 'lucide-react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getAllBooks();
        const bookData = Array.isArray(response.data) 
          ? response.data 
          : (response.data?.books || response.data?.data || []);
        setBooks(bookData);
        console.log('Book data:', bookData);
      } catch (err) {
        console.error('Failed to fetch books', err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = Array.isArray(books) ? books.filter(book => 
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title?.localeCompare(b.title);
    if (sortBy === 'author') return a.author?.localeCompare(b.author);
    if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
    return 0;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen space-y-8 sm:space-y-12 md:space-y-16 pb-12 sm:pb-16 md:pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 dark:opacity-60 scale-105"
            alt="Library background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 space-y-4 sm:space-y-6 md:space-y-8">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 backdrop-blur-sm"
           >
             <Sparkles size={14} className="sm:w-4 sm:h-4" />
             <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">Curation of Excellence</span>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] sm:leading-[0.95] tracking-tighter"
           >
             Where Every <br className="hidden sm:block"/> <span className="text-primary italic">Story</span> Finds its Soul.
           </motion.h1>

           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-base sm:text-lg md:text-xl text-muted font-serif max-w-2xl mx-auto px-4 sm:px-0"
           >
             Explore our handpicked collection of masterpieces. From forgotten classics to modern epics, Lumina is your gateway to worlds unknown.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
           >
             <div className="relative w-full max-w-md group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by title or author..."
                  className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white/50 dark:bg-black/50 border border-primary/10 focus:border-primary outline-none transition-all shadow-lg backdrop-blur-md"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
             </div>
             <button className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 text-sm sm:text-base w-full sm:w-auto justify-center">
                Explore All <ChevronRight size={18} className="sm:w-5 sm:h-5" />
             </button>
           </motion.div>
        </div>
      </section>

      {/* Book Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 md:space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <h2 className="font-display text-2xl sm:text-3xl font-bold border-l-4 border-primary pl-3 sm:pl-4">
              Featured Collection
            </h2>
            
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 text-muted hover:text-primary transition-colors px-4 py-2 bg-primary/5 rounded-full w-full justify-center"
            >
                <Filter size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Sort & Filter</span>
            </button>

            {/* Desktop Sort Dropdown */}
            <div className="hidden sm:flex items-center gap-3">
                <Filter size={18} className="text-muted" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-primary/20 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:border-primary transition-colors cursor-pointer outline-none"
                >
                  <option value="default">Default</option>
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="year">Sort by Year</option>
                </select>
            </div>
        </div>

        {/* Mobile Filter Panel */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden bg-primary/5 rounded-xl p-4 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-sm">Sort Options</span>
              <button onClick={() => setShowFilters(false)} className="text-muted">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['default', 'title', 'author', 'year'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === option 
                      ? 'bg-primary text-white' 
                      : 'bg-white/50 dark:bg-black/50 text-muted hover:bg-primary/10'
                  }`}
                >
                  {option === 'default' ? 'Default' : 
                   option === 'title' ? 'Title' : 
                   option === 'author' ? 'Author' : 'Year'}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3 sm:space-y-4 animate-pulse">
                <div className="aspect-[3/4] bg-primary/10 rounded-xl sm:rounded-2xl" />
                <div className="h-4 bg-primary/10 rounded w-3/4" />
                <div className="h-3 bg-primary/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {sortedBooks.map((book, index) => (
                <BookCard key={book._id} book={book} delay={index * 0.05} />
              ))}
              {sortedBooks.length === 0 && (
                  <div className="col-span-full text-center py-12 sm:py-16 md:py-20 bg-primary/5 rounded-2xl sm:rounded-3xl border border-dashed border-primary/20">
                      <p className="text-muted font-serif italic text-base sm:text-lg">No treasures found matching your search...</p>
                  </div>
              )}
            </motion.div>
            
          </>
        )}
      </section>
    </div>
  );
};

export default Home;