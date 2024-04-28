// models/ProductTransaction.js
const mongoose = require("mongoose");

const productTransactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: { type: Date, default: Date.now }, // Define dateOfSale as a Date type
});

const ProductTransaction = mongoose.model(
  "ProductTransaction",
  productTransactionSchema
);

module.exports = ProductTransaction;
