import React, { useState, useEffect } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";

import style from "./orderDetailsForm.module.css";
import {
    CourierDelivery,
    EasyboxDelivery,
    cityValidation,
    countyValidation,
    numberValidation,
    staircaseValidation,
    streetValidation,
    easyboxCityValidation,
    easyboxLocationValidation
} from "./OrderDetailsFormDeliveryMethod.component";

function Error(props) {
    var [show, setShow] = useState(false);

    if (show) {
        console.log(props.content);
    }

    return show ? (
        <div className={style.toast}>
            <ToastContainer position="bottom-center">
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay="5000"
                    autohide
                    style={{ boxShadow: "3px 1px 6px 3px" }}
                >
                    <Toast.Header closeButton={false}>Eroare</Toast.Header>
                    <Toast.Body>{props.content}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    ) : null;
}

function OrderDetailsForm() {
    let [deliveryMethod, setDeliveryMethod] = useState("courier");

    const [userAccountData, setUserAccountData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/users/getUserAccount"
        }).then((res) => {
            setUserAccountData(res.data);
            localStorage.removeItem("easyboxData");
            localStorage.removeItem("courierData");
            localStorage.setItem("deliveryMethod", "courier");
        });
    }, []);

    function continueOrder() {
        setErrors(null);
        if (
            localStorage.getItem("deliveryMethod") !== null &&
            localStorage.getItem("deliveryMethod") !== undefined
        ) {
            if (localStorage.getItem("deliveryMethod") === "courier") {
                localStorage.removeItem("easyboxData");
            } else if (localStorage.getItem("deliveryMethod") === "easybox") {
                localStorage.removeItem("courierData");
            } else {
                setErrors(
                    "Nu ați ales o metodă de livrare sau a apărut o eroare neașteptată"
                );
                return;
            }

            var courierDataRaw = localStorage.getItem("courierData"),
                easyboxDataRaw = localStorage.getItem("easyboxData");
            if (
                (courierDataRaw === undefined || courierDataRaw === null) &&
                localStorage.getItem("deliveryMethod") === "courier"
            ) {
                setErrors(
                    "Metoda de livrare este curier, dar câmpurile nu sunt completate."
                );
                return;
            }

            if (
                (easyboxDataRaw === undefined || easyboxDataRaw === null) &&
                localStorage.getItem("deliveryMethod") === "easybox"
            ) {
                setErrors(
                    "Metoda de livrare este easybox, dar câmpurile nu sunt completate."
                );
                return;
            }

            var courierDataJSON = JSON.parse(courierDataRaw),
                easyboxDataJSON = JSON.parse(easyboxDataRaw);

            if (localStorage.getItem("deliveryMethod") === "courier") {
                if (
                    !(
                        cityValidation(courierDataJSON.city) &&
                        countyValidation(courierDataJSON.county) &&
                        numberValidation(courierDataJSON.number) &&
                        staircaseValidation(courierDataJSON.staircase) &&
                        streetValidation(courierDataJSON.street)
                    )
                ) {
                    setErrors(
                        "Metoda de livrare este curier, dar unele câmpuri nu sunt completate corespunzător."
                    );
                    return;
                }
            } else {
                if (
                    !(
                        easyboxCityValidation(easyboxDataJSON.city) &&
                        easyboxLocationValidation(easyboxDataJSON.location)
                    )
                ) {
                    setErrors(
                        "Metoda de livrare este easybox, dar unele câmpuri nu sunt completate corespunzător."
                    );
                    return;
                }
            }
            userAccountData !== null &&
            userAccountData !== undefined &&
            userAccountData !== ""
                ? (document.location.pathname = "/plata-si-finalizare")
                : (document.location.pathname = "/logare");
        } else {
            setErrors(
                "Nu ați ales o metodă de livrare sau a apărut o eroare neașteptată"
            );
            return;
        }
    }

    return (
        <>
            {errors !== null && errors !== undefined ? (
                <Error content={errors} />
            ) : null}
            <Form className={style.form} id="form">
                {/* <br /> */}
                <Form.Group
                    className={style.formGroup}
                    style={{ display: "block" }}
                >
                    <Form.Label>Metodă de livrare</Form.Label>
                    <Form.Check
                        type={"radio"}
                        label={`Curier`}
                        value="courier"
                        checked={deliveryMethod === "courier" ? true : false}
                        onChange={() => {
                            setDeliveryMethod("courier");
                            localStorage.setItem("deliveryMethod", "courier");
                        }}
                    />
                    <Form.Check
                        type={"radio"}
                        label={`Easybox`}
                        value="easybox"
                        checked={deliveryMethod === "easybox" ? true : false}
                        onChange={() => {
                            setDeliveryMethod("easybox");
                            localStorage.setItem("deliveryMethod", "easybox");
                        }}
                    />
                </Form.Group>

                {deliveryMethod === "courier" ? (
                    <CourierDelivery />
                ) : (
                    <EasyboxDelivery />
                )}

                {/* <br /> */}
            </Form>

            <div className={style.continueButton}>
                <button
                    onClick={() => {
                        continueOrder();
                    }}
                >
                    Continuă &gt; &gt;
                </button>
            </div>
        </>
    );
}

export default OrderDetailsForm;
