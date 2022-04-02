const router = require("express").Router();
let User = require("../models/user.model");

/**
 * @description returns users
 */
router.route("/").get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch(() =>
            res
                .status(500)
                .json(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});

/**
 * @description creates a new user
 */
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;

    const newUser = new User({ name, email, password, address, phone });

    newUser
        .save()
        .then(() => res.json("Cont creat cu succes!"))
        .catch(() =>
            res
                .status(500)
                .json(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});

/**
 * @description finds an user by id
 */
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch(() =>
            res
                .status(500)
                .json(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});

/**
 * @description modifies user by id
 */
router.route("/update/:id").post((req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.address = req.body.address;
            user.phone = req.body.phone;

            user.save()
                .then(() =>
                    res.json("Informațiile au fost modificate cu succes!")
                )
                .catch(() =>
                    res
                        .status(500)
                        .json(
                            "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                        )
                );
        })
        .catch(() =>
            res
                .status(500)
                .json(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});

module.exports = router;
