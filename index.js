const mongoose = require("mongoose");
const { User, Item, Seller } = require("./models/users.js");
const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "public/images" });

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

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/images/items");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

//repair
app.get("/clothes", async (req, res) => {
  let user = await Seller.find({ category: "Clothes" });
  res.render('renew',{seller:user});
});
app.get("/homedeco", async (req, res) => {
  let user = Seller.find({ category: "Home Decoration" });
  res.render('renew',{seller:user});
});
app.get("/jewellery", async (req, res) => {
  let user = Seller.find({ category: "Jewellery" });
  res.render('renew',{seller:user});
});

//post purcahse
app.post("/purchase/:id", async (req, res) => {
  let { id } = req.params;
  let item = await Item.findById(id);
  if (item.quantity >= 1) {
    await Item.findByIdAndUpdate(id, {
      quantity: item.quantity - 1,
    });

    res.send("Order Placed");
  } else {
    res.send("Out Of Stock");
  }
});

//for purcahse
app.get("/purchase/:id", async (req, res) => {
  let { id } = req.params;
  let item = await Item.findById(id);
  console.log(item);
  res.render("purchase.ejs", { item });
});

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
app.post(
  "/seller/:id/additem",
  uploadOptions.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, quantity, category } = req.body;
      const { id } = req.params;
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get(
        "host"
      )}/public/images/items/`;
      // console.log("Base Path:", basePath); // Debugging statement
      // console.log("Generated filename:", fileName); // Debugging statement
      const seller = await Seller.findById(id);
      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }
      const newItem = new Item({
        name,
        description,
        image: `/images/items/${fileName}`,
        price,
        quantity,
        category,
      });

      await newItem.save();
      seller.items.push(newItem);
      await seller.save();

      res.render("seller.ejs", { seller });
    } catch (error) {
      console.error("Error adding item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

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

app.get("/items", async (req, res) => {
  let items = await Item.find();
  res.render("items.ejs", { items });
});

app.post("/login", async (req, res) => {
  let data = req.body;
  try {
    const check = await User.findOne({ Email: data.email });
    console.log(check);

    if (check.Password === data.password) {
      let items = await Item.find();

      await User.findByIdAndUpdate(check._id, {
        LoggedIn: true,
      });
      res.render("index.ejs", { user: check, items });
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
    LoggedIn: false,
    isSeller: false,
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
  res.render("home.ejs");
});

//code for customer section

app.post("/buy", buy);

async function buy(req, res) {
  const item = await req.body;
  const item_to_buy = await Item.findById(item.id);
  await res.render("buy", { item: item_to_buy });
}

app.listen(port, () => {
  console.log(`Server connected on ${port}`);
});
