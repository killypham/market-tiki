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

  static async updateBook(editedBook) {
    const { title, author, price, remainStock } = newBook;

    if (!title) { return Promise.reject("Missing book title."); }
    else if (!author) { return Promise.reject("Missing book author."); }
    else if (!price) { return Promise.reject("Missing book price."); }
    else if (!remainStock) { return Promise.reject("Missing book remainStock."); }
    
  }

  /** =================================
   *               USER
   * ==================================
   */

  static async getListBooks() {
    return await BookModel.find();
  }

  static async findByTitle(title) {
    console.log({ title: title });
    if (title) {
      return await BookModel.find({ title: { $regex: new RegExp(title, "i") } });
    } else {
      return Promise.reject("Keyword is empty.");
    }
  }

  static async findByAuthor(author) {
    console.log({ author: author });
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