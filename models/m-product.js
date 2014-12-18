var mongoose = require("../helpers/db-helper"),
  Schema = mongoose.Schema;

// db schema
var productSchema = new Schema({
  //sku: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  modified: { type: Date, "default": Date.now },
  price: { type: Number, min: 0}
//  description: String,
//  category: Number,
//  brand: String,
//  stock: Number,
//  created: {type: Date, default: Date.now},
//  isActive: Boolean
});

module.exports = mongoose.model("product", productSchema);
