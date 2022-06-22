/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import axios from "axios";

import Header from "./../components/Header.component";
import { getCartProducts } from "./../components/Cart/cartProductManager.redux";
import Footer from "./../components/Footer.component";
import OrderDetailsForm from "./../components/Cart/OrderDetailsForm.component";

import style from "./orderDetails.module.css";
import { Link } from "react-router-dom";
// import { Form } from "react-bootstrap";

function OrderDetails() {
    var products = getCartProducts();
    return (
        <>
            <Helmet>
                <title>Finalizare comandă</title>
            </Helmet>

            <Header />
            <h2 style={{ margin: "10px" }}>
                Urmează să finalizați comanda următoare:
            </h2>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>Produs</th>
                        <th>Cantitate</th>
                        <th>Pret</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        var cartProducts = getCartProducts();
                        var id = cartProducts[index][0];

                        return (
                            <DisplayProductInfo id={id} productData={product} />
                        );
                    })}
                </tbody>
            </table>
            <br />
            <br />

            <p>
                Vă rugăm completați următorul formular pentru a finaliza
                comanda.
            </p>

            <p>
                Câmpurile marcate cu <span style={{ color: "#f00" }}>*</span>{" "}
                sunt obligatorii.
            </p>

            <OrderDetailsForm />

            <Footer />
        </>
    );
}

function DisplayProductInfo(props) {
    var [arr, setArr] = useState([]);
    var [isDone, setIsDone] = useState(false);
    var id = props.id;

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/id=" + id)
            .then((response) => {
                setArr(response.data);
                setIsDone(true);
            });
    }, []);

    return (
        <tr>
            {isDone ? (
                <>
                    <td>
                        <Link to={`/produs/${id}`}>{arr[0].Name}</Link>
                    </td>
                    <td>{props.productData[1]}</td>
                    <td>{arr[0].Price} Lei</td>
                </>
            ) : null}
        </tr>
    );
}

export default OrderDetails;
