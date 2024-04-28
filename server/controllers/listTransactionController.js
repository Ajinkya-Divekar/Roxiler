const ProductTransaction = require("../models/ProductTransaction");

async function listTransactions(req, res) {
  try {
    let searchText = req.query.searchText.trim();
    const month = req.query.month;

    // Convert month name to its corresponding number (e.g., January -> 1, February -> 2, etc.)
    const monthNumber = new Date(Date.parse(month + " 1, 2000")).getMonth() + 1;

    let query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber],
      },
    };

    // Check if searchText is empty, if not, apply search filters
    if (searchText !== "") {
      const regexPattern = new RegExp("^" + searchText, "i");
      query.$and = [
        {
          $or: [
            { title: { $regex: regexPattern } },
            { description: { $regex: regexPattern } },
            { price: { $regex: regexPattern } },
          ],
        },
      ];
    }

    const transactions = await ProductTransaction.find(query);

    res.status(200).json({ data: transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send("Error fetching transactions");
  }
}

module.exports = {
  listTransactions,
};
