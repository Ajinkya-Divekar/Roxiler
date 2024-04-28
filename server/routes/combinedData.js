// routes/combinedData.js
const express = require("express");
const router = express.Router();
const combinedDataController = require("../controllers/combinedDataController");

router.get("/", combinedDataController.getCombinedData);

module.exports = router;
