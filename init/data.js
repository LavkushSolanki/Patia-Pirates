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
    name: "Daya",
    email: "Daya@example.com",
    adhaar: "984920930480",
    phone: 9898923453,
    address: "Ramnagar, Amhedabad",
    shopname: "Sundar Shop",
    // items: [
    //   {
    //     name: "Trad Necklace",
    //     description: "",
    //     price: 4500,
    //     category: "Jewellery",
    //     image: "/images/Jewellery/trad_necklace.jpg",
    //   },
    //   {
    //     name: "White-Kashidakari Silk Saree Kota",
    //     description: "",
    //     price: 4690,
    //     category: "Clothes",
    //     image:
    //       "/images/Clothes/White - Kashidakari Hand Embroidery Pure Kota Silk Saree with Zari Border-7999.webp",
    //   },
    //   {
    //     name: "Banarasi-Saree",
    //     description: "",
    //     price: 2675,
    //     category: "Clothes",
    //     image: "/images/Clothes/banarasi-saree.webp",
    //   },
    //   {
    //     name: "Gujrati Ear Ring",
    //     description: "",
    //     price: 1775,
    //     category: "Jewellery",
    //     image: "images/Jewellery/Jwellery.jpeg",
    //   },
    // ],
  },
  {
    name: "Bhide",
    email: "Bhide@example.com",
    adhaar: "987654321098",
    phone: 9876543210,
    address: "Gokuldham Society, Powder Galli",
    shopname: "Bhide Shop",
    // items: [
    //   {
    //     name: "Peacock Art",
    //     description: "",
    //     price: 670,
    //     category: "Home_Decoration",
    //     image: "/images/Home_Decoration/peacock_art",
    //   },
    //   {
    //     name: "Nataraja Statue",
    //     description: "",
    //     price: 499,
    //     category: "Home_Decoration",
    //     image:
    //       "/images/Home_Decoration/Nataraja Statue Handcrafted Sculpture for Home and Puja Decor nataraj Statue for Home(8 Inches, Gold)-499.png",
    //   },
    //   {
    //     name: "Jaipur Copper Bottle 1L",
    //     description: "",
    //     price: 799,
    //     category: "Home_Decoration",
    //     image:
    //       "/images/Home_Decoration/JaipurCrafts Copper Printed Bottle, 1L-₹ 2,595.00 ₹ 795.00.png",
    //   },
    // ],
  },
  {
    name: "Jethalal",
    email: "Jethalal@example.com",
    adhaar: "876543210987",
    phone: 8765432109,
    address: "Gokuldham Society, Powder Galli",
    shopname: "Gada Electronics",
    // items: [
    //   {
    //     name: "Matte Adiyogi Shiva Statue",
    //     description: "",
    //     price: 999,
    //     category: "Home Decoration",
    //     image: "/images/Home_Decoration/Matte Polyresin Adiyogi Shiva Statue (4.5 inch , Black )-₹ 999.00 ₹ 249.00.png",
    //   },
    //   {
    //     name: "Ganpati_murti",
    //     description: "",
    //     price: 550,
    //     category: "Home Decoration",
    //     image: "/images/Home_Decoration/Ganpati_murti.jpg",
    //   },
    //   {
    //     name: "Damru",
    //     description: "",
    //     price: 449,
    //     category: "Home_Decoration",
    //     image: "/images/Home_Decoration/Damru",
    //   },
    //   {
    //     name: "Kanjivaram-Saree",
    //     description: "",
    //     price: 2500,
    //     category: "Clothes",
    //     image: "/images/Clothes/kanjivaram-saree",
    //   },
    //   {
    //     name: "Shawl",
    //     description: "",
    //     price: 1550,
    //     category: "Clothes",
    //     image: "/images/Clothes/Shawl.jpg",
    //   },
    //   {
    //     name: "Thread_bangles",
    //     description: "",
    //     price: 300,
    //     category: "Jewellery",
    //     image: "/images/Home Decoration/Ganpati_murti.jpg",
    //   },
    // ],
  },
];

// Sample user data with items
const usersData = [
  {
    Name: "Jethalal",
    Email: "Jethalal@example.com",
    Password: "Password123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Tapu",
    Email: "Tapu@example.com",
    Password: "Password123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Babita Ji",
    Email: "babita@example.com",
    Password: "abc@123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Daya",
    Email: "Daya@example.com",
    Password: "Password456",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Bhide",
    Email: "Bhide@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Bapuji",
    Email: "Bapuji@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Tarakh",
    Email: "Tarakh@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Anjali",
    Email: "Anjali@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
  },
  {
    Name: "Madhvi",
    Email: "Madhvi@example.com",
    Password: "pass123",
    LoggedIn: false,
    isSeller: false,
  },
];

async function insertMultipleUsersAndSellers() {
  try {
    // Delete existing data before inserting new data
    await User.deleteMany({});
    await Seller.deleteMany({});

    // Insert multiple users
    const insertedUsers = await User.insertMany(usersData);

    // // Update seller data with userIds from inserted users
    // const sellerDataWithUserIds = sellerData.map((seller, index) => ({
    //   ...seller,
    //   userId: insertedUsers[index]._id,
    // }));

    // // Insert multiple sellers
    // const insertedSellers = await Seller.insertMany(sellerDataWithUserIds);

    console.log("Users and Sellers data inserted successfully:");
    console.log("Inserted Users:", insertedUsers);
    // console.log("Inserted Sellers:", insertedSellers);
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
          category: item.category,
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
