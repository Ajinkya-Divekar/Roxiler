// routes/initializeDatabase.js
const express = require("express");
const router = express.Router();
const initializeDatabaseController = require("../controllers/initializeDatabaseController");

router.get("/", initializeDatabaseController.initializeDatabase);

module.exports = router;
