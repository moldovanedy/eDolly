import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import style from "./../../homepage.module.css";
import blankImage from "./../../assets/images/blank.png";

function ProductCardPlaceholder() {
    return (
        <div className={style.product}>
            <div style={{ width: "100%", position: "relative" }}></div>
            <div style={{ height: "140px" }}>
                <img
                    src={blankImage}
                    alt={"Se încarcă"}
                    style={{
                        width: "125px",
                        heigth: "125px"
                    }}
                />
            </div>
            <Skeleton width={100} />
            <div style={{ position: "absolute", marginTop: "130%" }}>
                <div style={{ fontSize: "14px" }}>
                    <Skeleton width={100} />
                </div>
                <div>
                    <div>
                        <span className={style.oldPriceStyle}>
                            <Skeleton width={100} />
                        </span>
                    </div>
                    <div style={{ fontSize: "18px", color: "#ff3366" }}>
                        <Skeleton width={100} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardPlaceholder;
