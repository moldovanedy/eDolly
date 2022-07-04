const router = require("express").Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const passport = require("passport");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

/**
 * @description creates a new user
 */
router.route("/add").post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    pool.query(
        `SELECT Email FROM users WHERE Email = "${email}"`,
        async (err, result, fields) => {
            if (err) {
                res.send("Eroare: " + err.toString());
            } else if (result.length > 0) {
                res.send("Acest e-mail a fost înregistrat deja!");
            } else {
                var hashedPassword = await bcrypt.hash(password, 10);

                pool.query(
                    `INSERT INTO users (ID, Name, Email, Password, Phone) VALUES (UUID_TO_BIN(UUID()), "${name}", "${email}", "${hashedPassword}", "${phone}")`,
                    (err, result, fields) => {
                        if (err) {
                            res.send("Eroare: " + err.toString());
                        } else {
                            res.send("Succes!");
                        }
                    }
                );
            }
        }
    );
});

/**
 * @description finds an user by id
 */
router.route("/login").post((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) console.log(err);

        if (!user) res.send("Numele de utilizator sau parola nu sunt corecte!");
        else {
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.send("Ceva nu a funcționat corect");
                    return;
                }
                res.send("Autentificat cu succes");
            });
        }
    })(req, res, next);
});

/**
 * @description modifies user by id
 */
router.route("/update/:id").post((req, res) => {});

module.exports = router;
