import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//prettier-ignore
import { faSearch, faShoppingCart, faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import style from "./../main.module.css";
import logo from "../logo.svg";
import Navigation from "./Navigation";

function Header() {
    const [searchBoxActive, setSearchBoxActive] = useState(false);

    var count = useSelector((state) => state.products.value);

    function SearchBox() {
        return (
            <div id={style.searchBoxWrapper}>
                <input
                    type={"text"}
                    className={style.search}
                    name="searchBox"
                    placeholder="Căutați aici produse..."
                />
                <FontAwesomeIcon
                    icon={faTimes}
                    size="1x"
                    style={{
                        position: "absolute",
                        marginLeft: "92%",
                        marginTop: 18,
                        zIndex: 2,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        setSearchBoxActive(false);
                        document.body.style.overflowY = "scroll";
                    }}
                />
            </div>
        );
    }
    return (
        <>
            <header className={style.header}>
                <div className={style.headerComponent}>
                    <Navigation style={{ height: "60px" }} />
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo-ul eDolly"
                            width={40}
                            title="Pagina principală"
                            style={{ cursor: "pointer" }}
                        />
                    </Link>
                </div>
                <div className={style.headerComponent}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="1x"
                        title="Căutați produse"
                        style={{
                            cursor: "pointer",
                            marginLeft: "10",
                            color: "#0099ff"
                        }}
                        onClick={() => {
                            setSearchBoxActive(true);
                            document.body.style.overflowY = "hidden";
                        }}
                    />

                    <Link to="/favorite">
                        <div style={{ position: "relative" }}>
                            <FontAwesomeIcon
                                icon={faHeart}
                                size="1x"
                                title="Produse favorite"
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10",
                                    color: "#0099ff"
                                }}
                            />
                            {count === 0 ? null : (
                                <Badge
                                    pill
                                    bg="danger"
                                    style={{
                                        position: "absolute",
                                        right: "-12%",
                                        top: "-20%",
                                        fontSize: "12px"
                                    }}
                                >
                                    {count}
                                </Badge>
                            )}
                        </div>
                    </Link>
                    <Link to="/cos-de-cumparaturi">
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            size="1x"
                            title="Coșul de cumpărături"
                            style={{
                                cursor: "pointer",
                                marginLeft: "10",
                                color: "#0099ff"
                            }}
                        />
                    </Link>
                </div>
            </header>
            {searchBoxActive === true ? <SearchBox /> : null}
            <div style={{ height: 70 }}></div>
        </>
    );
}

export default Header;
