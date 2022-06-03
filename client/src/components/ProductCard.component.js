import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./Cart/productManager.redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";

import style from "./../homepage.module.css";
import {
    addToFavourites,
    removeFromFavourites
} from "./Cart/productManager.redux";

function ProductCard(props) {
    const dispatch = useDispatch();

    var rating = props.rating,
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

    return (
        <Link to={`/produs/${props.uuid}`}>
            <div className={style.product}>
                <div style={{ width: "100%", position: "relative" }}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        onClick={(e) => {
                            var isAdded = addToFavourites(props.uuid);
                            if (isAdded !== null) {
                                dispatch(increment());
                            } else {
                                removeFromFavourites(props.uuid);
                                dispatch(decrement());
                            }
                            document.location.reload();
                            e.preventDefault();
                            return false;
                        }}
                        style={{
                            position: "absolute",
                            marginLeft: "120px",
                            color: props.isFavourite ? "#f00" : "#444",
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
        </Link>
    );
}

export default ProductCard;
