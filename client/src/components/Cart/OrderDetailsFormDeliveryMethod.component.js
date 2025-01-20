/* eslint-disable no-loop-func */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import style from "./orderDetailsForm.module.css";
import { counties, easyboxes } from "./locations.js";
import TheMap from "./googleMaps.component.js";

var orderDetails = {
    county: "",
    city: "",
    street: "",
    number: 0,
    staircase: "",
    apartment: 0
};

function countyValidation(e) {
    if (e === "default") {
        document.getElementById("county").style.border = "3px solid #f00";
        document.getElementById("countyError").innerText =
            "Nu ați ales un județ";
        return false;
    } else {
        document.getElementById("countyError").innerText = "";
        document.getElementById("county").style.border = "none";
        orderDetails.county = e;
        localStorage.setItem("courierData", JSON.stringify(orderDetails));
        return true;
    }
}

function cityValidation(e) {
    if (e.length <= 1) {
        document.getElementById("city").style.border = "3px solid #f00";
        document.getElementById("cityError").innerText =
            "Numele localității e prea scurt!";
        return false;
    } else if (e.length >= 99) {
        document.getElementById("cityError").innerText =
            "Numele localității e prea lung!";
        document.getElementById("city").style.border = "3px solid #f00";
        return false;
    } else {
        orderDetails.city = e.trim();
        document.getElementById("cityError").innerText = "";
        document.getElementById("city").style.border = "none";
        localStorage.setItem("courierData", JSON.stringify(orderDetails));
        return true;
    }
}

function streetValidation(e) {
    if (e.length <= 1) {
        document.getElementById("streetError").innerText =
            "Numele străzii e prea scurt!";
        document.getElementById("street").style.border = "3px solid #f00";
        return false;
    } else if (e.length >= 99) {
        document.getElementById("streetError").innerText =
            "Numele străzii e prea lung!";
        document.getElementById("street").style.border = "3px solid #f00";
        return false;
    } else {
        orderDetails.street = e.trim();
        document.getElementById("streetError").innerText = "";
        document.getElementById("street").style.border = "none";
        localStorage.setItem("courierData", JSON.stringify(orderDetails));
        return true;
    }
}

function numberValidation(e, min, max, isApartment) {
    var number = e;
    if (isNaN(number)) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Vă rugăm introduceți un număr valid!";
            return false;
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Vă rugăm introduceți un număr valid!";
            return false;
        }
    } else if (number < min) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Numărul e prea mic!";
            return false;
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Numărul e prea mic!";
            return false;
        }
    } else if (number > max) {
        if (isApartment) {
            document.getElementById("apartment").style.border =
                "3px solid #f00";
            document.getElementById("apartmentError").innerText =
                "Numărul e prea mare!";
            return false;
        } else {
            document.getElementById("number").style.border = "3px solid #f00";
            document.getElementById("numberError").innerText =
                "Numărul e prea mare!";
            return false;
        }
    } else {
        if (isApartment) {
            orderDetails.apartment = parseInt(e);
            document.getElementById("apartment").style.border = "none";
            document.getElementById("apartmentError").innerText = "";
            localStorage.setItem("courierData", JSON.stringify(orderDetails));
            return true;
        } else {
            orderDetails.number = parseInt(e);
            document.getElementById("numberError").innerText = "";
            document.getElementById("number").style.border = "none";
            localStorage.setItem("courierData", JSON.stringify(orderDetails));
            return true;
        }
    }
}

function staircaseValidation(e) {
    if (e.length > 2) {
        document.getElementById("staircaseError").innerText =
            "Numele scării e prea lung!";
        document.getElementById("staircase").style.border = "3px solid #f00";
        return false;
    } else {
        orderDetails.staircase = e.trim();
        document.getElementById("staircase").style.border = "none";
        localStorage.setItem("courierData", JSON.stringify(orderDetails));
        return true;
    }
}

function CourierDelivery() {
    return (
        <Form.Group
            className={style.formGroup}
            style={{ gridTemplateColumns: "" }}
        >
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
                            countyValidation(e.target.value);
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
                            cityValidation(e.target.value);
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
                            streetValidation(e.target.value);
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
                            numberValidation(e.target.value, 1, 999, false);
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
                            staircaseValidation(e.target.value, 1, 999);
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
                            numberValidation(e.target.value, 1, 200, true);
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

function easyboxCityValidation(e) {
    if (e === "default") {
        console.error("Nu ați ales localitatea");
        return false;
    } else {
        details.city = e;
        localStorage.setItem("easyboxData", JSON.stringify(details));
        return true;
    }
}

function easyboxLocationValidation(e) {
    if (e === "default") {
        console.error("Nu ați ales locația easybox");
        return false;
    } else {
        details.location = e;
        localStorage.setItem("easyboxData", JSON.stringify(details));
        return true;
    }
}

var details = {
    city: "default",
    location: "default"
};

function EasyboxDelivery() {
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
                            easyboxCityValidation(e.target.value);
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
                            easyboxLocationValidation(e.target.value);
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

export {
    CourierDelivery,
    EasyboxDelivery,
    cityValidation,
    countyValidation,
    numberValidation,
    streetValidation,
    staircaseValidation,
    easyboxCityValidation,
    easyboxLocationValidation
};
