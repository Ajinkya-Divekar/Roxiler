const axios = require("axios");
const ProductTransaction = require("../models/ProductTransaction");

async function initializeDatabase(req, res) {
  try {
    // Check if the database already contains data
    const count = await ProductTransaction.countDocuments();
    if (count > 0) {
      const dbData = await ProductTransaction.find();
      return res
        .status(200)
        .json({ message: "Database already initialized", dbData });
    }

    // Fetch data from the third-party API
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;

    // Initialize the database with fetched data
    await ProductTransaction.insertMany(data);

    res
      .status(200)
      .json({ message: "Database initialized successfully", data });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  initializeDatabase,
};
