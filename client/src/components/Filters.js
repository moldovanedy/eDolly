import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    changeAvailability,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setMaxRating
} from "./filterManager";

import style from "./../pages/search/searchResults.module.css";

function Filters() {
    const dispatch = useDispatch();

    var [filters, setFilters] = useState({
        availability: "",
        minPrice: 0,
        maxPrice: 1000000,
        minRating: 1,
        maxRating: 5
    });

    function onChangeFilters(e) {
        e.preventDefault();
        dispatch(changeAvailability(filters.availability));
        dispatch(setMinPrice(parseInt(filters.minPrice)));
        dispatch(setMaxPrice(parseInt(filters.maxPrice)));
        dispatch(setMinRating(parseInt(filters.minRating)));
        dispatch(setMaxRating(parseInt(filters.maxRating)));
        document.getElementById("minimumPrice").innerText = filters.minPrice;
        document.getElementById("maximumPrice").innerText = filters.minPrice;
        document.getElementById("minimumRating").innerText = filters.minPrice;
        document.getElementById("maximumRating").innerText = filters.minPrice;
    }

    function onChangeAvailability(e) {
        e.preventDefault();
        setFilters((prevValue) => ({
            ...prevValue,
            availability: e.target.id
        }));
    }

    function onChangeMinPrice(e) {
        e.preventDefault();
        let price = parseFloat(e.target.value);
        if (isNaN(price) || price < 0 || price >= filters.maxPrice) {
            document.getElementById("minimumPrice").style.backgroundColor =
                "#e3796d";
            return null;
        }
        setFilters((prevValue) => ({ ...prevValue, minPrice: price }));
        document.getElementById("minimumPrice").style.backgroundColor = "#fff";
    }

    function onChangeMaxPrice(e) {
        e.preventDefault();
        let price = parseFloat(e.target.value);
        if (isNaN(price) || price < 0 || price <= filters.minPrice) {
            document.getElementById("maximumPrice").style.backgroundColor =
                "#e3796d";
            return null;
        }
        setFilters((prevValue) => ({ ...prevValue, maxPrice: price }));
        document.getElementById("maximumPrice").style.backgroundColor = "#fff";
    }

    function onChangeMinRating(e) {
        e.preventDefault();
        let rating = parseInt(e.target.value);
        if (
            isNaN(rating) ||
            rating <= 0 ||
            rating > 5 ||
            rating >= filters.maxRating
        ) {
            return null;
        }
        setFilters((prevValue) => ({ ...prevValue, minRating: rating }));
    }

    function onChangeMaxRating(e) {
        let rating = parseInt(e.target.value);
        if (
            isNaN(rating) ||
            rating <= 0 ||
            rating > 5 ||
            rating <= filters.minRating
        ) {
            return null;
        }
        setFilters((prevValue) => ({ ...prevValue, maxRating: rating }));
    }

    return (
        <aside className={style.filters}>
            <Form>
                <Form.Group>
                    <h5 className={style.labels}>Disponibilitate</h5>
                    <Form.Check
                        className={style.labels}
                        type="radio"
                        label="În stoc"
                        name="availability"
                        id="inStock"
                        onChange={onChangeAvailability}
                        key={"FormCheck1"}
                    />
                    <Form.Check
                        className={style.labels}
                        type="radio"
                        label="Reducere"
                        name="availability"
                        id="discount"
                        onChange={onChangeAvailability}
                        key={"FormCheck2"}
                    />
                </Form.Group>

                <Form.Group>
                    <h5 className={style.labels}>Preț</h5>

                    <h5 className={style.labels}>Preț minim</h5>
                    <Form.Control
                        id="minimumPrice"
                        type="text"
                        defaultValue={filters.minPrice}
                        onChange={onChangeMinPrice}
                        key={"FormText1"}
                    />

                    <h5 className={style.labels}>Preț maxim</h5>
                    <Form.Control
                        id="maximumPrice"
                        type="text"
                        defaultValue={filters.maxPrice}
                        onChange={onChangeMaxPrice}
                        key={"FormText2"}
                    />

                    <h5 className={style.labels}>Rating minim</h5>
                    <Form.Control
                        id="minimumRating"
                        type="number"
                        defaultValue={filters.minRating}
                        onChange={onChangeMinRating}
                        key={"FormText3"}
                    />

                    <h5 className={style.labels}>Rating maxim</h5>
                    <Form.Control
                        id="maximumRating"
                        type="number"
                        defaultValue={filters.maxRating}
                        onChange={onChangeMaxRating}
                        key={"FormText4"}
                    />
                </Form.Group>

                <button
                    type="submit"
                    className={style.applyFiltersButton}
                    onClick={onChangeFilters}
                >
                    Filtrați
                </button>
            </Form>
        </aside>
    );
}

export default Filters;
