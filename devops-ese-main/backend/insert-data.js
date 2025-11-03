const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://hi:bye@cluster0.xosnjiu.mongodb.net/recruit_dev?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI);

const Book = mongoose.model('Book', { title: String, author: String });

const books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "1984", author: "George Orwell" },
  { title: "Harry Potter", author: "J.K. Rowling" }
];

Book.insertMany(books)
  .then(() => {
    console.log('Books inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });