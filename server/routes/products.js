const router = require("express").Router();
const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
const io = require("fs");
const multer = require("multer");
const jimp = require("jimp");
let Product = require("./../models/product.model");

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

/**
 * @description returns all products
 */
router.route("/").post((req, res, next) => {
    const name = req.body.name;
    const minPrice = parseFloat(req.body.minPrice);
    const maxPrice = parseFloat(req.body.maxPrice);
    const isInStock = req.body.isInStock;
    const category = req.body.category;
    const number = parseFloat(req.body.number);
    var page = parseInt(req.body.page);

    var query =
        "SELECT BIN_TO_UUID(id) id, Name, Price, OldPrice, Category, Rating FROM products WHERE ";
    var filters = [];

    //#region Filters
    if (!(name.toString() === "")) {
        filters.push(`Name LIKE "%${name}%"`);
    }

    if (!isNaN(parseFloat(minPrice))) {
        filters.push(`Price >= ${minPrice}`);
    }

    if (!isNaN(parseFloat(maxPrice))) {
        filters.push(`Price <= ${maxPrice}`);
    }

    //if true, returns only products in stock;
    //if false, returns both products in stock and products out of stock
    if (isInStock === true) {
        filters.push(`Stock > 0`);
    }

    if (!(category.toString() === "")) {
        filters.push(`Category = \"${category}\"`);
    }
    //#endregion

    if (filters.length === 0) return;
    if (filters.length === 1) {
        query += filters[0];
    } else {
        for (i = 0; i < filters.length; i++) {
            if (!(i === filters.length - 1)) {
                //if it's not the last element
                query += filters[i] + " AND ";
            } else {
                query += filters[i];
            }
        }
    }

    var shouldSearch = true;

    if (isNaN(parseInt(page)) || page === undefined || page === null) {
        page = 1;
    } else if (parseInt(page) > 15) {
        res.send([]);
        shouldSearch = false;
    }

    if (!isNaN(parseFloat(number))) {
        query += " LIMIT " + number * (page - 1) + ", " + number;
    } else {
        query += " LIMIT 100";
    }

    if (shouldSearch) {
        pool.query(query, (err, result, fields) => {
            if (err) {
                res.send("Oops! Ceva nu a funcționat corect!");
                console.error("Eroare: " + err);
            } else {
                res.send(result);
                next();
            }
        });
    }
});

router.route("/getNumberOfProducts").post((req, res) => {
    const name = req.body.name;
    const minPrice = parseFloat(req.body.minPrice);
    const maxPrice = parseFloat(req.body.maxPrice);
    const isInStock = req.body.isInStock;
    const category = req.body.category;

    var filters = [],
        query = `SELECT COUNT(*) FROM products WHERE `;

    //#region Filters
    if (!(name.toString() === "")) {
        filters.push(`Name LIKE "%${name}%"`);
    }

    if (!isNaN(parseFloat(minPrice))) {
        filters.push(`Price >= ${minPrice}`);
    }

    if (!isNaN(parseFloat(maxPrice))) {
        filters.push(`Price <= ${maxPrice}`);
    }

    //if true, returns only products in stock;
    //if false, returns both products in stock and products out of stock
    if (isInStock === true) {
        filters.push(`Stock > 0`);
    }

    if (!(category.toString() === "")) {
        filters.push(`Category = \"${category}\"`);
    }
    //#endregion

    if (filters.length === 0) return;
    if (filters.length === 1) {
        query += filters[0];
    } else {
        for (i = 0; i < filters.length; i++) {
            if (!(i === filters.length - 1)) {
                //if it's not the last element
                query += filters[i] + " AND ";
            } else {
                query += filters[i];
            }
        }
    }

    pool.query(query, (err, result, fields) => {
        if (err) {
            res.send("Eroare!");
        }
        res.send(result);
    });
});

/**
 * @description adds a product, but used only by desktop app
 */
router.route("/addFromApps").post((req, res) => {
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    const stock = parseInt(req.body.stock);
    const category = req.body.category;
    const description = req.body.description;
    const specifications = req.body.specifications;
    const reviews = req.body.reviews;
    const files = req.body.files;

    pool.query(
        `INSERT INTO products (id, Name, Price, Stock, Category, Description, Specifications, Reviews ) VALUES (UUID_TO_BIN(UUID()), "${name}", ${price}, ${stock}, "${category}", "${description}", "${specifications}", "${reviews}")`,
        (err, result, fields) => {
            try {
                if (err) {
                    var error = err.toString();
                }
                if (
                    err &&
                    error.localeCompare(
                        "Error: ER_BAD_FIELD_ERROR: Unknown column 'NaN' in 'field list'"
                    ) === 0
                ) {
                    res.send("Succes!");
                    return;
                } else if (err) {
                    res.send(
                        "Eroare la server! Vă rugăm încercați mai târziu."
                    );
                    console.error("Eroare: " + err);
                    return;
                } /*else {
                res.send("Succes!");
                return;
            }*/
            } catch (error) {
                console.log("Eroare: " + error);
            }
        }
    );

    const folderPath = `./../server/assets/${req.body.name}`;
    //creates a folder with the name of the product, where the corresponding assets will be stored
    if (!io.existsSync(folderPath)) {
        io.mkdir(folderPath, { recursive: false }, (err) => {
            if (err) console.log(err);
        });
    }

    for (var i = 0; i <= files.length; i++) {
        // searches for MIME type to determine the file extension; MIME can be found between the first "/" and first ";"
        var fileData = files[i];
        if (fileData === undefined) continue;

        var dotPosition = fileData.search(/["\/"]/);
        var semicolonPosition = fileData.search(/[";"]/);
        var extension = fileData.substring(dotPosition + 1, semicolonPosition);
        var base64HeaderSeparator = fileData.search(/[","]/); //returns the position of the first comma to remove useless data (data:image/jpg'base64,)

        var rawFileData = fileData.substring(base64HeaderSeparator + 1);
        const fileBuffer = Buffer.from(rawFileData, "base64");
        var fileName = `${Date.now()}-${
            Math.random().toFixed(3) * 1000
        }.${extension}`;
        io.writeFile(folderPath + `\/${fileName}`, fileBuffer, (error) => {
            if (error) {
                console.log("O eroare: " + error);
            }
        });
    }

    //wait until files are stored (3 seconds)
    setTimeout(function () {
        createThumbnail(folderPath);
    }, 3000);
});

/**
 * @description adds a product
 */
router.route("/add").post((req, res) => {
    //<MySQL>
    const name = req.body.name;
    const price = parseFloat(req.body.price);
    const stock = parseInt(req.body.stock);
    const category = req.body.category;
    const description = req.body.description;
    const specifications = req.body.specifications;
    // const password = req.body.password;

    // if(!(password === "DollyAdmin04")) {
    //     res.status(403).send("Acces interzis!");
    //     return;
    // }
    pool.query(
        `INSERT INTO products (id, Name, Price, Stock, Category, Description, Specifications ) VALUES (UUID_TO_BIN(UUID()), "${name}", ${price}, ${stock}, "${category}", "${description}", "${specifications}")`,
        (err, result, fields) => {
            if (err) {
                var error = err.toString();
            }
            if (
                err &&
                error.localeCompare(
                    "Error: ER_BAD_FIELD_ERROR: Unknown column 'NaN' in 'field list'"
                ) === 0
            ) {
                res.send("Succes!");
            } else if (err) {
                res.send("Eroare la server! Eroare: " + err);
                console.error("Eroare: " + err);
            } else {
                res.send("Succes!");
            }
        }
    );

    //</MySQL>
    try {
        var storage = multer.diskStorage({
            destination: function (request, file, cb) {
                const folderPath = `./../server/assets/${request.body.name}`;

                //creates a folder with the name of the product, where the corresponding assets will be stored
                if (!io.existsSync(folderPath)) {
                    io.mkdir(folderPath, { recursive: false }, (err) => {
                        if (err) console.log(err);
                    });
                }
                //store in...
                cb(null, folderPath);
                //wait until files are stored (3 seconds)
                setTimeout(function () {
                    createThumbnail(folderPath);
                }, 3000);
            },
            filename: function (req, file, cb) {
                var originalName = file.originalname;
                var dotPosition = originalName.search(/[.]/g);
                var extension = originalName.substring(dotPosition);
                cb(
                    null,
                    `${Date.now()}-${
                        Math.random().toFixed(3) * 1000
                    }${extension}`
                );
            },
        });

        var upload = multer({
            storage: storage,
            limits: { fileSize: 30000000 },
        }).fields([
            { name: "photos", maxCount: 15 },
            { name: "video", maxCount: 1 },
            { name: "obj", maxCount: 1 },
        ]);

        //<files>
        upload(req, res, (err) => {
            if (err) console.log(err);
        });
        //</files>
    } catch (e) {
        console.log("Eroare la incarcarea fisierului");
    }
});

function createThumbnail(path) {
    //resizes first image
    io.readdir(path, (err, files) => {
        var file = files[0];
        jimp.read(`${path}\\${file}`)
            .then((photo) => {
                photo
                    .resize(jimp.AUTO, 125)
                    .quality(10)
                    .write(`${path}\\thumbnail.png`);
            })
            .catch((err) => {
                console.log("JIMP: " + err);
            });
    });
}

router.route("/addReview").post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const review = req.body.review;
    const rating = req.body.rating;

    var rawReviews;

    pool.query(
        `SELECT Reviews FROM products WHERE id = UUID_TO_BIN('${id}')`,
        (err, result, fileds) => {
            if (err) {
                console.log(err);
                res.send("Eroare!");
            } else {
                rawReviews = result[0].Reviews;

                if (rawReviews === undefined) {
                    rawReviews = `[${name}]:{{${rating}}${review}}`;
                } else {
                    rawReviews = rawReviews.concat(
                        `[${name}]:{{${rating}}${review}}`
                    );
                }

                pool.query(
                    `UPDATE products SET Reviews = '${rawReviews}' WHERE id = UUID_TO_BIN('${id}')`,
                    (err, result, fields) => {
                        if (err) {
                            res.send("Eroare la server! Eroare: " + err);
                            console.error("Eroare: " + err);
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
 * @description finds a product by id
 */
router.route("/id=:id").get((req, res) => {
    pool.query(
        `SELECT BIN_TO_UUID(id) id, Name, Price, OldPrice, Category, Description, Specifications, Reviews, Rating FROM products WHERE id = UUID_TO_BIN('${req.params.id}');`,
        (err, result, fields) => {
            if (err) {
                res.send("Eroare!");
            }
            res.send(result);
        }
    );
});

/**
 * @description deletes a product by id
 */
router.route("/:id").delete((req, res) => {});

/**
 * @description modifies a product by id
 */
router.route("/update/:id").post((req, res) => {
    Product.findById(req.params.id)
        .then((prod) => {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.stock = Number(req.body.stock);
            prod.priceBeforeDiscount = req.body.priceBeforeDiscount;
            prod.category = req.body.category;
            prod.description = req.body.description;
            prod.specifications = req.body.specifications;

            prod.save()
                .then(() => res.json("Produs modificat cu succes!"))
                .catch(() =>
                    res
                        .status(500)
                        .send(
                            "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                        )
                );
        })
        .catch(() =>
            res
                .status(500)
                .send(
                    "Eroare. Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                )
        );
});

router.route("/getPhotoNames/name=:name").get((req, res) => {
    io.readdir(`./../server/assets/${req.params.name}`, (err, files) => {
        if (err) {
            console.log(err);
            res.send([]);
        }
        res.send(files);
    });
});

module.exports = router;
