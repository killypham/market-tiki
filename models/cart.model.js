const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CartSchema = new schema({
  userID: String,
  product: [{ productID: string, price: Number, quantity: Number }],
  totalPrice: Number
})

class CartClass{

  static async initCart(userID) {

  }

  static async addItemToCart() {

  }
}
