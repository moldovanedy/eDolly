/* eslint-disable no-loop-func */
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import style from "./orderDetailsForm.module.css";
import { counties, easyboxes } from "./locations";

function CourierDelivery() {
    return (
        <Form.Group className={style.formGroup}>
            <div>
                <Form.Label>
                    Județ / Sector
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <Form.Select style={{ maxWidth: "400px" }}>
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
                <Form.Control
                    type="text"
                    id="city"
                    placeholder="Introduceți localitatea"
                    style={{ maxWidth: "400px" }}
                ></Form.Control>
            </div>
            <div>
                <Form.Label>
                    Strada<span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    id="street"
                    placeholder="Introduceți strada"
                    style={{ maxWidth: "400px" }}
                ></Form.Control>
            </div>
            <div>
                <Form.Label>
                    Numărul<span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <Form.Control
                    type="number"
                    id="number"
                    min={1}
                    max={999}
                    style={{ maxWidth: "100px" }}
                ></Form.Control>
            </div>
            <div>
                <Form.Label>Bloc</Form.Label>
                <Form.Control
                    type="text"
                    id="flatAppartament"
                    style={{ maxWidth: "100px" }}
                ></Form.Control>
            </div>
            <div>
                <Form.Label>Scară</Form.Label>
                <Form.Control
                    type="text"
                    id="staircase"
                    style={{ maxWidth: "100px" }}
                ></Form.Control>
            </div>
            <div>
                <Form.Label>Apartament</Form.Label>
                <Form.Control
                    type="number"
                    id="appartament"
                    min={1}
                    max={200}
                    style={{ maxWidth: "100px" }}
                ></Form.Control>
            </div>
        </Form.Group>
    );
}

function EasyboxDelivery() {
    var cities = Object.keys(easyboxes);
    var [city, setCity] = useState("default");

    return (
        <Form.Group className={style.formGroup}>
            <div>
                <Form.Label>
                    Localitate
                    <span style={{ color: "#f00" }}>*</span>
                </Form.Label>
                <Form.Select
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        console.log(city);
                    }}
                    style={{ maxWidth: "400px" }}
                >
                    <option value="default">Alegeți localitatea aici</option>
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
                <Form.Select style={{ maxWidth: "400px" }}>
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
        </Form.Group>
    );
}

export { CourierDelivery, EasyboxDelivery };
