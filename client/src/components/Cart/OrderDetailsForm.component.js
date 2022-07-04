import React, { useState } from "react";
import { Form } from "react-bootstrap";

import style from "./orderDetailsForm.module.css";
import {
    CourierDelivery,
    EasyboxDelivery
} from "./OrderDetailsFormDeliveryMethod.component";

function OrderDetailsForm() {
    let [deliveryMethod, setDeliveryMethod] = useState("courier");

    return (
        <>
            <Form className={style.form}>
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
                        }}
                    />
                    <Form.Check
                        type={"radio"}
                        label={`Easybox`}
                        value="easybox"
                        checked={deliveryMethod === "easybox" ? true : false}
                        onChange={() => {
                            setDeliveryMethod("easybox");
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
                <button>Continuă &gt; &gt;</button>
            </div>
        </>
    );
}

export default OrderDetailsForm;
