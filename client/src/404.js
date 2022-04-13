import React from "react";

import Header from "./components/Header.component";

function Err404() {
    return (
        <>
            <Header />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <h4
                        style={{
                            backgroundColor: "#ff0823",
                            color: "#aaa",
                            maxWidth: "20%",
                            margin: "auto"
                        }}
                    >
                        Eroare 404
                    </h4>
                    <br />
                    <h2>Această pagină a fost mutată sau nu mai există.</h2>
                </div>
            </div>
        </>
    );
}

export default Err404;
