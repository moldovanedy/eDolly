/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

import defaultImage from "./../assets/images/Img_even_2.jpg";
import "./../App.css";
import style from "./../homepage.module.css";
import ProductCard from "./ProductCard";

var defaultRequest = {
    name: "",
    minPrice: 0,
    maxPrice: 1000000,
    isInStock: true,
    category: "",
    number: 20
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

    function render(prod) {
        var productName,
            productOldPriceFloor,
            productOldPriceRemainder,
            productPriceFloor,
            productPriceRemainder,
            imageUrl = defaultImage;
        var i = 0;
        return prod.map((product) => {
            if (product.Name.length > 40) {
                productName = product.Name.substring(0, 40) + "...";
            } else {
                productName = product.Name;
            }

            if (product.OldPrice !== null) {
                productOldPriceFloor = Math.floor(product.OldPrice);
                productOldPriceRemainder =
                    (product.OldPrice - Math.floor(product.OldPrice)) * 100;
                //if it's a fixed sum, write 00 as exponent
                if (productOldPriceRemainder === 0) {
                    productOldPriceRemainder = "00";
                }
            }

            imageUrl =
                "http://localhost:5000/assets/" +
                product.Name +
                "/thumbnail.png";

            productPriceFloor = Math.floor(product.Price);
            productPriceRemainder =
                (product.Price - Math.floor(product.Price)) * 100;

            var hasZeroInFront = false;
            //if it's a fixed sum, write 00 as exponent
            if (productPriceRemainder === 0) {
                productPriceRemainder = "00";
            } else if (productPriceRemainder < 10) {
                //if it has between 1 and 9 bani, write a 0 in front
                productPriceRemainder =
                    "0" + parseFloat(productPriceRemainder).toFixed(0);
                hasZeroInFront = true;
            }
            i++;
            return (
                <ProductCard
                    name={productName}
                    oldPriceFloor={productOldPriceFloor}
                    oldPriceRemainder={productOldPriceRemainder}
                    priceFloor={productPriceFloor}
                    priceRemainder={
                        hasZeroInFront
                            ? productPriceRemainder
                            : parseFloat(productPriceRemainder).toFixed(0)
                    }
                    imgUrl={imageUrl}
                    key={i}
                    uuid={product.id}
                />
            );
        });
    }

    return (
        <>
            <h2 style={{ marginLeft: "5%" }}>{props.title}</h2>
            <div className={style.productNavigator}>
                <button
                    className={style.buttonLeft}
                    onClick={() => {
                        if (xPositionProducts < 0) {
                            var x = numberOfPixelsToScroll();
                            setXPositionProducts(xPositionProducts + x);
                        }
                    }}
                >
                    &lt;
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
                    className={style.buttonRight}
                    onClick={() => {
                        if (xPositionProducts > -170 * 20) {
                            var x = numberOfPixelsToScroll();
                            setXPositionProducts(xPositionProducts - x);
                        }
                    }}
                >
                    &gt;
                </button>
            </div>
            <br />
        </>
    );
}

export default ProductScroller;
