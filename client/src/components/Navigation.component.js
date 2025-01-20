import React from "react";
import { ProductCategories } from "./ProductCategories.component.js";
import { Link } from "react-router-dom";
import {
    Container,
    Navbar,
    Offcanvas,
    Nav,
    NavDropdown
} from "react-bootstrap";

function Navigation() {
    return (
        <Navbar
            bg="light"
            expand={false}
            style={{
                height: "50px",
                width: "70px",
                position: "relative",
                backgroundColor: "#f3f3f3"
            }}
        >
            <Container fluid style={{ position: "absolute" }}>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            Produse
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {ProductCategories.map((item, index) => {
                                return (
                                    <NavDropdown
                                        style={{
                                            padding: "5px 10px 5px 10px",
                                            border: "1px solid #333",
                                            backgroundColor: "#eee",
                                            fontSize: "18px"
                                        }}
                                        key={index}
                                        title={item.name}
                                        id="offcanvasNavbarDropdown"
                                    >
                                        {item.subCategories.map(
                                            (subItem, index) => {
                                                return (
                                                    <NavDropdown.Item
                                                        as="button"
                                                        style={{
                                                            padding: "3px"
                                                        }}
                                                        key={index}
                                                    >
                                                        <Link
                                                            to={`/produse=${subItem}/pag=1`}
                                                            onClick={() => {
                                                                //ugly, but works :)
                                                                window.location.pathname.contains(
                                                                    "/produse="
                                                                )
                                                                    ? window.location.reload()
                                                                    : doNothing();
                                                            }}
                                                        >
                                                            {subItem}
                                                        </Link>
                                                    </NavDropdown.Item>
                                                );
                                            }
                                        )}
                                    </NavDropdown>
                                );
                            })}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

function doNothing() {}

export default Navigation;
