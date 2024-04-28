const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Roxiler",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Routes
const initializeDatabaseRoute = require("./routes/initializeDatabase");
const listTransactionsRoute = require("./routes/listTransactions");
const barChartRoute = require("./routes/barChart");
const pieChartRoute = require("./routes/pieChart");
const combinedDataRoute = require("./routes/combinedData");
const statisticsRoute = require("./routes/statistics");

app.use("/initialize-database", initializeDatabaseRoute);
app.use("/list-transactions", listTransactionsRoute);
app.use("/bar-chart", barChartRoute);
app.use("/pie-chart", pieChartRoute);
app.use("/combined-data", combinedDataRoute);
app.use("/statistics", statisticsRoute);

process.on("SIGINT", () => {
  mongoose.connection.close();
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
  console.log("Hello World");
});
