import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ImageSelector from "./components/ImageSelector";
import VideoSelector from "./components/VideoSelector";
import Obj3DSelector from "./components/Obj3DSelector";

import logo from "./../logo.svg";
import styles from "./addProduct.module.css";
import "./../App.css";
import { ProductCategories } from "./../components/ProductCategories";

function AddProduct() {
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        stock: 0,
        category: "Telefoane",
        description: "",
        specifications: "",
    });

    const [validInput, setValidInput] = useState({
        name: false,
        price: false,
        stock: false,
        description: false,
        specifications: false,
    });

    function onSubmit(e) {
        if (
            validInput.name === false ||
            validInput.price === false ||
            validInput.stock === false ||
            validInput.description === false ||
            validInput.specifications === false
        ) {
            alert("Unele câmpuri nu sunt completate corespunzător!");
            e.preventDefault();
            return;
        } else {
            const productDB = {
                name: product.name.toString(),
                price: parseFloat(product.price),
                stock: parseInt(product.stock),
                category: product.category.toString(),
                description: product.description.toString(),
                specifications: product.specifications.toString(),
            };

            axios({
                method: "POST",
                url: "http://localhost:5000/products/add",
                data: productDB,
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    function onChangeName(e) {
        if (e.target.value.length < 3) {
            e.target.style.backgroundColor = "#e77878";
            setValidInput((prevValue) => ({ ...prevValue, name: false }));
        } else {
            e.target.style.backgroundColor = "#fff";
            setValidInput((prevValue) => ({ ...prevValue, name: true }));
        }
        setProduct((prevValue) => ({ ...prevValue, name: e.target.value }));
    }

    function onChangePrice(e) {
        if (e.target.value <= 0 || isNaN(e.target.value)) {
            e.target.style.backgroundColor = "#e77878";
            setValidInput((prevValue) => ({ ...prevValue, price: false }));
        } else {
            e.target.style.backgroundColor = "#fff";
            setValidInput((prevValue) => ({ ...prevValue, price: true }));
        }
        setProduct((prevValue) => ({ ...prevValue, price: e.target.value }));
    }

    function onChangeStock(e) {
        if (e.target.value <= 0 || isNaN(e.target.value)) {
            e.target.style.backgroundColor = "#e77878";
            setValidInput((prevValue) => ({ ...prevValue, stock: false }));
        } else {
            e.target.style.backgroundColor = "#fff";
            setValidInput((prevValue) => ({ ...prevValue, stock: true }));
        }
        setProduct((prevValue) => ({
            ...prevValue,
            stock: e.target.value,
        }));
    }

    function onChangeCategory(e) {
        setProduct((prevValue) => ({ ...prevValue, category: e.target.value }));
    }

    function onChangeDescription(e) {
        if (e.target.value.length < 20) {
            e.target.style.backgroundColor = "#e77878";
            setValidInput((prevValue) => ({
                ...prevValue,
                description: false,
            }));
        } else {
            e.target.style.backgroundColor = "#fff";
            setValidInput((prevValue) => ({ ...prevValue, description: true }));
        }
        setProduct((prevValue) => ({
            ...prevValue,
            description: e.target.value,
        }));
    }

    function onChangeSpecifications(e) {
        if (e.target.value.length < 10) {
            e.target.style.backgroundColor = "#e77878";
            setValidInput((prevValue) => ({
                ...prevValue,
                specifications: false,
            }));
        } else {
            e.target.style.backgroundColor = "#fff";
            setValidInput((prevValue) => ({
                ...prevValue,
                specifications: true,
            }));
        }
        setProduct((prevValue) => ({
            ...prevValue,
            specifications: e.target.value,
        }));
    }

    return (
        <>
            <header className={styles.header}>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Logo-ul eDolly"
                        width={40}
                        style={{ cursor: "pointer", marginLeft: 15 }}
                    />
                </Link>
            </header>
            <div className={styles.gradientBorder}>
                <main className={styles.main}>
                    <h1
                        style={{
                            fontFamily: "Consolas",
                            textAlign: "center",
                        }}
                    >
                        Adăugați un produs în baza de date
                    </h1>
                    <br />
                    <br />
                    <form
                        action="http://localhost:5000/products/add"
                        onSubmit={onSubmit}
                        className={styles.form}
                        encType="multipart/form-data"
                        autoComplete="off"
                        method="POST"
                    >
                        <div>
                            <label htmlFor="name" className={styles.label}>
                                NUME:
                            </label>
                            <input
                                className={styles.textInput}
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={onChangeName}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="price" className={styles.label}>
                                PREȚ:
                            </label>
                            <input
                                className={styles.textInput}
                                type="text"
                                id="price"
                                name="price"
                                autoComplete="false"
                                autoCorrect="false"
                                required
                                onChange={onChangePrice}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="stock" className={styles.label}>
                                STOC:
                            </label>
                            <input
                                className={styles.textInput}
                                type="text"
                                id="stock"
                                name="stock"
                                autoComplete="false"
                                autoCorrect="false"
                                required
                                onChange={onChangeStock}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="category" className={styles.label}>
                                CATEGORIE:
                            </label>
                            <select
                                className={styles.selection}
                                name="category"
                                id="category"
                                onChange={onChangeCategory}
                            >
                                {ProductCategories.map((item, index) => {
                                    return (
                                        <optgroup label={item.name} key={index}>
                                            <hr />
                                            {item.subCategories.map(
                                                (subItem, index) => {
                                                    return (
                                                        <option
                                                            value={subItem}
                                                            key={index}
                                                        >
                                                            {subItem}
                                                        </option>
                                                    );
                                                }
                                            )}
                                            <hr />
                                        </optgroup>
                                    );
                                })}
                            </select>
                        </div>
                        <br />
                        <div className={styles.multimedia}>
                            <label className={styles.label}>MULTIMEDIA:</label>
                            <br />
                            <ImageSelector />
                            <VideoSelector />
                            <Obj3DSelector />
                        </div>
                        <br />
                        <div style={{ display: "block" }}>
                            <label
                                htmlFor="description"
                                className={styles.label}
                            >
                                DESCRIERE:
                            </label>
                            <br />
                            <br />
                            <textarea
                                style={{
                                    resize: "none",
                                    width: "95%",
                                    height: 200,
                                    overflow: "auto",
                                }}
                                id="description"
                                name="description"
                                placeholder="Scrieti descrierea produsului..."
                                required
                                onChange={onChangeDescription}
                            ></textarea>
                        </div>
                        <br />
                        <div className={styles.specifications}>
                            <label
                                htmlFor="specifications"
                                className={styles.label}
                            >
                                SPECIFICAȚII:
                            </label>
                            <p>
                                (scrieți numele specificației, puneți ":", iar
                                apoi scrieți valoarea; dacă există mai multe
                                valori, puneți "," între ele; după completarea
                                caracteristicii, puneți ";"; "/" va afișa
                                caracterul următor indiferent care este acesta
                                (".", ";" etc.))
                            </p>
                            <br />
                            <textarea
                                style={{
                                    resize: "none",
                                    width: "95%",
                                    height: 200,
                                    overflow: "auto",
                                }}
                                id="specifications"
                                name="specifications"
                                placeholder="Exemplu: caracteristică:valoare;caracteristică:valoare1,valoare2,valoare3;"
                                required
                                onChange={onChangeSpecifications}
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            value="Creați produsul!"
                            className={styles.submit}
                        />
                    </form>
                </main>
            </div>
        </>
    );
}

export default AddProduct;
