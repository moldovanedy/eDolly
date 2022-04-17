/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

import Header from "../components/Header.component";
import icon from "./../assets/icons/favicon.ico";
// import style from "./product.module.css";
import MainPanel from "../components/Product/MainPanel.component";

function Product() {
    var { id } = useParams();

    var [data, setData] = useState();
    var [isDone, setIsDone] = useState(false);

    var title = isDone ? data[0].Name : "";
    let reducedTitle = title.substring(0, 57);
    let displayTitle;
    if (title.length > reducedTitle.length) {
        displayTitle = reducedTitle + "...";
    } else {
        displayTitle = title;
    }

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/id=" + id)
            .then((response) => {
                setData(response.data);
                setIsDone(true);
            });
    }, []);

    return (
        <>
            <Header />{" "}
            {isDone ? (
                <>
                    <Helmet>
                        <link rel="icon" href={icon} />
                        <title>{displayTitle}</title>
                    </Helmet>
                    <main style={{ margin: "auto", maxWidth: "1200px" }}>
                        <section>
                            <Breadcrumb>
                                <Breadcrumb.Item
                                    href={"/produse/" + data[0].Category}
                                >
                                    {data[0].Category}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Produs</Breadcrumb.Item>
                            </Breadcrumb>

                            <h2>{data[0].Name}</h2>

                            <span style={{ fontSize: "12px", color: "#666" }}>
                                ID produs: {data[0].id}
                            </span>
                        </section>
                        <hr />

                        <MainPanel componentData={data[0]} />
                    </main>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default Product;
