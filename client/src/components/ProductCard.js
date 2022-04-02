import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "./Cart/productManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import style from "./../homepage.module.css";
import { addToFavourites } from "./Cart/productManager";

function ProductCard(props) {
    const dispatch = useDispatch();

    return (
        // <Link>
        <div className={style.product}>
            <div style={{ width: "100%", position: "relative" }}>
                <FontAwesomeIcon
                    icon={faHeart}
                    size="lg"
                    onClick={() => {
                        addToFavourites(props.uuid);
                        dispatch(increment());
                    }}
                    style={{
                        position: "absolute",
                        marginLeft: "120px",
                        cursor: "pointer"
                    }}
                />
            </div>
            <div style={{ height: "140px" }}>
                <img
                    src={props.imgUrl}
                    alt={props.name}
                    style={{
                        width: "auto",
                        height: "auto",
                        maxWidth: "125px",
                        maxHeigth: "125px"
                    }}
                />
            </div>
            <div style={{ textAlign: "center" }}>{props.name}</div>
            <div style={{ position: "absolute", marginTop: "130%" }}>
                <div style={{ fontSize: "14px" }}>
                    &#10004;&#10004;&#10004;&#10004;&#10005;
                </div>
                <div>
                    <div>
                        <span className={style.oldPriceStyle}>
                            {props.oldPriceFloor}
                        </span>
                        <sup className={style.oldPriceSuperscriptStyle}>
                            {props.oldPriceRemainder}
                        </sup>{" "}
                        {props.oldPriceFloor == null ? null : (
                            <span className={style.oldPriceStyle}>lei</span>
                        )}
                    </div>
                    <div style={{ fontSize: "18px", color: "#ff3366" }}>
                        <b>
                            {props.priceFloor}
                            <sup>{props.priceRemainder}</sup> lei
                        </b>
                    </div>
                </div>
            </div>
        </div>
        // </Link>
    );
}

export default ProductCard;
