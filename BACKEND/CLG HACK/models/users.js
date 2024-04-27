const { name } = require("ejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Item schema
const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://www.imdb.com/name/nm7060064/mediaviewer/rm3724612864/?ref_=nm_ov_ph",
    set: (v) =>
      v === ""
        ? "https://www.imdb.com/name/nm7060064/mediaviewer/rm3724612864/?ref_=nm_ov_ph"
        : v,
  },
  dateAdded: { type: Date, default: Date.now },
  price: { type: Number, required: true },
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
  adhaar:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  shopname:{
    type:String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
    required:true,
  },
  Email: {
    type: String,
    required: true,
  },
  isSeller:{
    type:Boolean,
    required:true,
  },
  Password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);
const Seller=mongoose.model("Seller",sellerSchema);

module.exports = { User, Item,Seller };