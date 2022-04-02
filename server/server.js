const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// pool.connect((err) => {
//     if (err) {
//         console.error("Eroare la conectarea bazei de date: " + err.stack);
//         return;
//     }
//     console.log("Conectat la baza de date cu succes! ID: " + pool.threadId);
// });

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
//const ordersRouter = require("./routes/orders");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
//app.use("/orders", ordersRouter);

app.listen(port, () => {
    console.log(`Server-ul rulează pe portul: ${port}`);
});

//module.exports = pool;
