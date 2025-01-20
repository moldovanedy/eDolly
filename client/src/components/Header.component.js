import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//prettier-ignore
import { faSearch, faShoppingCart, faHeart, faTimes, faUserCircle, faDog} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import style from "./../main.module.css";
import logo from "../logo.svg";
import Navigation from "./Navigation.component.js";
import axios from "axios";

function Header() {
    const [searchBoxActive, setSearchBoxActive] = useState(false);
    const [userAccountData, setUserAccountData] = useState(null);

    var count = useSelector((state) => state.products.value);
    var cartSize = useSelector((state) => state.cartProducts.value);

    function search(name) {
        document.location.replace(
            `http://localhost:3000/cautare=${name}/pag=1`
        );
    }

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/users/getUserAccount"
        }).then((res) => {
            setUserAccountData(res.data);
        });
    }, []);

    function SearchBox() {
        return (
            <form
                id={style.searchBoxWrapper}
                onSubmit={(e) => {
                    e.preventDefault();
                    search(document.getElementById("searchBox").value);
                }}
            >
                <input
                    type={"text"}
                    autoFocus
                    className={style.search}
                    name="searchBox"
                    id="searchBox"
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
            </form>
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
                            marginLeft: "10px",
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
                                    marginLeft: "10px",
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
                        <div style={{ position: "relative" }}>
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                size="1x"
                                title="Coșul de cumpărături"
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "#0099ff"
                                }}
                            />
                            {cartSize === 0 ? null : (
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
                                    {cartSize}
                                </Badge>
                            )}
                        </div>
                    </Link>

                    {userAccountData !== null &&
                    userAccountData !== undefined &&
                    userAccountData !== "" ? (
                        <Link to="/cos-de-cumparaturi">
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                size="1x"
                                title="Contul tău"
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "#0099ff"
                                }}
                            />
                        </Link>
                    ) : (
                        <Link to="/logare">
                            <FontAwesomeIcon
                                icon={faUserCircle}
                                size="1x"
                                title="Creați un cont"
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "#0099ff"
                                }}
                            />
                        </Link>
                    )}
                </div>
            </header>
            {searchBoxActive === true ? <SearchBox /> : null}
            <div style={{ height: 70 }}></div>
        </>
    );
}

export default Header;
