/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header.component";
import icon from "./../assets/icons/favicon.ico";
import { Breadcrumb } from "react-bootstrap";

function Product() {
    var { id } = useParams();

    var [data, setData] = useState();
    var [isDone, setIsDone] = useState(false);

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
            {" "}
            {isDone ? (
                <>
                    <Helmet>
                        <link rel="icon" href={icon} />
                        <title>{data[0].Name}</title>
                    </Helmet>

                    <Header />

                    <Breadcrumb>
                        <Breadcrumb.Item href={"/produse/" + data[0].Category}>
                            {data[0].Category}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Produs</Breadcrumb.Item>
                    </Breadcrumb>

                    <p>{data[0].Name}</p>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default Product;
