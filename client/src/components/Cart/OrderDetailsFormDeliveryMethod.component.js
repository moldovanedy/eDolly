/* eslint-disable no-loop-func */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import style from "./orderDetailsForm.module.css";
import { counties, easyboxes } from "./locations";
import TheMap from "./googleMaps.component";

var orderDetails = {
    county: "",
    city: "",
    street: "",
    number: 0,
    staircase: "",
    apartment: 0
};

function countyValidation(e) {
    if (e.target.value === "default") {
        document.getElementById("county").style.border = "3px solid #f00";
        document.getElementById("countyError").innerText =
            "Nu ați ales un județ";
    } else {
        document.getElementById("countyError").innerText = "";
        document.getElementById("county").style.border = "none";
        orderDetails.county = e.target.value;
    }
}

function cityValidation(e) {
    if (e.target.value.length <= 1) {
        document.getElementById("city").style.border = "3px solid #f00";
        document.getElementById("cityError").innerText =
            "Numele localității e prea scurt!";
    } else if (e.target.value.length >= 99) {
        document.getElementById("cityError").innerText =
            "Numele localității e prea lung!";
        document.getElementById("city").style.border = "3px solid #f00";
    } else {
        orderDetails.city = e.target.value.trim();
        document.getElementById("cityError").innerText = "";
        document.getElementById("city").style.border = "none";
    }
}

function streetValidation(e) {
    if (e.target.value.length <= 1) {
        document.getElementById("streetError").innerText =
            "Numele străzii e prea scurt!";
        document.getElementById("street").style.border = "3px solid #f00";
    } else if (e.target.value.length >= 99) {
        document.getElementById("streetError").innerText =
            "Numele străzii e prea lung!";
        document.getElementById("street").style.border = "3px solid #f00";
    } else {
        orderDetails.street = e.target.value.trim();
        document.getElementById("streetError").innerText = "";
        document.getElementById("street").style.border = "none";
    }
}

function numberValidation(e, min, max, isApartment) {
    var number = e.target.value;
    if (isNaN(number)) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Vă rugăm introduceți un număr valid!";
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Vă rugăm introduceți un număr valid!";
        }
    } else if (number < min) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Numărul e prea mic!";
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Numărul e prea mic!";
        }
    } else if (number > max) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Numărul e prea mare!";
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Numărul e prea mare!";
        }
    } else {
        if (isApartment) {
            orderDetails.apartment = parseInt(e.target.value.trim());
            document.getElementById("apartment").style.border = "none";
            document.getElementById("apartmentError").innerText = "";
        } else {
            orderDetails.number = parseInt(e.target.value.trim());
            document.getElementById("numberError").innerText = "";
            document.getElementById("number").style.border = "none";
        }
    }
}

function staircaseValidation(e) {
    if (e.target.value.length > 2) {
        document.getElementById("staircaseError").innerText =
            "Numele scării e prea lung!";
        document.getElementById("staircase").style.border = "3px solid #f00";
    } else {
        orderDetails.staircase = e.target.value.trim();
        document.getElementById("staircase").style.border = "none";
    }
}

function CourierDelivery() {
    return (
        <Form.Group className={style.formGroup}>
            <div>
                <div>
                    <Form.Label>
                        Județ / Sector
                        <span style={{ color: "#f00" }}>*</span>
                    </Form.Label>
                    <p className={style.errors} id="countyError"></p>
                    <Form.Select
                        id="county"
                        style={{ maxWidth: "400px" }}
                        onChange={(e) => {
                            countyValidation(e);
                        }}
                    >
                        <option value="default">Alegeți județul aici</option>
                        {counties.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </Form.Select>
                </div>
                <div>
                    <Form.Label>
                        Localitate
                        <span style={{ color: "#f00" }}>*</span>
                    </Form.Label>
                    <p className={style.errors} id="cityError"></p>
                    <Form.Control
                        type="text"
                        id="city"
                        placeholder="Introduceți localitatea"
                        style={{ maxWidth: "400px" }}
                        onChange={(e) => {
                            cityValidation(e);
                        }}
                    ></Form.Control>
                </div>
                <div>
                    <Form.Label>
                        Strada<span style={{ color: "#f00" }}>*</span>
                    </Form.Label>
                    <p className={style.errors} id="streetError"></p>
                    <Form.Control
                        type="text"
                        id="street"
                        placeholder="Introduceți strada"
                        style={{ maxWidth: "400px" }}
                        onChange={(e) => {
                            streetValidation(e);
                        }}
                    ></Form.Control>
                </div>
                <div>
                    <Form.Label>
                        Numărul<span style={{ color: "#f00" }}>*</span>
                        <span style={{ fontSize: "16px" }}>
                            {" "}
                            (dacă locuiți la bloc, scrieți numărul blocului
                            aici)
                        </span>
                    </Form.Label>
                    <p className={style.errors} id="numberError"></p>
                    <Form.Control
                        type="number"
                        id="number"
                        min={1}
                        max={999}
                        style={{ maxWidth: "100px" }}
                        onChange={(e) => {
                            numberValidation(e, 1, 999, false);
                        }}
                    ></Form.Control>
                </div>
                <div>
                    <Form.Label>
                        Scară
                        <span style={{ fontSize: "16px" }}>
                            {" "}
                            (completați doar dacă locuiți la bloc)
                        </span>
                    </Form.Label>
                    <p className={style.errors} id="staircaseError"></p>
                    <Form.Control
                        type="text"
                        id="staircase"
                        style={{ maxWidth: "100px" }}
                        onChange={(e) => {
                            staircaseValidation(e, 1, 999);
                        }}
                    ></Form.Control>
                </div>
                <div>
                    <Form.Label>
                        Apartament
                        <span style={{ fontSize: "16px" }}>
                            {" "}
                            (completați doar dacă locuiți la bloc)
                        </span>
                    </Form.Label>
                    <p className={style.errors} id="apartmentError"></p>
                    <Form.Control
                        type="number"
                        id="apartment"
                        min={1}
                        max={200}
                        style={{ maxWidth: "100px" }}
                        onChange={(e) => {
                            numberValidation(e, 1, 200, true);
                        }}
                    ></Form.Control>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(orderDetails);
                    }}
                >
                    Vezi
                </button>
            </div>

            <div style={{ margin: "10px" }}>
                <TheMap />
            </div>
        </Form.Group>
    );
}

function EasyboxDelivery() {
    function easyboxCityValidation(e) {
        if (e.target.value === "default") {
            console.error("Nu ați ales localitatea");
        } else {
            // orderDetails.county = e.target.value;
        }
    }

    function easyboxLocationValidation(e) {
        if (e.target.value === "default") {
            console.error("Nu ați ales locația easybox");
        } else {
            // orderDetails.county = e.target.value;
        }
    }

    var cities = Object.keys(easyboxes);
    var [city, setCity] = useState("default");

    return (
        <Form.Group className={style.formGroup}>
            <div>
                <div>
                    <Form.Label>
                        Localitate
                        <span style={{ color: "#f00" }}>*</span>
                    </Form.Label>
                    <Form.Select
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            easyboxCityValidation(e);
                        }}
                        style={{ maxWidth: "400px" }}
                    >
                        <option value="default">
                            Alegeți localitatea aici
                        </option>
                        {cities.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </Form.Select>

                    <Form.Label>
                        Locație easybox
                        <span style={{ color: "#f00" }}>*</span>
                    </Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            easyboxLocationValidation(e);
                        }}
                        style={{ maxWidth: "400px" }}
                    >
                        <option value="default">
                            Alegeți locația easybox aici
                        </option>
                        {city !== "default"
                            ? easyboxes[city].map((item, index) => {
                                  return (
                                      <option key={index} value={item}>
                                          {item}
                                      </option>
                                  );
                              })
                            : null}
                    </Form.Select>
                </div>
            </div>

            <div style={{ margin: "10px" }}>
                <TheMap />
            </div>
        </Form.Group>
    );
}

export { CourierDelivery, EasyboxDelivery };
