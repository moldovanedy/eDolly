import React from "react";

import style from "./../../pages/product.module.css";
import {
    RenderSpecificationsAsTable,
    RenderReviews
} from "./DetailsPanelDataFormatter.component";

function DetailsPanel(props) {
    var data = props.componentData;

    return (
        <>
            <ProductNavigation />
            <div className={style.description} id="descriere">
                <h2>Descriere</h2>
                <section>{data.Description}</section>
                <br />
            </div>
            <div className={style.specifications} id="specificatii">
                <h2>Specificații</h2>
                <RenderSpecificationsAsTable rawData={data.Specifications} />
                <br />
            </div>
            <div id="recenzii">
                <h2>Recenzii</h2>
                <RenderReviews rawData={data.Reviews} />
            </div>
        </>
    );
}

function ProductNavigation() {
    return (
        <nav className={style.productNavigation}>
            <a href="#descriere">Descriere</a>
            <a href="#specificatii">Specificații</a>
            <a href="#recenzii">Recenzii</a>
        </nav>
    );
}

export default DetailsPanel;
