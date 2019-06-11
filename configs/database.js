const mongoose = require('mongoose');
const uri = require('../configs').uri;

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then(() => {
      console.log("Database connected!");
    }).catch(err => {
      console.log("Database connect error: " + err);
    })
  }
}

module.exports = new Database;