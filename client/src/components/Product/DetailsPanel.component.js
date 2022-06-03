import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
            <div style={{ backgroundColor: "#fafafa" }}>
                <div className={style.description} id="descriere">
                    <h2>Descriere</h2>
                    <section>{data.Description}</section>
                    <br />
                </div>
            </div>
            <div className={style.specifications} id="specificatii">
                <h2>Specificații</h2>
                <RenderSpecificationsAsTable rawData={data.Specifications} />
                <br />
            </div>
            <div style={{ backgroundColor: "#ddd" }}>
                <div id="recenzii">
                    <h2>Recenzii</h2>
                    <RenderReviews rawData={data.Reviews} />
                    {/* let title to be the whole product name, don't truncate (no other site truncates) */}
                    <br />
                    <Link
                        to={`/recenzie-produs/${data.id}`}
                        className={style.addReviewButton}
                    >
                        Adăugați o recenzie{" "}
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Link>
                    <br />
                    <br />
                </div>
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
