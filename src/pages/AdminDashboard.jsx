import React, { useState, useEffect } from 'react';
import { bookService } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Check, Loader2, Image as ImageIcon, BookOpen, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    coverImage: '',
    pdfUrl: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      const bookData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.books || response.data?.data || []);
      setBooks(bookData);
    } catch (err) {
      toast.error("Failed to load inventory");
      setBooks([]);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', author: '', description: '', price: '', coverImage: '', pdfUrl: '' });
    setEditingBook(null);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description || '',
      price: book.price || '',
      coverImage: book.coverImage || '',
      pdfUrl: book.pdfUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this masterpiece?")) {
      try {
        await bookService.deleteBook(id);
        toast.success("Book removed from collection");
        fetchBooks();
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        title: formData.title,
        author: formData.author,
        description: formData.description || "No description",
        price: parseFloat(formData.price) || 0,
        coverImage: formData.coverImage,
        pdfUrl: formData.pdfUrl,
        stock: 1
      };
      
      if (editingBook) {
        await bookService.updateBook(editingBook._id, submitData);
        toast.success("Book updated");
      } else {
        await bookService.createBook(submitData);
        toast.success("New book added to library");
      }
      setIsModalOpen(false);
      resetForm();
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent italic">Curator's Dashboard</h1>
          <p className="text-muted font-serif">Manage the library inventory and release new titles.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl shadow-primary/20 transition-all"
        >
          <Plus size={20} /> Acquire New Title
        </button>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto rounded-3xl border border-primary/10 shadow-lg bg-white/50 backdrop-blur-sm">
        <table className="w-full text-left">
          <thead className="bg-primary/5 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            <tr>
              <th className="px-6 py-6">Preview</th>
              <th className="px-6 py-6">Title</th>
              <th className="px-6 py-6">Author</th>
              <th className="px-6 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {books.map((book) => (
              <tr key={book._id} className="group hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-secondary border border-primary/5">
                    {book.coverImage && (
                      <img 
                        src={book.coverImage} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-display font-bold text-lg">{book.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted italic font-serif">{book.author}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleEdit(book)} className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Simple URL Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-black p-8 rounded-3xl shadow-2xl border border-primary/10 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-3xl font-bold italic">{editingBook ? 'Edit Manifest' : 'New Acquisition'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-primary/5 rounded-full"><X size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Book Title *</label>
                  <input 
                    type="text" required
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all"
                    placeholder="e.g., The Midnight Chronicles"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Author *</label>
                  <input 
                    type="text" required
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all"
                    placeholder="e.g., Winston Smith"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Price (USD)</label>
                  <input 
                    type="number" step="0.01"
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>

                {/* Cover Image URL */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Cover Image URL *</label>
                  <div className="relative mt-1">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                    <input 
                      type="url" required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all"
                      placeholder="https://i.postimg.cc/... or https://images.unsplash.com/..."
                      value={formData.coverImage}
                      onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                    />
                  </div>
                  <p className="text-xs text-muted/60 mt-1">
                    💡 Tip: Use PostImages (postimages.org) for free image hosting
                  </p>
                </div>

                {/* PDF URL */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">PDF URL *</label>
                  <div className="relative mt-1">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50" size={18} />
                    <input 
                      type="url" required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all"
                      placeholder="https://drive.google.com/file/d/.../preview"
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({...formData, pdfUrl: e.target.value})}
                    />
                  </div>
                  <p className="text-xs text-muted/60 mt-1">
                    💡 Tip: Upload PDF to Google Drive → Share → "Anyone with link" → Use /preview link
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Description (Optional)</label>
                  <textarea 
                    rows="3"
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-secondary/50 dark:bg-primary/5 border border-primary/10 outline-none focus:border-primary transition-all resize-none"
                    placeholder="Brief description of the story..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold border border-primary/20 hover:bg-primary/5 transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <><Check size={20} /> {editingBook ? 'Update' : 'Add Book'}</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;