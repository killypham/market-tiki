const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Require title."],
  },
  summary: String,
  pageNumber: Number,
  publisher: String,
  author: {
    type: String,
    required: [true, "Require author."]
  },
  price: {
    type: Number,
    required: true
  },
  translator: String,
  coverType: String,
  publishDate: Date,
  remainStock: {
    type: Number,
    required: [true, "Require remain stock."]
  }
})

class BookClass {
  /** =================================
   *               ADMIN
   * ==================================
   */
  async addBook(newBook) {
    const { title, author, price, remainStock } = newBook;
    if(!title || !author || !price || !remainStock) {
      return Promise.reject("Missing book info.");
    }
    return BookModel(newBook).save();
  }
  async updateBook(editedBook) {
    const { title, author, price, remainStock } = newBook;
    if(!title || !author || !price || !remainStock) {
      return Promise.reject("Missing book info.");
    }
  }
  static async findBookByTitle(title) {
    if(title) {
      return await BookModel.find({title: title});
    } else {
      throw Error("Require title.");
    }
  }

  /** =================================
   *               ADMIN
   * ==================================
   */
}

const BookModel = mongoose.model(ModelName, BookSchema);
module.exports = BookClass;