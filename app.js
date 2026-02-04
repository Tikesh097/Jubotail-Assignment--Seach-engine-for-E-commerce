const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.Routes");
const searchRoutes = require("./routes/search.Routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/search", searchRoutes);

module.exports = app;
