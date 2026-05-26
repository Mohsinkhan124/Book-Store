// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { bookService } from '../services/api';
// import { motion } from 'motion/react';
// import { ArrowLeft, BookOpen, Clock, Globe, Shield, Star, ShoppingCart } from 'lucide-react';
// import toast from 'react-hot-toast';

// const ReadBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await bookService.getBookById(id);
//         setBook(response.data);
//       } catch (err) {
//         toast.error('Failed to load book data');
//         navigate('/');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBook();
//   }, [id]);

//   if (loading) return (
//       <div className="min-h-screen flex items-center justify-center p-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//   );

//   if (!book) return null;

//   return (
//     <div className="min-h-screen pb-20">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-muted hover:text-primary transition-colors mb-12 font-bold uppercase text-xs tracking-widest"
//         >
//           <ArrowLeft size={16} /> Back to Library
//         </button>

//         <div className="grid md:grid-cols-2 gap-16 items-start">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="sticky top-32"
//           >
//             <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 bg-primary/5 p-4 border border-primary/10">
//                <img 
//                  src={book.imageUrl || 'https://images.unsplash.com/photo-1543005120-019f2ed55180?auto=format&fit=crop&q=80&w=800'} 
//                  alt={book.title}
//                  className="w-full h-full object-cover rounded-2xl"
//                />
//                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 text-primary">
//                   <Star size={16} fill="currentColor" />
//                   <span className="font-bold">4.9/5</span>
//                </div>
//             </div>
//           </motion.div>

//           <div className="space-y-10">
//             <div className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="text-primary font-bold uppercase tracking-widest text-xs"
//               >
//                 Featured Release
//               </motion.div>
//               <motion.h1 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="font-display text-5xl md:text-7xl font-bold leading-tight"
//               >
//                 {book.title}
//               </motion.h1>
//               <motion.p 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-2xl font-serif italic text-muted"
//               >
//                 by {book.author}
//               </motion.p>
//             </div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="grid grid-cols-2 sm:grid-cols-4 gap-4"
//             >
//                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-2">
//                   <BookOpen className="text-primary" size={24} />
//                   <span className="text-xs font-bold text-muted uppercase">Length</span>
//                   <span className="font-bold">342 Pages</span>
//                </div>
//                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-2">
//                   <Clock className="text-primary" size={24} />
//                   <span className="text-xs font-bold text-muted uppercase">Duration</span>
//                   <span className="font-bold">12h Reading</span>
//                </div>
//                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-2">
//                   <Globe className="text-primary" size={24} />
//                   <span className="text-xs font-bold text-muted uppercase">Language</span>
//                   <span className="font-bold">English</span>
//                </div>
//                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center gap-2">
//                   <Shield className="text-primary" size={24} />
//                   <span className="text-xs font-bold text-muted uppercase">Format</span>
//                   <span className="font-bold">Hardcover</span>
//                </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//               className="space-y-4"
//             >
//                <h3 className="text-xl font-bold font-display">Synopsis</h3>
//                <p className="text-lg leading-relaxed text-muted font-serif">
//                  {book.description || "In a world divided by secrets and ancient lore, one individual must uncover the truth hidden beneath centuries of silence. Through trials of spirit and sharp wit, this narrative explores the depths of human resilience and the power of knowledge."}
//                </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="flex items-center gap-6 pt-4"
//             >
//                <div className="flex flex-col">
//                   <span className="text-xs font-bold uppercase tracking-widest text-muted">Price</span>
//                   <span className="text-4xl font-bold text-primary">${book.price || '24.99'}</span>
//                </div>
//                <button className="flex-1 bg-primary text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl shadow-primary/20 transition-all">
//                   <ShoppingCart size={24} /> Add to Collection
//                </button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadBook;import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await bookService.readBook(id);
        
        if (response.data && response.data.pdfUrl) {
          setBook({
            title: response.data.title,
            author: response.data.author,
            pdfUrl: response.data.pdfUrl
          });
          setPdfUrl(response.data.pdfUrl);
        } else {
          throw new Error('No PDF URL received');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load book');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleDownload = async () => {
    try {
      let downloadUrl = `https://drive.google.com/uc?export=download&id=${book.pdfUrl.match(/\/d\/(.+?)\//)[1]}`;
      window.open(downloadUrl, '_blank');
      toast.success('Download started!');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg)]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto"></div>
          <p className="text-muted font-serif italic">Opening your book...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Elegant Header */}
      <header className="glass sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-primary hover:text-primary/70 transition-all duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-serif text-sm sm:text-base">Back to Library</span>
          </button>
          
          <div className="text-center flex-1 px-4">
            <h1 className="font-display font-bold text-lg sm:text-xl text-foreground truncate">
              {book?.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted font-serif italic">
              by {book?.author}
            </p>
          </div>
          
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-3 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      {/* PDF Viewer - Centered */}
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Decorative Book Icon */}
          <div className="text-center mb-4 sm:mb-6">
            <BookOpen className="inline-block text-primary/60 w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          
          {/* PDF Container */}
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-2xl overflow-hidden border border-primary/10">
            <div className="relative" style={{ height: 'calc(100vh - 160px)' }}>
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title={book?.title}
                  allow="autoplay"
                  style={{ border: 'none' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <p className="text-muted font-serif italic">PDF preview not available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer note */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs text-muted/70 font-serif">
               Enjoy reading this free book from LuminaBooks
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReadBook;