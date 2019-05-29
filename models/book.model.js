const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  remainStock: {
    type: Number,
    required: true
  },
  summary: String,
  pageNumber: Number,
  publisher: String,
  salePrice: Number,
  translator: String,
  coverType: String,
  publishDate: Date
})

class BookClass {
  /** =================================
   *               ADMIN
   * ==================================
   */
  static async addBook(newBook) {
    const { title, author, price, remainStock } = newBook;

    if (!title) { return Promise.reject("Missing book title."); }
    else if (!author) { return Promise.reject("Missing book author."); }
    else if (!price) { return Promise.reject("Missing book price."); }
    else if (!remainStock) { return Promise.reject("Missing book remainStock."); }

    return BookModel(newBook).save();
  }

  static async updateBookInfo(editedBook) {
    const { title, author, price, remainStock } = editedBook;

    if (!title) { return Promise.reject("Missing book title."); }
    else if (!author) { return Promise.reject("Missing book author."); }
    else if (!price) { return Promise.reject("Missing book price."); }
    else if (!remainStock) { return Promise.reject("Missing book remain stock."); }

    return this.findById(editedBook.id).then(() => {
      return BookModel.findByIdAndUpdate(editedBook.id, editedBook, {new: true});
    }).catch(err => {
      return Promise.reject({msg: "Book ID is invalid", err: err});
    })
  }

  static async deleteBookById(id) {
    return BookModel.findByIdAndDelete(id);
  }

  /** =================================
   *               USER
   * ==================================
   */

  static async getListBooks() {
    return await BookModel.find();
  }

  static async findById(id) {
    if (id) {
      return await BookModel.findById(id);
    } else {
      return Promise.reject("Book ID not exist.");
    }
  }

  static async findByTitle(title) {
    if (title) {
      return await BookModel.find({ title: { $regex: new RegExp(title, "i") } });
    } else {
      return Promise.reject("Keyword is empty.");
    }
  }

  static async findByAuthor(author) {
    if (author) {
      return await BookModel.find({ author: { $regex: new RegExp(author, "i") } });
    } else {
      return Promise.reject("Keyword is empty.");
    }
  }
}

const ModelName = 'Book'
const BookModel = mongoose.model(ModelName, BookSchema);
module.exports = BookClass;