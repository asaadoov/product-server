// modules used
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Server Configuration
const app = express();
const PORT = process.env.PORT || 2098;

app.use(cors());

// mySQL connection
const reactSqlDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ASad*2152592164",
  database: "react_sql"
});

reactSqlDB.connect(error => {
  if (error) return console.log(error);
});

// routes
app.get("/", (req, res) => {
  res.send("Go to /products to see the products");
});

// get products from DB
app.get("/products", (req, res) => {
  // SELECT query
  const SELECT_ALL = "SELECT * FROM products";

  reactSqlDB.query(SELECT_ALL, (error, results) => {
    if (error) return res.send(error);
    else {
      return res.json({
        data: results
      });
    }
  });
});

// Add product
app.get("/products/add", (req, res) => {
  const { name, price } = req.query || { name: "test", price: 0 };

  // INSERT query
  const INSERT_RECORD = `INSERT INTO products (name,price) VALUES ('${name}',${price});`;

  reactSqlDB.query(INSERT_RECORD, (error, results) => {
    if (error) return res.send(error);
    else return res.send("successfully added product");
  });
  console.log(name, price);
  //   res.send("Adding product...");
});

app.listen(PORT, () => {
  console.log(`Product Server is running on PORT ${PORT}...`);
});
