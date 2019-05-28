const router = require('express').Router()
const Book = require('../../models/book.model');

// Find by book title
router.get('/search', (req, res) => {
  const result = Book.findByTitle(req.query.q);

  result.then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({books: null, err: err});
  })
})

router.get('/', (req, res, next) => {
  const result = Book.getListBooks();
  
  result.then(books => {
    res.status(200).json(books);
  }).catch(err => {
    res.status(500).json({books: null, err: err});
  })
})

router.post('/', (req, res, next) => {
  const newBook = req.body;
  const savedBook = Book.addBook(newBook);
  
  savedBook.then(book => {
    res.status(200).json(book);
  }).catch(err => {
    res.status(500).json({book: null, err: err})
  })
})

router.put('/', (req, res) => {
  const bookInfo = req.body;
  let result = Book.updateBookInfo(bookInfo);
  
  result.then(updatedBook => {
    res.status(200).json(updatedBook);
  }).catch(err => {
    res.status(500).json({updatedBook: null, err: err});
  })
})

module.exports = router;