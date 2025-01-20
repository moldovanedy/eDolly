import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Toast, ToastContainer } from "react-bootstrap";

import Header from "./../../components/Header.component.js";
import Footer from "./../../components/Footer.component.js";
import style from "./loginAndRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelopeOpen,
    faEye,
    faEyeSlash,
    faLock
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    var [passwordVisibility, setPasswordVisibility] = useState(false);

    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    var [res, setRes] = useState(null);
    var [show, setShow] = useState(false);

    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisibility);
    }

    function validateEmail(value) {
        if (value === null || value === undefined) {
            return false;
        }

        var emailField = document.getElementById("email");
        var errorText = document.getElementById("emailError");

        emailField.style.border = "3px solid #f00";

        setEmail(value);
        if (value.length <= 2) {
            errorText.innerText = "Email-ul e prea scurt!";
            return false;
        } else if (value.length >= 90) {
            errorText.innerText = "Email-ul e prea lung!";
            return false;
        } else {
            errorText.innerText = "";
            emailField.style.border = "none";
            return true;
        }
    }

    function validatePassword(value) {
        if (value === null || value === undefined) {
            return false;
        }

        var passwordField = document.getElementById("password");
        var errorText = document.getElementById("passwordError");

        passwordField.style.border = "3px solid #f00";

        setPassword(value);
        if (value.length < 8) {
            errorText.innerText = "Parola e prea scurtă!";
            return false;
        } else if (value.length > 64) {
            errorText.innerText = "Parola e prea lungă!";
            return false;
        } else if (value.search(/[0-9]/) === -1) {
            errorText.innerText =
                "Parola trebuie să conțină minim 8 caractere și minim o cifră!";
            return false;
        } else {
            errorText.innerText = "";
            passwordField.style.border = "none";
            return true;
        }
    }

    function createAccount() {
        var accountData = {
            email: email,
            password: password
        };

        if (
            validateEmail(accountData.email) &&
            validatePassword(accountData.password)
        ) {
            axios({
                method: "POST",
                url: "http://localhost:5000/users/login",
                data: accountData,
                withCredentials: true
            })
                .then((response) => {
                    console.log(response);
                    setShow(true);

                    if (response.data === "Autentificat cu succes") {
                        setRes({
                            title: "Succes!",
                            content: "Autentificat cu succes!"
                        });
                    } else if (
                        response.data ===
                        "Numele de utilizator sau parola nu sunt corecte!"
                    ) {
                        setRes({
                            title: "Date incorecte!",
                            content:
                                "Numele de utilizator sau parola nu sunt corecte!"
                        });
                    } else if (
                        response.data === "Ceva nu a funcționat corect"
                    ) {
                        setRes({
                            title: "Eroare!",
                            content:
                                "Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setRes({
                        title: "Eroare!",
                        content:
                            "Ceva nu a funcționat corect. Vă rugăm încercați mai târziu."
                    });
                });
        } else {
            console.log(
                validateEmail(accountData.email) +
                    " " +
                    validatePassword(accountData.password)
            );
        }
    }

    return (
        <>
            <Helmet>
                <title>Intrați în cont - eDolly</title>
            </Helmet>

            <Header />

            {show ? (
                <div className={style.toast}>
                    <ToastContainer position="bottom-center">
                        <Toast
                            onClose={() => setShow(false)}
                            show={show}
                            delay="5000"
                            autohide
                            style={{ boxShadow: "3px 1px 6px 3px" }}
                        >
                            <Toast.Header closeButton={false}>
                                {res.title}
                            </Toast.Header>
                            <Toast.Body>{res.content}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            ) : null}

            <main className={style.main}>
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "50px",
                        fontWeight: "bold"
                    }}
                >
                    Logare
                </h2>
                <Form className={style.registerForm}>
                    <Form.Group>
                        <Form.Label className={style.labels}>
                            E-mail{"  "}
                            <FontAwesomeIcon icon={faEnvelopeOpen} />
                        </Form.Label>
                        <p id="emailError"></p>
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="Introduceți email-ul aici"
                            onChange={(e) => {
                                validateEmail(e.target.value);
                            }}
                        ></Form.Control>

                        <div style={{ position: "relative" }}>
                            <Form.Label className={style.labels}>
                                Parola{"  "}
                                <FontAwesomeIcon icon={faLock} />
                            </Form.Label>
                            <p id="passwordError"></p>
                            <Form.Control
                                type={passwordVisibility ? "text" : "password"}
                                id="password"
                                placeholder="Introduceți parola aici"
                                onChange={(e) => {
                                    validatePassword(e.target.value);
                                }}
                            ></Form.Control>
                            <FontAwesomeIcon
                                className={style.togglePasswordVisibility}
                                onClick={() => {
                                    togglePasswordVisibility();
                                }}
                                size={"lg"}
                                icon={
                                    passwordVisibility === true
                                        ? faEye
                                        : faEyeSlash
                                }
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <Link to={"/parola-uitata"}>Am uitat parola!</Link>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            Nu aveți un cont?{" "}
                            <Link to={"/creare-cont"}>Creați unul</Link>
                        </div>
                    </Form.Group>
                </Form>

                <div
                    className={style.centerAlign}
                    style={{ justifyContent: "end", margin: "20px" }}
                >
                    <button
                        onClick={() => {
                            createAccount();
                        }}
                        className={style.createAccount}
                    >
                        Logare
                    </button>
                </div>

                <Footer />
            </main>
        </>
    );
}

export default Login;
