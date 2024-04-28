// routes/listTransactions.js
const express = require("express");
const router = express.Router();
const listTransactionsController = require("../controllers/listTransactionController");

router.get("/", listTransactionsController.listTransactions);

module.exports = router;
