import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import Err404 from "./404";
//import TemporarProdus from "./TemporarProdus";
import Cart from "./pages/cart";
import FavouriteProducts from "./pages/favouriteProducts";
import PrivacyPolicy from "./pages/help/PrivacyPolicy";
import SearchResults from "./pages/search/searchResults";

//import { productArray } from "./components/ProductCategories";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/cos-de-cumparaturi" exact element={<Cart />} />
                <Route path="/favorite" exact element={<FavouriteProducts />} />
                {/* {productArray.map((product, index) => {
                    return (
                        <Route
                            key={index}
                            path={`/produse/${product}`}
                            element={<SearchResults />}
                        />
                    );
                })} */}
                <Route
                    path={`/produse/:categorie`}
                    element={<SearchResults />}
                />

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
