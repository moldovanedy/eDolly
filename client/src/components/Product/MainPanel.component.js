import style from "./../../pages/product.module.css";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addToFavourites } from "./../Cart/productManager.redux";

function MainPanel(props) {
    var data = props.componentData;

    var price = data.Price;
    let intPrice = price.toFixed(0);
    let fractionaryPart = (price - intPrice).toFixed(2).toString().substring(2);

    return (
        <div className={style.firstPanel}>
            <div style={{ backgroundColor: "#f00" }}>a</div>
            <div style={{ backgroundColor: "#0ff" }}>a</div>
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
                            {(price / 12).toFixed(2)}{" "}
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
                        onClick={addToFavourites(data.id)}
                    >
                        <FontAwesomeIcon icon={faHeart} size={"lg"} /> {"  "}
                        Adaugă la favorite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MainPanel;
