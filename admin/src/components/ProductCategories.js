export const ProductCategories = [
    {
        name: "Telefoane și tablete",
        subCategories: [
            "Telefoane",
            "Accesorii telefoane",
            "Tablete",
            "Telefoane resigilate",
        ],
    },
    {
        name: "Laptop-uri",
        subCategories: [
            "Laptop-uri",
            "Accesorii laptop-uri",
            "Laptop-uri resigilate",
        ],
    },
    {
        name: "PC",
        subCategories: [
            "Desktop-uri",
            "Periferice",
            "Componente",
            "Software",
            "Imprimante și scanere",
            "Desktop-uri Resigilate",
        ],
    },
    {
        name: "TV",
        subCategories: [
            "Televizoare",
            "Accesorii televizoare",
            "Televizoare resigilate",
        ],
    },
    {
        name: "Aparate foto",
        subCategories: [
            "Aparate foto",
            "Accesorii foto",
            "Camere video",
            "Aparate foto Resigilate",
        ],
    },
    {
        name: "Electrocasnice",
        subCategories: [
            "Aparate frigorifice",
            "Mașini de spălat",
            "Aragazuri",
            "Cuptoare",
            "Cuptoare cu microunde",
            "Electrocasnice Resigilate",
        ],
    },
];

export var productArray = [];
ProductCategories.forEach((item) => {
    item.subCategories.forEach((product) => {
        product = product.replace(/ /g, "-");
        productArray.push(product);
    });
});
