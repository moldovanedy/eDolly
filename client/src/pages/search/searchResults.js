/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Header from "./../../components/Header";
import render from "./renderProducts";
import Footer from "./../../components/Footer";
import style from "./searchResults.module.css";
import Filters from "./../../components/Filters";

function SearchResults() {
    var { categorie } = useParams();

    var defaultRequest = {
        name: "",
        minPrice: 0,
        maxPrice: 1000000,
        isInStock: true,
        category: categorie,
        number: 100
    };

    var [sort, setSort] = useState({
        sortingRule: "random",
        productsPerPage: 100
    });

    //<sorting>
    function onChangeSortingRule(e) {
        e.preventDefault();
        console.log(e.target.value);
        let sortText = e.target.value,
            sortingRule;
        switch (sortText) {
            case "Relevanță":
                sortingRule = "random";
                break;
            case "Preț crescător":
                sortingRule = "priceAsc";
                break;
            case "Preț descrescător":
                sortingRule = "priceDesc";
                break;
            case "Reducere (%)":
                sortingRule = "discount";
                break;
            default:
                sortingRule = "random";
        }
        setSort((prevValue) => ({
            ...prevValue,
            sortingRule: sortingRule
        }));
        console.log(sort);
    }

    function onChangeProductsPerPage(e) {
        e.preventDefault();
        setTimeout(() => {
            setSort((prevValue) => ({
                ...prevValue,
                productsPerPage: parseFloat(e.target.value)
            }));
            console.log(sort);
        }, 100);
    }
    //</sorting>

    var [products, setProducts] = useState([]);
    var filters = useSelector((state) => state.filters);

    return (
        <>
            <Helmet>
                <title>{categorie}</title>
            </Helmet>
            <Header />

            <Breadcrumb>
                <Breadcrumb.Item href="#">Categorie</Breadcrumb.Item>
                <Breadcrumb.Item active>{categorie}</Breadcrumb.Item>
            </Breadcrumb>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <div className={style.sortingTab}>
                    <h2>{categorie}</h2>
                    <br />
                    <hr />

                    <span style={{ marginLeft: "7px" }}>Sortați după: </span>
                    <select
                        defaultValue={"random"}
                        onChange={onChangeSortingRule}
                        className={style.dropdown}
                    >
                        <option>Relevanță</option>
                        <option>Preț crescător</option>
                        <option>Preț descrescător</option>
                        <option>Reducere (%)</option>
                    </select>

                    <span style={{ marginLeft: "30px" }}>
                        Produse pe pagină:{" "}
                    </span>
                    <select
                        onChange={onChangeProductsPerPage}
                        defaultValue={100}
                        className={style.dropdown}
                    >
                        <option>60</option>
                        <option>80</option>
                        <option>100</option>
                    </select>

                    <br />
                    <br />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className={style.mainContent}>
                        <Filters />

                        <main
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                maxWidth: "1000px"
                            }}
                        >
                            {useEffect(() => {
                                axios
                                    .post(
                                        "http://localhost:5000/products",
                                        defaultRequest
                                    )
                                    .then((res) => {
                                        products = setProducts(res.data);
                                    })
                                    .catch((err) => {
                                        console.log("Eroare: " + err);
                                    });
                            }, [])}
                            {render(products, filters, sort)}
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default SearchResults;
