const ProductTransaction = require("../models/ProductTransaction");

async function getCombinedData(req, res) {
  try {
    const month = req.body.month;

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

    // Prepare the response object for pie chart data
    const formattedPieData = pieChartData.map(({ _id, itemCount }) => ({
      category: _id,
      itemCount: itemCount,
    }));

    // Initialize object to store bar chart data
    const barChartData = [];

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
          totalAmount: { $sum: { $toDouble: "$price" } }, // Convert price to double for sum aggregation
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

    // Prepare the response object for statistics data
    const statistics = {
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems: totalSoldItems,
      totalNotSoldItems: totalNotSoldItems,
    };

    // Send the combined JSON response
    res.status(200).json({
      pieData: formattedPieData,
      barData: barChartData,
      statisticsData: statistics,
    });
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).send("Error fetching combined data");
  }
}

module.exports = {
  getCombinedData,
};
