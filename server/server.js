const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(
    session({
        secret: "Caine1234",
        resave: true,
        saveUninitialized: true,
    })
);
// app.use(cookieParser("Caine1234"));
app.use(passport.initialize());
app.use(passport.session());
require("./auth/passport")(passport);

app.use("/assets", express.static(path.join(__dirname, "assets")));

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
    console.log(`Server-ul rulează pe portul: ${port}`);
});
