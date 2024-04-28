// Import necessary modules
const ProductTransaction = require("../models/ProductTransaction");

// Define the getStatistics function
async function getStatistics(req, res) {
  try {
    // Extract month from the request query parameters
    const month = req.query.month;

    // Convert month name to its corresponding number (e.g., January -> 1, February -> 2, etc.)
    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    // Calculate total sale amount of selected month
    const totalSaleAmount = await ProductTransaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber],
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    // Calculate total number of sold items of selected month
    const totalSoldItems = await ProductTransaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: true,
    });

    // Calculate total number of not sold items of selected month
    const totalNotSoldItems = await ProductTransaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
      sold: false,
    });

    // Prepare the response object
    const statistics = {
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems: totalSoldItems,
      totalNotSoldItems: totalNotSoldItems,
    };

    // Send the statistics as JSON response
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).send("Error fetching statistics");
  }
}

// Export the function for use in routes
module.exports = {
  getStatistics,
};
