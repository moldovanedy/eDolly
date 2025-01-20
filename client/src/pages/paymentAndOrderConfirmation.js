/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Table, Toast, ToastContainer } from "react-bootstrap";

import style from "./paymentAndOrderConfirmation.module.css";
import Header from "../components/Header.component.js";
import CardPayment, {
    getCardDetails
} from "../components/Cart/CardPayment.component.js";
import { getCartProducts } from "./../components/Cart/cartProductManager.redux.js";

function PaymentAndOrderConfirmation() {
    const [userAccountData, setUserAccountData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [courierData, setCourierData] = useState({});
    const [easyboxData, setEasyboxData] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [courierCompany, setCourierCompany] = useState("FanCourier");
    const [serverResponse, setServerResponse] = useState("");
    const [show, setShow] = useState(false);

    function courierCompanyValidation(e) {
        setCourierCompany(e);
    }

    function order() {
        axios
            .post("http://localhost:5000/orders/add", {
                products: getCartProducts(),
                deliveryMethod: localStorage.getItem("deliveryMethod"),
                courier: courierCompany,
                payment: getCardDetails().name === "" ? "cash" : "card",
                address:
                    courierData === {}
                        ? JSON.stringify(easyboxData)
                        : JSON.stringify(courierData),
                user: JSON.stringify(userAccountData[0]),
                additionalInfo: additionalInfo
            })
            .then((response) => {
                setServerResponse(response.data);
                setShow(true);
            });
    }

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/users/getUserAccount"
        }).then((res) => {
            setUserAccountData(res.data);
            setCourierData(JSON.parse(localStorage.getItem("courierData")));
            setEasyboxData(JSON.parse(localStorage.getItem("easyboxData")));
            if (
                res.data === null ||
                res.data === undefined ||
                res.data === ""
            ) {
                document.location.pathname = "/logare";
            }
        });
    }, []);

    return (
        <>
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
                                Răspuns
                            </Toast.Header>
                            <Toast.Body>{serverResponse}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            ) : null}

            <Form className={style.form} id="form">
                <Form.Group
                    className={style.formGroup}
                    style={{ display: "block" }}
                >
                    <Form.Label>Metodă de plată</Form.Label>
                    <Form.Check
                        type={"radio"}
                        label={`Ramburs la curier`}
                        value="cash"
                        checked={paymentMethod === "cash" ? true : false}
                        onChange={() => {
                            setPaymentMethod("cash");
                        }}
                    />
                    <Form.Check
                        type={"radio"}
                        label={`Card de credit sau de debit`}
                        value="easybox"
                        checked={paymentMethod === "card" ? true : false}
                        onChange={() => {
                            setPaymentMethod("card");
                        }}
                    />
                </Form.Group>

                {paymentMethod === "cash" ? (
                    <>
                        <Form.Group
                            className={style.formGroup}
                            style={{ display: "block" }}
                        >
                            <Form.Label>Companie de curierat</Form.Label>
                            <Form.Select
                                id="courierCompany"
                                style={{ maxWidth: "400px" }}
                                onChange={(e) => {
                                    courierCompanyValidation(e.target.value);
                                }}
                            >
                                <option value="FanCourier">FanCourier</option>
                                <option value="Cargus">Cargus</option>
                                <option value="GLS">GLS</option>
                            </Form.Select>
                            <p>Cost transport: 20 lei</p>
                        </Form.Group>
                    </>
                ) : (
                    <CardPayment />
                )}

                <Form.Group
                    className={style.formGroup}
                    style={{ display: "block" }}
                >
                    <Form.Label>Informații suplimentare</Form.Label>{" "}
                    <span
                        style={
                            additionalInfo.length > 5000
                                ? { color: "#f00" }
                                : { color: "#000" }
                        }
                    >
                        {additionalInfo.length} / 5000{" "}
                    </span>
                    <textarea
                        onChange={(e) => {
                            setAdditionalInfo(e.target.value);
                        }}
                        className={style.review}
                        style={{ display: "block" }}
                        placeholder="Scrieți informații suplimentare aici..."
                        maxLength={5000}
                    ></textarea>
                </Form.Group>
            </Form>

            <div>
                <h2>Datele introduse</h2>
                <p>
                    Acestea sunt datele care vor fi trimise cu comanda. Dacă
                    ceva nu e în regulă, reveniți și rescrieți datele.
                </p>

                <Table striped bordered>
                    <tbody>
                        <tr>
                            <td>Metodă livrare</td>
                            <td>
                                {localStorage.getItem("deliveryMethod") ===
                                "courier"
                                    ? "Curier"
                                    : "Easybox"}
                            </td>
                        </tr>
                        {localStorage.getItem("deliveryMethod") ===
                        "courier" ? (
                            <>
                                <tr>
                                    <td>Județ</td>
                                    <td>{courierData.county}</td>
                                </tr>
                                <tr>
                                    <td>Localitate</td>
                                    <td>{courierData.city}</td>
                                </tr>
                                <tr>
                                    <td>Stradă</td>
                                    <td>{courierData.street}</td>
                                </tr>
                                <tr>
                                    <td>Număr</td>
                                    <td>{courierData.number}</td>
                                </tr>
                                <tr>
                                    <td>Scară</td>
                                    <td>
                                        {courierData.staircase === ""
                                            ? "-"
                                            : courierData.staircase}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Apartament</td>
                                    <td>
                                        {courierData.apartment === 0
                                            ? "-"
                                            : courierData.apartment}
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                <tr>
                                    <td>Oraș</td>
                                    <td>{easyboxData.city}</td>
                                </tr>
                                <tr>
                                    <td>Locație</td>
                                    <td>{easyboxData.location}</td>
                                </tr>
                            </>
                        )}

                        <tr>
                            <td>Metodă de plată</td>
                            <td>
                                {paymentMethod === "cash"
                                    ? "Ramburs la curier"
                                    : "Card de debit sau de credit"}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div className={style.continueButton}>
                <button
                    onClick={() => {
                        order();
                    }}
                >
                    Comandă
                </button>
            </div>
        </>
    );
}

export default PaymentAndOrderConfirmation;
