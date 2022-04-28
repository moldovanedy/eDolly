/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import Header from "../components/Header.component";
import { getCartProducts } from "./../components/Cart/cartProductManager.redux";
import render from "./search/renderProducts";
import style from "./search/searchResults.module.css";

function Cart() {
    var cartProducts = getCartProducts();
    var [products, setProducts] = useState({ arr: [] });

    useEffect(() => {
        if (cartProducts !== null) {
            cartProducts.forEach((element) => {
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
        }
    }, []);

    var windowSize = window.innerWidth;

    return (
        <>
            <Helmet>
                <title>Coș de cumpărături</title>
            </Helmet>

            <Header />

            <h2>Coșul de cumpărături</h2>

            <main
                className={style.mainContainerSearch}
                style={{ maxWidth: windowSize }}
            >
                {render(products.arr)}
                {cartProducts === null || cartProducts === undefined ? (
                    <p>Se pare că nu aveți niciun produs în coș.</p>
                ) : null}
            </main>
        </>
    );
}

export default Cart;
