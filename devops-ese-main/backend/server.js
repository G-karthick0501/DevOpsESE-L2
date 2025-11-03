const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection - USING MONGO_URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookhub';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB at:', MONGO_URI))
  .catch(err => console.error('MongoDB connection error:', err));

// Simple book schema
const Book = mongoose.model('Book', { title: String, author: String });

// GET API
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));