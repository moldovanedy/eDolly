/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header.component";
import render from "./renderProducts";
import Footer from "../../components/Footer.component";
import style from "./searchResults.module.css";
import Filters from "../../components/Filters.component";
import { useDispatch, useSelector } from "react-redux";
import {
    changeSortingRule,
    setProductsPerPage
} from "../../components/sortingManager.redux";
import logo from "./../../assets/icons/favicon.ico";
import ProductCardPlaceholder from "../../components/Product/ProductCardPlaceholder.component";

function SearchResults(props) {
    var { productName, page, categorie } = useParams();

    var prodName = "",
        categ = "",
        pageNumber = 1;

    if (props.mode === "name") {
        prodName = productName;
    } else if (props.mode === "category") {
        categ = categorie;
    }

    if (page !== undefined && page !== null) {
        pageNumber = page;
    } else {
        pageNumber = 1;
    }

    const dispatch = useDispatch();

    var defaultRequest = {
        name: prodName,
        minPrice: 0,
        maxPrice: 1000000,
        isInStock: true,
        category: categ,
        number: 100,
        page: pageNumber
    };

    var [sort, setSort] = useState({
        sortingRule: "random",
        productsPerPage: 100
    });

    var [isDone, setIsDone] = useState(false);
    var [shouldShowPagination, setShouldShowPagination] = useState(true);

    var [windowWidth, setWindowWidth] = useState(window.innerWidth);

    window.onresize = () => {
        setWindowWidth(window.innerWidth);
    };

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
                <title>
                    {props.mode === "category"
                        ? categorie
                        : `Rezultatele căutării pentru "${prodName}"`}
                </title>
                <link rel="icon" href={logo} />
            </Helmet>
            <Header />

            <Breadcrumb>
                <Breadcrumb.Item active>
                    {categorie !== undefined
                        ? categorie
                        : "Căutare: " + prodName}
                </Breadcrumb.Item>
            </Breadcrumb>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <div className={style.sortingTab}>
                    <h2>
                        {props.mode === "name"
                            ? `Rezultatele căutării pentru "${prodName}"`
                            : `${categ}`}
                    </h2>
                    <br />
                    <hr />
                    <div>
                        <span style={{ marginLeft: "30px" }}>
                            Sortați după:{" "}
                        </span>
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
                    </div>
                    <div>
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
                    </div>
                    <br />
                    <br />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className={style.mainContent}
                        style={
                            windowWidth < 600
                                ? { gridTemplateColumns: "auto" }
                                : null
                        }
                    >
                        {windowWidth > 600 ? <Filters /> : <OpenFilters />}

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
                                        axios
                                            .post(
                                                "http://localhost:5000/products/getNumberOfProducts",
                                                {
                                                    name: defaultRequest.name,
                                                    minPrice:
                                                        defaultRequest.minPrice,
                                                    maxPrice:
                                                        defaultRequest.maxPrice,
                                                    isInStock:
                                                        defaultRequest.isInStock,
                                                    category:
                                                        defaultRequest.category
                                                }
                                            )
                                            .then((res) => {
                                                var products =
                                                    res.data[0]["COUNT(*)"];
                                                if (
                                                    products <=
                                                    defaultRequest.number
                                                ) {
                                                    setShouldShowPagination(
                                                        false
                                                    );
                                                }
                                            });
                                    })
                                    .catch((err) => {
                                        console.log("Eroare: " + err);
                                    });
                            }, [])}
                            {isDone ? (
                                render(products, filters, sort)
                            ) : (
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

                {shouldShowPagination ? (
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <PaginationManager
                            page={pageNumber}
                            prodPerPage={sort.productsPerPage}
                            name={defaultRequest.name}
                            minPrice={defaultRequest.minPrice}
                            maxPrice={defaultRequest.maxPrice}
                            isInStock={defaultRequest.isInStock}
                            category={defaultRequest.category}
                        />
                    </div>
                ) : null}
            </div>

            <Footer />
        </>
    );
}

function PaginationManager(props) {
    var [isDone, setIsDone] = useState(false);
    var [numberOfProducts, setNumberOfProducts] = useState(0);
    var page = parseInt(props.page);
    var productsPerPage = props.prodPerPage;
    var pagesRequired = 1 + Math.floor(numberOfProducts / productsPerPage);

    axios
        .post("http://localhost:5000/products/getNumberOfProducts", {
            name: props.name,
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            isInStock: props.isInStock,
            category: props.category
        })
        .then((res) => {
            setNumberOfProducts(parseInt(res.data[0]["COUNT(*)"]));
            setIsDone(true);
        });

    let items = [1, 2, 3, 4, 5];

    return isDone ? (
        <Pagination style={{ margin: "10px" }}>
            <Pagination.First
                disabled={page === 1 ? true : false}
                onClick={() => {
                    navigateToPage(1);
                }}
            />
            <Pagination.Prev
                disabled={page === 1 ? true : false}
                onClick={() => {
                    navigateToPage(page - 1);
                }}
            />
            {/* page 1 */}
            <Pagination.Item
                key={1}
                active={1 === page}
                onClick={() => {
                    navigateToPage(1);
                }}
            >
                {1}
            </Pagination.Item>

            {page > 4 ? <Pagination.Ellipsis /> : null}
            {items.map((item, index) => {
                var i = index + (page - 2); //we want values from page - 2 to page + 2
                if (i < 2 || i >= pagesRequired) {
                    return null;
                } else {
                    return (
                        <Pagination.Item
                            key={i}
                            active={i === page}
                            onClick={() => {
                                navigateToPage(i);
                            }}
                        >
                            {i}
                        </Pagination.Item>
                    );
                }
            })}
            {page < pagesRequired - 3 ? <Pagination.Ellipsis /> : null}

            {/* last page */}
            <Pagination.Item
                key={pagesRequired}
                active={pagesRequired === page}
                onClick={() => {
                    navigateToPage(pagesRequired);
                }}
            >
                {pagesRequired}
            </Pagination.Item>

            <Pagination.Next
                disabled={page === pagesRequired ? true : false}
                onClick={() => {
                    navigateToPage(page + 1);
                }}
            />
            <Pagination.Last
                disabled={page === pagesRequired ? true : false}
                onClick={() => {
                    navigateToPage(pagesRequired);
                }}
            />
        </Pagination>
    ) : null;
}

function navigateToPage(page) {
    var currentUrl = document.location.href;
    var currentPageUrlIndex = currentUrl.indexOf("pag=");
    document.location.replace(
        currentUrl.substring(0, currentPageUrlIndex) + `pag=${page}`
    );
}

function OpenFilters() {
    var [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }

    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
                className={style.filterButton}
            >
                <FontAwesomeIcon icon={faFilter} />
                Filtre
            </button>

            <div
                className={
                    isOpen
                        ? style.filtersOnCenterScreen
                        : style.filtersOnCenterScreen + " " + style.hide
                }
            >
                <FontAwesomeIcon
                    icon={faTimes}
                    size="3x"
                    style={{
                        position: "absolute",
                        top: "1%",
                        right: "10%",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />
                <Filters />
            </div>
        </>
    );
}

export default SearchResults;
