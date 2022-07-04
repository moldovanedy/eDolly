const router = require("express").Router();
const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

/**
 * @description Creates a new order
 */
router.post("/add", (req, res) => {
    const products = req.body.products;
    const delivery = req.body.delivery;
    const totalPrice = req.body.totalPrice;
    var county = req.body.county;
    var city = req.body.city;
    var street = req.body.street;
    var number = req.body.number;
    var apartment = req.body.apartment;
    var staircase = req.body.staircase;

    if (county === "default") {
        res.send("Nu ați ales un județ");
    }

    if (city.length <= 1) {
        res.send("Numele localității e prea scurt!");
    } else if (city.length >= 99) {
        res.send("Numele localității e prea lung!");
    }

    if (street.length <= 1) {
        res.send("Numele străzii e prea scurt!");
    } else if (street.length >= 99) {
        res.send("Numele străzii e prea lung!");
    }

    if (isNaN(number)) {
        res.send("Vă rugăm introduceți un număr valid!");
    }

    if (isNaN(apartment)) {
        res.send("Vă rugăm introduceți un număr valid de apartament!");
    }

    if (staircase.length > 2) {
        res.send("Numele scării e prea lung!");
    }

    pool.query(``, (err, result, fields) => {});
});
