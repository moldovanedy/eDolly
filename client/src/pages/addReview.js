/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

import style from "./addReview.module.css";
import Header from "./../components/Header.component.js";
import Footer from "./../components/Footer.component.js";
import icon from "./../assets/icons/favicon.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function AddReview() {
    var { id } = useParams();

    var [data, setData] = useState();
    var [isDone, setIsDone] = useState(false);

    var [rating, setRating] = useState(1);
    var [review, setReview] = useState("");
    var [name, setName] = useState("");

    var [reviewPosted, setReviewPosted] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/id=" + id)
            .then((response) => {
                setData(response.data);
                setIsDone(true);
            });
    }, []);

    if (reviewPosted) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }

    return (
        <>
            <Header />
            {isDone === true ? (
                <>
                    <Helmet>
                        <link rel="icon" href={icon} />
                        <title>{`Adăugați recenzie pentru ${data[0].Name}`}</title>
                        <meta property="og:title" content={data[0].Name} />
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

                    <main>
                        <h2 style={{ textAlign: "center" }}>
                            Adăugare recenzie
                        </h2>
                        <h4>
                            Produs:{" "}
                            <b>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/produs/${id}`}
                                >
                                    {data[0].Name}
                                </Link>
                            </b>
                        </h4>
                        <h5>
                            <b>Reguli de respectat:</b>
                        </h5>

                        <div
                            className={style.rules}
                            style={{
                                backgroundColor: "#a5ffa0"
                            }}
                        >
                            <p>Așa DA:</p>
                            <ul>
                                <li>Folosiți cuvinte decente și simple.</li>
                                <li>
                                    Folosiți mimin 100 de caractere, dar maxim
                                    5000.
                                </li>
                                <li>
                                    Descrieți exact ce v-a plăcut/nu v-a plăcut
                                    în legătură cu produsul.
                                </li>
                            </ul>
                        </div>

                        <div
                            className={style.rules}
                            style={{
                                backgroundColor: "#ff645c"
                            }}
                        >
                            <p>Așa NU:</p>
                            <ul>
                                <li>
                                    NU criticați aspectele ce nu au legătură cu
                                    produsul (transportul, personalul).
                                </li>
                                <li>
                                    NU folosiți cuvinte obscene sau jignitoare.
                                </li>
                                <li>
                                    NU postați de mai multe ori aceeași
                                    recenzie.
                                </li>
                            </ul>
                        </div>

                        <form className={style.form}>
                            <label htmlFor="name">
                                Numele dvs. (va fi afișat împreună cu recenzia
                                dvs.):
                            </label>
                            <br />
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                id={style.name}
                                type={"text"}
                                placeholder="Numele dvs..."
                            />
                            <br />
                            <br />

                            <label htmlFor="review">
                                Recenzia dvs. (minim 100 caractere, maxim 5000
                                caractere):
                            </label>
                            <span
                                style={
                                    review.length < 100 || review.length > 5000
                                        ? { color: "#f00" }
                                        : { color: "#000" }
                                }
                            >
                                {review.length} / 5000
                            </span>
                            <br />
                            <textarea
                                onChange={(e) => {
                                    setReview(e.target.value);
                                }}
                                id={style.review}
                                placeholder="Scrieți recenzia aici..."
                                minLength={100}
                                maxLength={5000}
                            ></textarea>

                            <div>
                                <label>Rating:</label>
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={rating >= 1 ? "#e0d91c" : "#333"}
                                    onClick={() => {
                                        setRating(1);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={rating >= 2 ? "#e0d91c" : "#333"}
                                    onClick={() => {
                                        setRating(2);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={rating >= 3 ? "#e0d91c" : "#333"}
                                    onClick={() => {
                                        setRating(3);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={rating >= 4 ? "#e0d91c" : "#333"}
                                    onClick={() => {
                                        setRating(4);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    color={rating >= 5 ? "#e0d91c" : "#333"}
                                    onClick={() => {
                                        setRating(5);
                                    }}
                                />
                                <span> {rating}</span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "end"
                                }}
                            >
                                <input
                                    className={style.submitButton}
                                    value="Postați"
                                    type="submit"
                                    id="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (review.length < 100) {
                                            return false;
                                        }
                                        if (review.length > 5000) {
                                            return false;
                                        }
                                        if (name.length <= 0) {
                                            return false;
                                        }
                                        axios
                                            .post(
                                                "http://localhost:5000/products/addReview",
                                                {
                                                    id: id,
                                                    name: name,
                                                    review: review,
                                                    rating: rating
                                                }
                                            )
                                            .then((res) => {
                                                if (res.status !== 404) {
                                                    setReviewPosted(true);
                                                }
                                            });
                                    }}
                                />
                            </div>
                        </form>
                    </main>
                </>
            ) : null}
            {reviewPosted === true ? (
                <div className={style.dialogParent}>
                    <div className={style.reviewPostedDialog}>
                        <p>
                            Recenzia a fost postată cu succes!
                            <br />
                            Vă mulțumim!
                        </p>
                        <button
                            onClick={() => {
                                document.location.replace(
                                    `http://localhost:3000/produs/${id}`
                                );
                            }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            ) : null}

            <Footer />
        </>
    );
}

export default AddReview;
