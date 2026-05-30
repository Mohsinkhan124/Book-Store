import React from 'react';
import { motion } from 'framer-motion';
import { Book, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import toast from 'react-hot-toast';

const BookCard = ({ book, delay = 0 }) => {
  
  const navigate = useNavigate();

  const handleRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to read books');
      navigate('/login');
      return;
    }
    
    navigate(`/read/${book._id}`);
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to download books');
      navigate('/login');
      return;
    }
    
    try {
      let downloadUrl = '';
      if (book.pdfUrl && book.pdfUrl.includes('drive.google.com')) {
        const match = book.pdfUrl.match(/\/d\/(.+?)\//);
        if (match) {
          downloadUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
      }
      
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
        toast.success('Download started!');
      } else {
        const response = await bookService.downloadBook(book._id);
        window.open(response.data.downloadUrl, '_blank');
        toast.success('Download started!');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <img 
          src={book.coverImage || book.imageUrl || 'https://images.unsplash.com/photo-1543005120-019f2ed55180?auto=format&fit=crop&q=80&w=300&h=400'}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1543005120-019f2ed55180?auto=format&fit=crop&q=80&w=300&h=400';
          }}
        />
        
        {/* Hover Overlay - Desktop only */}
        <div className="hidden sm:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col items-center justify-center gap-3">
          <button 
            onClick={handleRead}
            className="w-40 bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105"
          >
            <Book size={18} />
            Read Online
          </button>
          
          <button 
            onClick={handleDownload}
            className="w-40 bg-black/80 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105 backdrop-blur-sm"
          >
            <Download size={18} />
            Download Free
          </button>
        </div>

        {/* Mobile Buttons - Always visible on mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent sm:hidden">
          <div className="flex gap-2">
            <button 
              onClick={handleRead}
              className="flex-1 bg-white text-black py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Book size={16} />
              Read
            </button>
            
            <button 
              onClick={handleDownload}
              className="flex-1 bg-primary text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-display text-black font-bold text-base sm:text-lg leading-tight line-clamp-2 min-h-[1.5rem]">
          {book.title}
        </h3>
        <p className="text-muted text-xs text-black dark:text-gray-300 sm:text-sm italic font-serif">
          by {book.author}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full">
             FREE
          </span>
          
          {/* Mobile quick action indicator */}
          <div className="sm:hidden flex items-center gap-1 text-primary">
            <Book size={14} />
            <span className="text-xs font-medium">Tap to read</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;