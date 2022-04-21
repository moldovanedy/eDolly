import React from "react";

function ProductImages(props) {
    var imageUrl =
        "http://localhost:5000/assets/" + props.productName + "/thumbnail.png";

    return (
        <div>
            <img src={imageUrl} width="100%" alt="Imagine produs" />
        </div>
    );
}

export default ProductImages;
