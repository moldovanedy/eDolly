import React from "react";
import { Helmet } from "react-helmet";

import Header from "../components/Header";
import { getProducts } from "../components/Cart/productManager";

function FavouriteProducts() {
    return (
        <>
            <Helmet>
                <title>Produse favorite</title>
            </Helmet>

            <Header />

            <p>{getProducts()}</p>
        </>
    );
}

export default FavouriteProducts;
