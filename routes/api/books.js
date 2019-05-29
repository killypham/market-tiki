const router = require('express').Router()
const Book = require('../../models/book.model');

// Get all books
router.get('/', (req, res, next) => {
  Book.getListBooks().then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({books: null, err: err});
  })
})

// Find books by title
router.get('/search', (req, res) => {
  Book.findByTitle(req.query.q).then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({books: null, err: err});
  })
})

// View book detail
router.get('/detail', (req, res) => {
  Book.findById(req.query.q).then(bookDetail => {
    res.status(200).json(bookDetail);
  }).catch(err => {
    res.status(500).json(err);
  })
})

// Add a new book
router.post('/', (req, res, next) => {
  Book.addBook(req.body).then(book => {
    res.status(200).json(book);
  }).catch(err => {
    res.status(500).json({book: null, err: err})
  })
})

// Edit a book
router.post('/edit', (req, res) => {
  Book.updateBookInfo(req.body).then(updatedBook => {
    res.status(200).json(updatedBook);
  }).catch(err => {
    res.status(500).json({updatedBook: null, err: err});
  })
})

// Delete book by book ID
router.post('/delete/:bookId', (req, res) => {
  Book.deleteBookById(req.params.bookId).then(() => {
    res.status(200).json("Book deleted");
  }).catch(err => {
    res.status(500).json({msg: "Cannot delete", err: err});
  })
})


module.exports = router;