import React from "react";
import { Link } from "react-router-dom";

import style from "./cartDetails.module.css";
import {
    removeFromCart,
    modifyNumberOfProducts,
    getNumberOfProducts
} from "./cartProductManager.redux.js";

function CartDetails(props) {
    var productData = props.products;

    function calculateTotal() {
        let total = 0;
        for (let i = 0; i < productData.length; i++) {
            total +=
                productData[i].Price * getNumberOfProducts(productData[i].id);
        }

        return total.toFixed(2);
    }

    return (
        <div className={style.centerAlign}>
            <div className={style.mainContainer}>
                {productData.map((product, index) => {
                    return (
                        <div key={index} className={style.productDetails}>
                            <div style={{ fontSize: "18px" }}>
                                <Link to={`/produs/${product.id}`}>
                                    <img
                                        src={`http://localhost:5000/assets/${product.Name}/thumbnail.png`}
                                        alt={product.Name}
                                        height="125px"
                                    />
                                    <p
                                        style={{
                                            color: "#000",
                                            textDecoration: "none"
                                        }}
                                    >
                                        {product.Name}
                                    </p>
                                </Link>
                                <b>{`${product.Price} Lei / bucată`}</b>
                            </div>
                            <div
                                className={style.centerAlign}
                                style={{ marginTop: "20px" }}
                            >
                                <input
                                    type={"number"}
                                    style={{ width: "50px" }}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        modifyNumberOfProducts(
                                            product.id,
                                            parseInt(e.target.value)
                                        );
                                    }}
                                    min={1}
                                    max={100}
                                    defaultValue={getNumberOfProducts(
                                        product.id
                                    )}
                                />{" "}
                                bucăți
                            </div>
                            <div
                                className={style.centerAlign}
                                style={{ flexDirection: "column" }}
                            >
                                <p
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {(
                                        product.Price *
                                        getNumberOfProducts(product.id)
                                    ).toFixed(2)}{" "}
                                    Lei
                                    {/* price * the number of products */}
                                </p>
                                <button
                                    onClick={() => {
                                        removeFromCart(product.id);
                                        document.location.reload();
                                    }}
                                    className={style.deleteBtn}
                                >
                                    Șterge din coș
                                </button>
                            </div>
                        </div>
                    );
                })}
                <div
                    className={style.productDetails}
                    style={{ display: "inline" }}
                >
                    <span
                        className={style.totalPriceDisplay}
                        style={{
                            float: "left",
                            fontSize: "28px"
                        }}
                    >
                        TOTAL:
                    </span>
                    <span
                        className={style.totalPriceDisplay}
                        style={{
                            float: "right",
                            fontSize: "24px"
                        }}
                    >
                        {calculateTotal()} Lei
                    </span>
                </div>
            </div>
            <footer className={style.footer}>
                <Link to={"/comanda"} className={style.continueOrderBtn}>
                    Continuă &gt; &gt;
                </Link>
            </footer>
        </div>
    );
}

export default CartDetails;
