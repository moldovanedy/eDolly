import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import style from "./../../pages/product.module.css";
import { increment, decrement } from "./../Cart/productManager.redux.js";
import {
    incrementCartSize,
    decrementCartSize
} from "./../Cart/cartProductManager.redux.js";
import {
    addToFavourites,
    removeFromFavourites
} from "./../Cart/productManager.redux.js";
import {
    addToCart,
    removeFromCart,
    doesProductExist
} from "./../Cart/cartProductManager.redux.js";
import ProductImages from "./ProductImages.component.js";

function MainPanel(props) {
    var data = props.componentData;

    var price = data.Price;
    let intPrice = price.toFixed(0);
    let fractionaryPart = (price - intPrice).toFixed(2).toString().substring(2);

    const dispatch = useDispatch();
    var [favButtonText, setFavButtonText] = useState("Adaugă la favorite");
    var [cartButtonText, setCartButtonText] = useState("Adaugă în coș");

    var rating = data.Rating,
        productRating;
    if (rating === null) {
        rating = 0;
        productRating = 0;
    } else if (rating >= 1 && rating <= 5) {
        productRating = Math.round(rating);
    } else {
        rating = 0;
        productRating = 0;
    }

    var pricePerMonth = 0;
    if (price <= 1000) {
        pricePerMonth = (price / 12).toFixed(2); //credit for 1 year
    } else if (price <= 3000) {
        pricePerMonth = (price / 36).toFixed(2); //credit for 3 years
    } else {
        pricePerMonth = (price / 60).toFixed(2); //credit for 5 years
    }

    if (doesProductExist(data.id) === true) {
        cartButtonText = "Adăugat în coș";
    }

    return (
        <div className={style.firstPanel}>
            <ProductImages id={data.id} productName={data.Name} />
            <div>
                <span>
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 1 ? "#e0d91c" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 2 ? "#e0d91c" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 3 ? "#e0d91c" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 4 ? "#e0d91c" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating === 5 ? "#e0d91c" : "#333"}
                    />{" "}
                </span>
                <span>{rating}</span>
                <br />
                <b>Beneficii:</b>
                <br />
                <ul className={style.advantagesList}>
                    <li>Retur gratuit timp de 30 de zile</li>
                    <li>Garanție 12 luni</li>
                    <li>Livrare rapidă (2-3 zile lucrătoare)</li>
                </ul>
            </div>
            <div className={style.priceTab}>
                <div className={style.price}>
                    <div
                        style={{
                            fontSize: "26px",
                            color: "#ff3366"
                        }}
                    >
                        {data.OldPrice === null ? "" : data.OldPrice}
                    </div>
                    <div
                        style={{
                            fontSize: "26px",
                            color: "#ff3366",
                            fontWeight: "bold"
                        }}
                    >
                        {intPrice} <sup>{fractionaryPart}</sup> Lei
                    </div>
                </div>
                <div>
                    <span style={{ textAlign: "right", display: "block" }}>
                        Sau în <b>rate lunare</b>
                    </span>
                    <span style={{ textAlign: "right", display: "block" }}>
                        de la{" "}
                        <span
                            style={{
                                fontSize: "22px"
                            }}
                        >
                            {pricePerMonth}{" "}
                        </span>
                        Lei
                    </span>
                </div>
                <div style={{ gridColumn: "1 / 3" }}>
                    <button
                        className={`${style.actionButtons} ${
                            cartButtonText === "Adăugat în coș"
                                ? style.activeButton
                                : null
                        }`}
                        onClick={() => {
                            var isAdded = addToCart(data.id);
                            if (isAdded !== null) {
                                dispatch(incrementCartSize());
                                setCartButtonText("Adăugat în coș");
                            } else {
                                removeFromCart(data.id);
                                dispatch(decrementCartSize());
                                setCartButtonText("Adaugă în coș");
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} size={"lg"} />{" "}
                        {"  "}
                        {cartButtonText}
                    </button>
                    <button
                        className={style.actionButtons}
                        onClick={() => {
                            var isAdded = addToFavourites(data.id);
                            if (isAdded !== null) {
                                dispatch(increment());
                                setFavButtonText("Adăugat la favorite");
                            } else {
                                removeFromFavourites(data.id);
                                dispatch(decrement());
                                setFavButtonText("Adaugă la favorite");
                            }
                            return false;
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} size={"lg"} /> {"  "}
                        {favButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainPanel;
