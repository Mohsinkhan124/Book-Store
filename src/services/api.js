import axios from 'axios';

const api = axios.create({
  baseURL: 'https://book-store-backend-virid-zeta.vercel.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  forgotPassword: (email) => api.post('/forgot-password', { email }),
  
  // ✅ Fix: Sirf ek resetPassword function (OTP wala)
  resetPassword: (email, otp, newPassword) => api.post('/reset-password', { email, otp, newPassword }),
};

export const bookService = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  readBook: (id) => api.get(`/books/${id}/read`),
  downloadBook: (id) => api.get(`/books/${id}/download`),
  createBook: (bookData) => api.post('/books', bookData),
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export default api;