const mongoose = require("mongoose");
const { User, Item, Seller } = require("./models/users.js");
const express = require("express");
const path = require("path");
const app = express();

//for user schema we require this

let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("DB connected succesfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://lavkush:vo1DDc7mg8vqnOZX@cluster0.k5pnpmf.mongodb.net/"
  );
}

//handling route for form submitted by new seller
app.post("/seller/:id/register", async (req, res) => {
  let { id } = req.params;
  const userinfo = await User.findByIdAndUpdate(
    id,
    {
      isSeller: true,
    },
    { runValidators: true, new: true }
  );
  console.log(userinfo);
  let newSellerobj = req.body;
  const newSeller = new Seller({
    name: newSellerobj.name,
    email: newSellerobj.email,
    adhaar: newSellerobj.adhaar,
    phone: newSellerobj.phone,
    address: newSellerobj.address,
    shopname: newSellerobj.shopname,
    userId: id,
  });
  newSeller
    .save()
    .then((res) => {
      console.log("saved succefully to db");
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("seller.ejs", { seller: newSeller });
});

// route for surfing to additem ejs
app.get("/seller/:id/additem", (req, res) => {
  let { id } = req.params;
  res.render("additem.ejs", { id });
});

// route for adding item in the seller
app.post("/seller/:id/additem", (req, res) => {});

//handling the route for new sellers who want to be new users
app.get("/seller/:id/register", (req, res) => {
  let { id } = req.params;
  res.render("sellerregister.ejs", { id });
});

// handling the click for existing sellers those who want to continue as seller
app.get("/seller/:id", async (req, res) => {
  let { id } = req.params;
  const seller = await Seller.findOne({ userId: id });
  console.log(seller);
  res.render("seller.ejs", { seller });
});

app.post("/login", async (req, res) => {
  let data = req.body;
  try {
    const check = await User.findOne({ Email: data.email });
    console.log(check);

    if (check.Password === data.password) {
      res.render("index.ejs", { user: check });
    } else {
      res.send("Wrong Password");
    }
  } catch {
    res.send("Incorrect Email and Password");
  }
});

app.post("/signup", (req, res) => {
  let newdata = req.body;
  const newuser = new User({
    Name: newdata.name,
    Email: newdata.email,
    Password: newdata.password,
  });
  newuser
    .save()
    .then((res) => {
      console.log("saved succefully to db");
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("login.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server connected on ${port}`);
});
