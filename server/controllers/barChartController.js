const ProductTransaction = require("../models/ProductTransaction");

async function getBarChartData(req, res) {
  try {
    // Extract month from the request query parameters
    const month = req.query.month;

    // Convert month name to its corresponding number (e.g., January -> 1, February -> 2, etc.)
    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    // Define price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.POSITIVE_INFINITY },
    ];

    // Initialize object to store bar chart data
    const barChartData = [];

    // Iterate over each price range
    for (const range of priceRanges) {
      // Calculate the number of items within the current price range for the selected month
      const itemCount = await ProductTransaction.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNumber],
        },
        sold: true,
        price: { $gte: range.min.toString(), $lte: range.max.toString() }, // Price is in string format
      });

      // Add data to bar chart object
      barChartData.push({
        priceRange: `${range.min}-${range.max}`,
        itemCount: itemCount,
      });
    }

    // Send the bar chart data as JSON response
    res.status(200).json({ data: barChartData });
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).send("Error fetching bar chart data");
  }
}

// Export the function for use in routes
module.exports = {
  getBarChartData,
};
