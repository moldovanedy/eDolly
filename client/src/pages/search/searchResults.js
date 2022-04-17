/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Header from "../../components/Header.component";
import render from "./renderProducts";
import Footer from "../../components/Footer.component";
import style from "./searchResults.module.css";
import Filters from "../../components/Filters.component";
import { useDispatch } from "react-redux";
import {
    changeSortingRule,
    setProductsPerPage
} from "../../components/sortingManager.redux";
import logo from "./../../assets/icons/favicon.ico";
import ProductCardPlaceholder from "../../components/Product/ProductCardPlaceholder.component";

function SearchResults() {
    var { categorie } = useParams();

    const dispatch = useDispatch();

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

    var [isDone, setIsDone] = useState(false);

    //<sorting>
    function onChangeSortingRule(e) {
        e.preventDefault();
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
        dispatch(changeSortingRule(sort.sortingRule));
        dispatch(setProductsPerPage(parseInt(sort.productsPerPage)));
    }

    function onChangeProductsPerPage(e) {
        e.preventDefault();
        setSort((prevValue) => ({
            ...prevValue,
            productsPerPage: parseFloat(e.target.value)
        }));
        console.log(sort);
        dispatch(changeSortingRule(sort.sortingRule));
        dispatch(setProductsPerPage(parseInt(sort.productsPerPage)));
    }
    //</sorting>

    var [products, setProducts] = useState([]);
    var filters = useSelector((state) => state.filters);

    return (
        <>
            <Helmet>
                <title>{categorie}</title>
                <link rel="icon" href={logo} />
            </Helmet>
            <Header />

            <Breadcrumb>
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

                        <main className={style.mainContainerSearch}>
                            {useEffect(() => {
                                axios
                                    .post(
                                        "http://localhost:5000/products",
                                        defaultRequest
                                    )
                                    .then((res) => {
                                        setProducts(res.data);
                                        setIsDone(true);
                                    })
                                    .catch((err) => {
                                        console.log("Eroare: " + err);
                                    });
                            }, [])}
                            {isDone ? (
                                render(products, filters, sort)
                            ) : (
                                // needs improovements :)
                                <>
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                    <ProductCardPlaceholder />
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default SearchResults;
