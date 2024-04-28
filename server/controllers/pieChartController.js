const ProductTransaction = require("../models/ProductTransaction");

async function getPieChartData(req, res) {
  try {
    // Extract month from the request query parameters
    const month = req.query.month;

    // Convert month name to its corresponding number (e.g., January -> 1, February -> 2, etc.)
    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    // Find unique categories and the number of items from each category for the selected month
    const pieChartData = await ProductTransaction.aggregate([
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
          _id: "$category",
          itemCount: { $sum: 1 },
        },
      },
    ]);

    // Prepare the response object
    const formattedData = pieChartData.map(({ _id, itemCount }) => ({
      category: _id,
      itemCount: itemCount,
    }));

    // Send the pie chart data as JSON response
    res.status(200).json({ data: formattedData });
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).send("Error fetching pie chart data");
  }
}

// Export the function for use in routes
module.exports = {
  getPieChartData,
};
