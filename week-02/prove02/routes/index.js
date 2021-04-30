const fs = require('fs');
const express = require('express');
const router = express.Router();
var books;

router.get('/', (req, res, next) => {
  res.render(
    'pages/home.ejs'
  )
});

router.post('/addBook', (req, res, next) => {
  newBook = createBook(req.body.title, req.body.summary, req.body.author, req.body.rating);
  books = JSON.parse(fs.readFileSync('public/books.json'));
  books.push(newBook);
  newBooks = JSON.stringify(books, null, 2);
  fs.writeFile('public/books.json', newBooks, err => {
    if (err) {
      console.log("Error writing file: ", err);
      return
    }
    console.log('Successfully wrote file');
  });
  res.redirect('/library');
});

router.get('/library', (req, res, next) => {
  books = JSON.parse(fs.readFileSync('public/books.json'));
  let bookList = books.reverse();
  res.render(
    'pages/books-list.ejs', {
      bookList: bookList
    }
  );
});

function createBook(title,
  summary,
  author = "Unknown Author",
  rating = "No ratings yet.") {
  book = {
    "title": title,
    "author": author,
    "summary": summary,
    "rating": rating
  };
  return book;
}



module.exports = router;