import React from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header.component.js";

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
                    <Link
                        to={"/"}
                        style={{
                            padding: "10px",
                            backgroundColor: "#3684ff",
                            color: "#fff",
                            borderRadius: "3px",
                            textDecoration: "none",
                            fontSize: "20px",
                            cursor: "pointer"
                        }}
                    >
                        Înapoi la pagina principală
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Err404;
