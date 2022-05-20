/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import Header from "../components/Header.component";
import { getCartProducts } from "./../components/Cart/cartProductManager.redux";
import CartDetails from "../components/Cart/CartDetails.component";

function Cart() {
    var cartProducts = getCartProducts();
    var [products, setProducts] = useState({ arr: [] });
    var [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (cartProducts !== null && cartProducts !== undefined) {
            for (var i = 0; i < cartProducts.length; i++) {
                var id = cartProducts[i][0];
                axios
                    .get("http://localhost:5000/products/id=" + id)
                    .then((response) => {
                        setProducts((prevValue) => ({
                            ...prevValue,
                            arr: prevValue.arr.concat(response.data)
                        }));
                        setIsDone(true);
                    });
            }
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

            <main style={{ maxWidth: windowSize }}>
                {isDone === true ? (
                    <CartDetails products={products.arr} />
                ) : null}

                {cartProducts === null || cartProducts === undefined ? (
                    <p>Se pare că nu aveți niciun produs în coș.</p>
                ) : null}
            </main>
        </>
    );
}

export default Cart;
