const router = require("express").Router();
let Order = require("../models/order.model");

//creeaza o noua comanda
router.route("/add").post((req, res) => {
    const products = req.body.products;
    const delivery = req.body.delivery;
    const totalPrice = req.body.totalPrice;
    const adress = req.body.adress;

    const newOrder = new Order({ products, delivery, totalPrice, adress });

    newOrder
        .save()
        .then(() => res.json("Comanda s-a înregistrat cu succes!"))
        .catch(() =>
            res
                .status(500)
                .json(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});
