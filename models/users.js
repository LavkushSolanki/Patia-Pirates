const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Item schema
const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: {
    type: String,
    required:true,
    // default: "/images/Clothes/Shawl.webp",
    // set: (v) => (v === "" ? "/images/Clothes/Shawl.webp" : v),
  },
  dateAdded: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  quantity: { type: Number,min:0 },
  category: { type: String, required: true },
});

//seller schema
const sellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adhaar: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  category:{
type:String,
  },
  address: {
    type: String,
    required: true,
  },
  shopname: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [itemSchema],
});

//user schema
const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  LoggedIn: {
    type: Boolean,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Seller = mongoose.model("Seller", sellerSchema);

module.exports = { User, Item, Seller };
