import React from "react";
import { Link } from "react-router-dom";

import style from "./cartDetails.module.css";
import {
    removeFromCart,
    modifyNumberOfProducts,
    getNumberOfProducts
} from "./cartProductManager.redux";

function CartDetails(props) {
    var productData = props.products;
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
                            </div>
                            <div className={style.centerAlign}>
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
                                    {product.Price} Lei
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
            </div>
            <footer className={style.footer}>
                <button className={style.continueOrderBtn}>
                    Continuă &gt; &gt;
                </button>
            </footer>
        </div>
    );
}

export default CartDetails;
