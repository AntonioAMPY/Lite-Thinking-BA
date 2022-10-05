const express = require("express");
const companyRouter = require("./routers/company");
const cors = require("cors");
const app = express();
require("../src/db/dynamodb");
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(companyRouter);

module.exports = app;
