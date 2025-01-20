/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";

import Header from "./../components/Header.component.js";
import Footer from "./../components/Footer.component.js";
import icon from "./../assets/icons/favicon.ico";
// import style from "./product.module.css";
import MainPanel from "./../components/Product/MainPanel.component.js";
import DetailsPanel from "./../components/Product/DetailsPanel.component.js";

function Product() {
    var { id } = useParams();

    var [data, setData] = useState();
    var [isDone, setIsDone] = useState(false);

    var title = isDone ? data[0].Name : "";

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
                        <title>{title}</title>
                        <meta property="og:title" content={title} />
                        <meta property="og:type" content="website" />
                        <meta
                            property="og:url"
                            content={`http://localhost:3000/produs/${id}`}
                        />
                        <meta
                            property="og:image"
                            content={`http://localhost:5000/assets/${data[0].Name}/thumbnail.png`}
                        />
                        <meta property="og:site_name" content="eDolly" />
                        <meta
                            property="og:description"
                            content="Comandați online de pe eDolly electronice, electrocasnice și multe altele. Livrare rapidă și retur gratuit în 30 de zile."
                        />
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
                        <DetailsPanel componentData={data[0]} />
                    </main>
                    <Footer />
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default Product;
