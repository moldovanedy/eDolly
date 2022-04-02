import React from "react";
import { Link } from "react-router-dom";

import style from "./../main.module.css";
import logo from "../logo.svg";

function Header() {
    return (
        <>
            <header className={style.header}>
                <div className={style.headerComponent}>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo-ul eDolly"
                            width={40}
                            style={{ cursor: "pointer" }}
                        />
                    </Link>
                </div>
            </header>
        </>
    );
}
export default Header;
