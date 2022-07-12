import React from "react";
import { Form } from "react-bootstrap";

import style from "./orderDetailsForm.module.css";

var cardDetails = {
    name: "",
    cardNumber: "",
    expirationYear: "",
    expirationMonth: "",
    cvv: ""
};

export function getCardDetails() {
    return cardDetails;
}

function CardPayment() {
    function nameValidation(value) {
        if (
            value === null ||
            value === undefined ||
            value.length <= 2 ||
            value.length >= 99
        ) {
            document.getElementById("name").style.border = "3px solid #f00";
            document.getElementById("nameError").innerText =
                "Numele nu pare să fie corect!";
            return false;
        } else {
            document.getElementById("nameError").innerText = "";
            document.getElementById("name").style.border = "none";
            cardDetails.name = value;
            return true;
        }
    }

    function cardNumberValidation(value) {
        if (value === null || value === undefined || value.length !== 16) {
            document.getElementById("cardNumber").style.border =
                "3px solid #f00";
            document.getElementById("cardNumberError").innerText =
                "Numărul nu pare să fie corect!";
            return false;
        } else {
            document.getElementById("cardNumberError").innerText = "";
            document.getElementById("cardNumber").style.border = "none";
            cardDetails.cardNumber = value;
            return true;
        }
    }

    function expirationYearValidation(value) {
        if (value === null || value === undefined || value === "default") {
            document.getElementById("expirationYear").style.border =
                "3px solid #f00";
            document.getElementById("expirationYearError").innerText =
                "Nu ați ales anul!";
            return false;
        } else {
            document.getElementById("expirationYearError").innerText = "";
            document.getElementById("expirationYear").style.border = "none";
            cardDetails.expirationYear = value;
            return true;
        }
    }

    function expirationMonthValidation(value) {
        if (value === null || value === undefined || value === "default") {
            document.getElementById("expirationMonth").style.border =
                "3px solid #f00";
            document.getElementById("expirationMonthError").innerText =
                "Nu ați ales luna!";
            return false;
        } else {
            document.getElementById("expirationMonthError").innerText = "";
            document.getElementById("expirationMonth").style.border = "none";
            cardDetails.expirationMonth = value;
            return true;
        }
    }

    function cvvValidation(value) {
        if (value === null || value === undefined || value.length !== 3) {
            document.getElementById("cvv").style.border = "3px solid #f00";
            document.getElementById("cvvError").innerText =
                "CVV nu pare să fie corect!";
            return false;
        } else {
            document.getElementById("cvvError").innerText = "";
            document.getElementById("cvv").style.border = "none";
            cardDetails.cvv = value;
            return true;
        }
    }

    return (
        <Form.Group
            className={style.formGroup}
            style={{ gridTemplateColumns: "auto" }}
        >
            <div>
                <Form.Label>
                    Nume
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <p className={style.errors} id="nameError"></p>
                <Form.Control
                    type="text"
                    id="name"
                    placeholder="Introduceți numele"
                    style={{ maxWidth: "400px" }}
                    onChange={(e) => {
                        nameValidation(e.target.value);
                    }}
                ></Form.Control>
            </div>

            <div>
                <Form.Label>
                    Număr card (fără spațiu)
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <p className={style.errors} id="cardNumberError"></p>
                <Form.Control
                    type="text"
                    id="cardNumber"
                    placeholder="Introduceți numărul cardului"
                    style={{ maxWidth: "400px" }}
                    onChange={(e) => {
                        cardNumberValidation(e.target.value);
                    }}
                ></Form.Control>
            </div>

            <div>
                <Form.Label>
                    Anul expirării cardului
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <p className={style.errors} id="expirationYearError"></p>
                <Form.Select
                    id="expirationYear"
                    style={{ maxWidth: "400px" }}
                    onChange={(e) => {
                        expirationYearValidation(e.target.value);
                    }}
                >
                    <option value="default">Alegeți anul aici</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                </Form.Select>
            </div>

            <div>
                <Form.Label>
                    Luna expirării cardului
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <p className={style.errors} id="expirationMonthError"></p>
                <Form.Select
                    id="expirationMonth"
                    style={{ maxWidth: "400px" }}
                    onChange={(e) => {
                        expirationMonthValidation(e.target.value);
                    }}
                >
                    <option value="default">Alegeți luna aici</option>
                    <option value="1">Ianuarie (01)</option>
                    <option value="2">Februarie (02)</option>
                    <option value="3">Martie (03)</option>
                    <option value="4">Aprilie (04)</option>
                    <option value="5">Mai (05)</option>
                    <option value="6">Iunie (06)</option>
                    <option value="7">Iulie (07)</option>
                    <option value="8">August (08)</option>
                    <option value="9">Septembrie (09)</option>
                    <option value="10">Octombrie (10)</option>
                    <option value="11">Noiembrie (11)</option>
                    <option value="12">Decembrie (12)</option>
                </Form.Select>
            </div>

            <div>
                <Form.Label>
                    Cod de validare (CVV, numărul de pe spatele cardului)
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <p className={style.errors} id="cvvError"></p>
                <Form.Control
                    type="text"
                    id="cvv"
                    placeholder="Introduceți codul de validare"
                    style={{ maxWidth: "400px" }}
                    onChange={(e) => {
                        cvvValidation(e.target.value);
                    }}
                ></Form.Control>
            </div>
        </Form.Group>
    );
}

export default CardPayment;
