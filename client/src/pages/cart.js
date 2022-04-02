import React from "react";
import { Helmet } from "react-helmet";

import Header from "../components/Header";

function Cart() {
    return (
        <>
            <Helmet>
                <title>Coș de cumpărături</title>
            </Helmet>
            <Header />
            <div>Cart</div>
        </>
    );
}

export default Cart;
