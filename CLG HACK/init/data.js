const mongoose = require("mongoose");
const { User, Item, Seller } = require("../models/users.js");

// Connect to MongoDB
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

const sellerData = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    adhaar: "984920930480",
    phone: 9898923453,
    address: "467 Tonis, District, Country",
    shopname: "Shop 1",
    items: [
      {
        name: "Kolkata Necklace",
        description: "Description for Item 1",
        price: 50,
        category: "Jewellery",
      },
      {
        name: "Bengali Saree",
        description: "Description for Item 2",
        price: 75,
        category: "Clothes",
      },
    ],
  },
  {
    name: "Alice Smith",
    email: "alicesmith@example.com",
    adhaar: "987654321098",
    phone: 9876543210,
    address: "456 Avenue, Town, Country",
    shopname: "Shop 2",
    items: [
      {
        name: "Murti",
        description: "Description for Item 3",
        price: 100,
        category: "Home Decoration",
      },
      {
        name: "Majnu Painting",
        description: "Description for Item 4",
        price: 25,
        category: "Home Decoration",
      },
    ],
  },
  {
    name: "David Brown",
    email: "davidbrown@example.com",
    adhaar: "876543210987",
    phone: 8765432109,
    address: "789 Road, Village, Country",
    shopname: "Shop 3",
    items: [
      {
        name: "Gujarti Saree",
        description: "Description for Item 8",
        price: 40,
        category: "Clothes",
      },
      {
        name: "Kasmari Sowl",
        description: "Description for Item 9",
        price: 55,
        category: "Clothes",
      },
    ],
  },
];

// Sample user data with items
const usersData = [
  {
    Name: "John Doe",
    Email: "johndoe@example.com",
    Password: "Password123",
    LoggedIn: false,
    isSeller: true,
  },
  {
    Name: "Alice Smith",
    Email: "alicesmith@example.com",
    Password: "abc@123",
    LoggedIn: false,
    isSeller: true,
  },
  {
    Name: "Bob Johnson",
    Email: "bjohnson@example.com",
    Password: "Password456",
    LoggedIn: false,
    isSeller: false,
    // items: [
    //   { name: "Item 5", description: "Description for Item 5", price: 80 },
    // ],
  },
  {
    Name: "Emma Wilson",
    Email: "emma.wilson@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
    // items: [
    //   { name: "Item 6", description: "Description for Item 6", price: 60 },
    //   { name: "Item 7", description: "Description for Item 7", price: 90 },
    // ],
  },
  {
    Name: "David Brown",
    Email: "davidbrown@example.com",
    Password: "brown123",
    LoggedIn: false,
    isSeller: true,
  },
];

async function insertMultipleUsersAndSellers() {
  try {
    // Delete existing data before inserting new data
    await User.deleteMany({});
    await Seller.deleteMany({});

    // Insert multiple users
    const insertedUsers = await User.insertMany(usersData);

    // Update seller data with userIds from inserted users
    const sellerDataWithUserIds = sellerData.map((seller, index) => ({
      ...seller,
      userId: insertedUsers[index]._id,
    }));

    // Insert multiple sellers
    const insertedSellers = await Seller.insertMany(sellerDataWithUserIds);

    console.log("Users and Sellers data inserted successfully:");
    console.log("Inserted Users:", insertedUsers);
    console.log("Inserted Sellers:", insertedSellers);
  } catch (error) {
    console.error("Error inserting data:", error.message);
  }
}

// Call the function to insert multiple users and sellers
insertMultipleUsersAndSellers();

async function addItemsFromSellersToItemsCollection() {
  await Item.deleteMany({});
  try {
    // Fetch all sellers from the database
    const sellers = await Seller.find({});

    // Extract items from each seller and format them
    const itemsToInsert = [];
    sellers.forEach((seller) => {
      seller.items.forEach((item) => {
        itemsToInsert.push({
          name: item.name,
          description: item.description,
          price: item.price,
          sellerId: seller._id,
          category:item.category,
          // Assign the seller's _id to the item's sellerId field
        });
      });
    });

    // Insert all items into the Item collection
    const insertedItems = await Item.insertMany(itemsToInsert);

    console.log("Items added to Item collection:", insertedItems);
  } catch (error) {
    console.error("Error adding items:", error);
  }
}

// Call the function to add items from sellers to the Item collection
addItemsFromSellersToItemsCollection();
