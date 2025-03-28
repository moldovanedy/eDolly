/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleRight,
    faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";

import "./../App.css";
import style from "./../homepage.module.css";
import render from "../pages/search/renderProducts.js";

var defaultRequest = {
    name: "",
    minPrice: 0,
    maxPrice: 1000000,
    isInStock: true,
    category: "",
    number: 20,
    page: 1
};

function numberOfPixelsToScroll() {
    var clientWidth = window.innerWidth * 0.9;

    if (clientWidth < 768) {
        return Math.floor(clientWidth / 170) * 170;
    } else {
        //translate smaller amount if screen size exceeds 768px so as to not miss products
        return Math.floor(clientWidth / 170) * 150;
    }
}

function ProductScroller(props) {
    var [products, setProducts] = useState([]);
    var [xPositionProducts, setXPositionProducts] = useState(0);

    return (
        <>
            <h2 style={{ marginLeft: "5%" }}>{props.title}</h2>
            <div className={style.productNavigator}>
                <button
                    className={`${style.buttonLeft} ${style.button}`}
                    onClick={() => {
                        if (xPositionProducts < 0) {
                            var x = numberOfPixelsToScroll();
                            setXPositionProducts(xPositionProducts + x);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />{" "}
                </button>

                <div
                    className={style.productContainer}
                    id="Telefoane_Navigator"
                >
                    <div
                        className={style.scrollableContainer}
                        style={{
                            transform:
                                "translate(" + xPositionProducts + "px, 0px)",
                            transition: "transform 0.5s ease-in-out"
                        }}
                    >
                        {useEffect(() => {
                            defaultRequest.category = props.title;
                            axios
                                .post(
                                    "http://localhost:5000/products",
                                    defaultRequest
                                )
                                .then((res) => {
                                    products = setProducts(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }, [])}

                        {render(products)}
                    </div>
                </div>

                <button
                    className={`${style.buttonRight} ${style.button}`}
                    onClick={() => {
                        if (xPositionProducts > -170 * 20) {
                            var x = numberOfPixelsToScroll();
                            setXPositionProducts(xPositionProducts - x);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />{" "}
                </button>
            </div>
            <br />
        </>
    );
}

export default ProductScroller;
