const router = require("express").Router();
const mysql = require("mysql2");

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
router.route("/add").post((req, res) => {
    var products = req.body.products;
    var deliveryMethod = req.body.deliveryMethod;
    var courier = req.body.courier;
    var payment = req.body.payment;
    var address = req.body.address;
    var user = req.body.user;
    var additionalInfo = req.body.additionalInfo;

    if (
        products === undefined ||
        products === null ||
        deliveryMethod === undefined ||
        deliveryMethod === null ||
        courier === undefined ||
        courier === null ||
        payment === undefined ||
        payment === null ||
        address === undefined ||
        address === null ||
        user === undefined ||
        user === null
    ) {
        res.send("Datele nu au fost completate corespunzător!");
        return;
    } else {
        var delivery = "curier";
        if (deliveryMethod === "courier") {
            delivery = "curier";
        } else {
            delivery = "easybox";
        }
        pool.query(
            `INSERT INTO orders (Products, DeliveryMethod, Courier, Payment, User, Address, AdditionalInfo) VALUES ("${products}", "${delivery}"
            , "${courier}", "${payment}", '${user.toString()}', '${address.toString()}', "${additionalInfo}")`,
            (err, result, fields) => {
                if (err) {
                    res.send("A apărut o eroare!");
                    console.log(err);
                } else {
                    res.send("Comanda a fost plasată!");
                }
            }
        );
    }
});

module.exports = router;
