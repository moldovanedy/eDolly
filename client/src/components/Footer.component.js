import React from "react";
import { Link } from "react-router-dom";

import style from "./../homepage.module.css";

function Footer() {
    return (
        <footer className={style.footer}>
            <Link to="/confidentialitate">Politica de confidențialitate</Link>
        </footer>
    );
}

export default Footer;
