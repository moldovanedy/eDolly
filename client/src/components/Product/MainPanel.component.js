import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import style from "./../../pages/product.module.css";
import { increment, decrement } from "./../Cart/productManager.redux";
import {
    addToFavourites,
    removeFromFavourites
} from "./../Cart/productManager.redux";
import ProductImages from "./ProductImages.component";

function MainPanel(props) {
    var data = props.componentData;

    var price = data.Price;
    let intPrice = price.toFixed(0);
    let fractionaryPart = (price - intPrice).toFixed(2).toString().substring(2);

    const dispatch = useDispatch();
    var [favButtonText, setFavButtonText] = useState("Adaugă la favorite");

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

    return (
        <div className={style.firstPanel}>
            <ProductImages id={data.id} productName={data.Name} />
            <div>
                <span>
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 1 ? "#ff0" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 2 ? "#ff0" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 3 ? "#ff0" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating >= 4 ? "#ff0" : "#333"}
                    />{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        color={productRating === 5 ? "#ff0" : "#333"}
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
                    <button className={style.actionButtons}>
                        <FontAwesomeIcon icon={faShoppingCart} size={"lg"} />{" "}
                        {"  "}
                        Adaugă în coș
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
