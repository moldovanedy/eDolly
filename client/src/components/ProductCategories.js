import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//prettier-ignore
import { faLaptop, faMouse, faTv, faCamera } from "@fortawesome/free-solid-svg-icons";

import Smartphone from "./../assets/icons/Smartphone.svg";
import Electrocasnice from "./../assets/icons/Electrocasnice.svg";

export const ProductCategories = [
    {
        name: "Telefoane și tablete",
        icon: <img src={Smartphone} width={12} alt="Smartphone" />,
        subCategories: [
            "Telefoane",
            "Accesorii telefoane",
            "Tablete",
            "Telefoane resigilate"
        ]
    },
    {
        name: "Laptop-uri",
        icon: <FontAwesomeIcon icon={faLaptop} size="1x" />,
        subCategories: [
            "Laptop-uri",
            "Accesorii laptop-uri",
            "Laptop-uri resigilate"
        ]
    },
    {
        name: "PC",
        icon: <FontAwesomeIcon icon={faMouse} size="1x" />,
        subCategories: [
            "Desktop-uri",
            "Periferice",
            "Componente",
            "Software",
            "Imprimante și scanere",
            "Desktop-uri Resigilate"
        ]
    },
    {
        name: "TV",
        icon: <FontAwesomeIcon icon={faTv} size="1x" />,
        subCategories: [
            "Televizoare",
            "Accesorii televizoare",
            "Televizoare resigilate"
        ]
    },
    {
        name: "Aparate foto",
        icon: <FontAwesomeIcon icon={faCamera} size="1x" />,
        subCategories: [
            "Aparate foto",
            "Accesorii foto",
            "Camere video",
            "Aparate foto Resigilate"
        ]
    },
    {
        name: "Electrocasnice",
        icon: <img src={Electrocasnice} width={12} alt="Electrocasnice" />,
        subCategories: [
            "Aparate frigorifice",
            "Mașini de spălat",
            "Aragazuri",
            "Cuptoare",
            "Cuptoare cu microunde",
            "Electrocasnice Resigilate"
        ]
    }
];

export var productArray = [];
ProductCategories.forEach((item) => {
    item.subCategories.forEach((product) => {
        product = product.replace(/ /g, "-");
        productArray.push(product);
    });
});
