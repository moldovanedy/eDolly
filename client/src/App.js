import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage.js";
import Err404 from "./404.js";
import Cart from "./pages/cart.js";
import FavouriteProducts from "./pages/favouriteProducts.js";
import PrivacyPolicy from "./pages/help/PrivacyPolicy.js";
import SearchResults from "./pages/search/searchResults.js";
import Product from "./pages/product.js";
import AddReview from "./pages/addReview.js";
import OrderDetails from "./pages/orderDetails.js";
import PaymentAndOrderConfirmation from "./pages/paymentAndOrderConfirmation.js";
import Obj3dExplorer from "./pages/obj3dExplorer.js";

import ForgotPassword from "./pages/auth/forgotPassword.js";
import Register from "./pages/auth/register.js";
import Login from "./pages/auth/login.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/cos-de-cumparaturi" exact element={<Cart />} />
                <Route path="/favorite" exact element={<FavouriteProducts />} />
                <Route path="/comanda" exact element={<OrderDetails />} />
                <Route
                    path="/plata-si-finalizare"
                    exact
                    element={<PaymentAndOrderConfirmation />}
                />

                <Route path="/creare-cont" exact element={<Register />} />
                <Route path="/logare" exact element={<Login />} />
                <Route
                    path="/parola-uitata"
                    exact
                    element={<ForgotPassword />}
                />

                <Route
                    path={`/produse=:categorie/pag=:page`}
                    element={<SearchResults mode="category" />}
                />

                <Route
                    path={`/cautare=:productName/pag=:page`}
                    element={<SearchResults mode="name" />}
                />

                <Route path={"/produs/:id"} element={<Product />} />
                <Route
                    path={"/vizualizator-3d/:id"}
                    element={<Obj3dExplorer />}
                />
                <Route path={"/recenzie-produs/:id"} element={<AddReview />} />

                <Route
                    path="/confidentialitate"
                    exact
                    element={<PrivacyPolicy />}
                />

                <Route path="*" element={<Err404 />} />
            </Routes>
        </Router>
    );
}

export default App;
