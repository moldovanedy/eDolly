/* eslint-disable array-callback-return */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import style from "./../../pages/product.module.css";

export function RenderSpecificationsAsTable(props) {
    var rawData = props.rawData,
        rows,
        keys = [],
        values = [];
    rows = rawData.split(/[;]/gm);

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].split(/[:]/gm);
        keys.push(row[0]);
        values.push(row[1]);
    }

    return (
        <section>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: "10px",
                                borderRight: "1px solid #bbb",
                                backgroundColor: "#ccc" //overrides stylesheet
                            }}
                        >
                            Caracteristică
                        </th>
                        <th
                            style={{
                                padding: "10px",
                                backgroundColor:
                                    "#ccc" /* overrides stylesheet */
                            }}
                        >
                            Valoare
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((_, index) => {
                        let foramttedValues;
                        if (values[index] !== undefined) {
                            foramttedValues = values[index].split(/[,]/gm);
                            return (
                                <tr key={index}>
                                    <td>{keys[index]}</td>
                                    <td>
                                        {foramttedValues.map((val) => {
                                            return (
                                                <div key={Math.random()}>
                                                    {val}
                                                </div>
                                            );
                                        })}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </section>
    );
}

export function RenderReviews(props) {
    var rawData = props.rawData,
        reviews = [];
    var separated = rawData.split(/}/gm); // will return array of strings separated on each "}" from rawData

    for (let i = 0; i < separated.length; i += 2) {
        reviews.push(separated[i] + "}" + separated[i + 1] + "}");
    }

    return (
        <section>
            {reviews.map((rev, index) => {
                let name = rev.substring(1, rev.search(/]/));
                let rating = rev.substring(
                    rev.search(/{/) + 2,
                    rev.search(/}/)
                );
                let text = rev.substring(rev.search(/}/) + 1, rev.length - 1);

                //because last item is undefined
                if (index === reviews.length - 1) {
                    return;
                }

                return (
                    <div className={style.reviewCard} key={index}>
                        <h4 className={style.reviewText}>{name}</h4>
                        <p className={style.reviewText}>
                            <FontAwesomeIcon
                                icon={faStar}
                                color={rating >= 1 ? "#f5f25a" : "#333"}
                            />{" "}
                            <FontAwesomeIcon
                                icon={faStar}
                                color={rating >= 2 ? "#f5f25a" : "#333"}
                            />{" "}
                            <FontAwesomeIcon
                                icon={faStar}
                                color={rating >= 3 ? "#f5f25a" : "#333"}
                            />{" "}
                            <FontAwesomeIcon
                                icon={faStar}
                                color={rating >= 4 ? "#f5f25a" : "#333"}
                            />{" "}
                            <FontAwesomeIcon
                                icon={faStar}
                                color={rating >= 5 ? "#f5f25a" : "#333"}
                            />{" "}
                            <b>{rating}</b>
                        </p>
                        <br />
                        <p
                            className={style.reviewText}
                            style={{ textIndent: "25px" }}
                        >
                            {text}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}
