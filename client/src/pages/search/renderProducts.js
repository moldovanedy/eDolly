import React from "react";

import defaultImage from "./../../assets/images/imgNotFound.jpg";
import ProductCard from "../../components/ProductCard.component.js";
import { getFavouriteProducts } from "../../components/Cart/productManager.redux.js";

function render(prod, filters = null, sort = null) {
    var productName,
        productOldPriceFloor,
        productOldPriceRemainder,
        productPriceFloor,
        productPriceRemainder,
        imageUrl = defaultImage;
    var i = 0;
    let isFavProduct = false;

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
            "http://localhost:5000/assets/" + product.Name + "/thumbnail.png";

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

        //checks if this product is favourite
        isFavProduct = getFavouriteProducts(product.id + ";");

        //<filters>
        if (filters !== null) {
            if (
                product.Price < filters.minPrice ||
                product.Price > filters.maxPrice ||
                product.Rating < filters.minRating ||
                product.Rating > filters.maxRating
            ) {
                return null;
            }
        }
        //</filters>

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
                rating={product.Rating}
                imgUrl={imageUrl}
                uuid={product.id}
                isFavourite={isFavProduct}
                key={i}
            />
        );
    });
}

export default render;
