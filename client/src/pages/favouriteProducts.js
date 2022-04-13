/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import Header from "../components/Header.component";
import { getFavouriteProducts } from "../components/Cart/productManager.redux";
import render from "./search/renderProducts";

function FavouriteProducts() {
    var favourites = getFavouriteProducts();
    var [products, setProducts] = useState({ arr: [] });

    useEffect(() => {
        favourites.forEach((element) => {
            var id = element.substring(0, element.length - 1);
            axios
                .get("http://localhost:5000/products/id=" + id)
                .then((response) => {
                    setProducts((prevValue) => ({
                        ...prevValue,
                        arr: prevValue.arr.concat(response.data)
                    }));
                });
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Produse favorite</title>
            </Helmet>

            <Header />

            <h2>Produse favorite</h2>

            <main
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >
                {render(products.arr)}
            </main>
        </>
    );
}

export default FavouriteProducts;
