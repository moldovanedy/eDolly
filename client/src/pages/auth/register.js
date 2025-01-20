import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "./../../components/Header.component.js";
import Footer from "./../../components/Footer.component.js";
import style from "./loginAndRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEnvelopeOpen,
    faEye,
    faEyeSlash,
    faLock,
    faPhone,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Register() {
    var [passwordVisibility, setPasswordVisibility] = useState(false);
    var [confirmPasswordVisibility, setConfirmPasswordVisibility] =
        useState(false);

    var [username, setUsername] = useState("");
    var [email, setEmail] = useState("");
    var [phone, setPhone] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState({
        title: "",
        content: ""
    });

    var [res, setRes] = useState(null);
    var [show, setShow] = useState(false);

    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisibility);
    }

    function toggleConfirmPasswordVisibility() {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }

    function validateUsername(value) {
        if (value === null || value === undefined) {
            return false;
        }

        var usernameField = document.getElementById("username");
        var errorText = document.getElementById("usernameError");
        var regexp = /^[A-Za-z0-9[ \]]/gm;

        usernameField.style.border = "3px solid #f00";

        setUsername(value);
        if (value.length <= 2) {
            errorText.innerText = "Numele e prea scurt!";
            return false;
        } else if (value.length >= 90) {
            errorText.innerText = "Numele e prea lung!";
            return false;
        } else if (!regexp.test(value)) {
            errorText.innerText =
                "Numele poate să conțină doar litere de la A la Z și cifre!";
            return false;
        } else {
            errorText.innerText = "";
            usernameField.style.border = "none";
            return true;
        }
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

    function validatePhone(value) {
        if (value === null || value === undefined) {
            return false;
        }

        var phoneField = document.getElementById("phone");
        var errorText = document.getElementById("phoneError");
        var regexp = /^[0-9[ \]]$/gm;

        phoneField.style.border = "3px solid #f00";

        setPhone(value);

        if (value.length < 8) {
            errorText.innerText = "Nr. de telefon e prea scurt!";
            return false;
        } else if (value.length >= 14) {
            errorText.innerText = "Nr. de telefon e prea lung!";
            return false;
        } else if (regexp.test(value)) {
            errorText.innerText = "Nr. de telefon nu e valid!";
            return false;
        } else {
            errorText.innerText = "";
            phoneField.style.border = "none";
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

    function validateConfirmPassword(value) {
        if (value === null || value === undefined) {
            return false;
        }

        var confirmPasswordField = document.getElementById("passwordConfirm");
        var errorText = document.getElementById("confirmPasswordError");

        confirmPasswordField.style.border = "3px solid #f00";

        setConfirmPassword(value);
        if (value !== password) {
            errorText.innerText = "Parolele nu sunt aceleași!";
            return false;
        } else {
            errorText.innerText = "";
            confirmPasswordField.style.border = "none";
            return true;
        }
    }

    function createAccount() {
        var accountData = {
            name: username,
            email: email,
            phone: phone,
            password: password,
            confirmPass: confirmPassword
        };

        if (
            validateUsername(accountData.name) &&
            validateEmail(accountData.email) &&
            validatePhone(accountData.phone) &&
            validatePassword(accountData.password)
        ) {
            axios({
                method: "POST",
                url: "http://localhost:5000/users/add",
                data: accountData,
                withCredentials: true
            })
                .then((response) => {
                    console.log(response);
                    setShow(true);
                    if (response.data === "Succes!") {
                        console.log("Dolly");
                        setRes({
                            title: "Succes!",
                            content: "Contul a fost creat cu succes!"
                        });
                    } else if (
                        response.data ===
                        "Acest e-mail a fost înregistrat deja!"
                    ) {
                        setRes({
                            title: "Email-ul e înregistrat deja",
                            content: "Acest e-mail a fost înregistrat deja!"
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
                validateUsername(accountData.name) +
                    " " +
                    validateEmail(accountData.email) +
                    " " +
                    validatePhone(accountData.phone) +
                    " " +
                    validatePassword(accountData.password)
            );
        }
    }

    return (
        <>
            <Helmet>
                <title>Creați un cont - eDolly</title>
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
                    Creați un cont
                </h2>
                <Form className={style.registerForm}>
                    <Form.Group>
                        <Form.Label className={style.labels}>
                            Nume{"  "}
                            <FontAwesomeIcon icon={faUser} />
                        </Form.Label>
                        <p id="usernameError"></p>
                        <Form.Control
                            type="text"
                            id="username"
                            placeholder="Introduceți numele aici"
                            onChange={(e) => {
                                validateUsername(e.target.value);
                            }}
                        ></Form.Control>
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
                        <Form.Label className={style.labels}>
                            Număr de telefon{"  "}
                            <FontAwesomeIcon icon={faPhone} />
                        </Form.Label>
                        <p id="phoneError"></p>
                        <Form.Control
                            type="phone"
                            id="phone"
                            placeholder="Introduceți nr. de telefon aici"
                            onChange={(e) => {
                                validatePhone(e.target.value);
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
                        <div style={{ position: "relative" }}>
                            <Form.Label className={style.labels}>
                                Confirmare parolă{"  "}
                                <FontAwesomeIcon icon={faCheck} />
                            </Form.Label>
                            <p id="confirmPasswordError"></p>
                            <Form.Control
                                type={
                                    confirmPasswordVisibility
                                        ? "text"
                                        : "password"
                                }
                                id="passwordConfirm"
                                placeholder="Reintroduceți parola aici"
                                onChange={(e) => {
                                    validateConfirmPassword(e.target.value);
                                }}
                            ></Form.Control>
                            <FontAwesomeIcon
                                className={style.togglePasswordVisibility}
                                onClick={() => {
                                    toggleConfirmPasswordVisibility();
                                }}
                                size={"lg"}
                                icon={
                                    confirmPasswordVisibility === true
                                        ? faEye
                                        : faEyeSlash
                                }
                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            Aveți deja un cont?{" "}
                            <Link to={"/logare"}>Autentificați-vă</Link>
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
                        Creare
                    </button>
                </div>

                <Footer />
            </main>
        </>
    );
}

export default Register;
