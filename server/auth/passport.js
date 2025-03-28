const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                pool.query(
                    `SELECT * FROM users WHERE Email LIKE "${email}"`,
                    (err, result, fields) => {
                        if (result[0] === null || result[0] === undefined) {
                            return done(null, false);
                        }

                        bcrypt.compare(
                            password,
                            result[0].Password,
                            (err, isMatch) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (isMatch) {
                                    return done(null, result);
                                } else {
                                    return done(null, false);
                                }
                            }
                        );
                    }
                );
            }
        )
    );

    passport.serializeUser(function (result, done) {
        done(null, result[0].ID);
    });

    passport.deserializeUser(function (id, done) {
        pool.query(
            `SELECT * FROM users WHERE ID = "${id}"`,
            function (err, user) {
                done(err, user);
            }
        );
    });
};
