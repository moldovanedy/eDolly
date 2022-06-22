import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import Err404 from "./404";
import Cart from "./pages/cart";
import FavouriteProducts from "./pages/favouriteProducts";
import PrivacyPolicy from "./pages/help/PrivacyPolicy";
import SearchResults from "./pages/search/searchResults";
import Product from "./pages/product";
import AddReview from "./pages/addReview";
import OrderDetails from "./pages/orderDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/cos-de-cumparaturi" exact element={<Cart />} />
                <Route path="/favorite" exact element={<FavouriteProducts />} />
                <Route path="/comanda" exact element={<OrderDetails />} />

                <Route
                    path={`/produse=:categorie/pag=:page`}
                    element={<SearchResults mode="category" />}
                />

                <Route
                    path={`/cautare=:productName/pag=:page`}
                    element={<SearchResults mode="name" />}
                />

                <Route path={"/produs/:id"} element={<Product />} />
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
