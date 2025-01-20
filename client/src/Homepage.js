import "./App.css";
import Header from "./components/Header.component.js";
import ProductScroller from "./components/ProductScroller.component.js";
import Footer from "./components/Footer.component.js";
import { Helmet } from "react-helmet";

function Homepage() {
    return (
        <>
            <Helmet>
                <title>eDolly</title>
            </Helmet>
            <Header />
            <main style={{ maxWidth: "1200px", margin: "auto" }}>
                <ProductScroller title="Telefoane" />
                <ProductScroller title="Laptop-uri" />
                <ProductScroller title="Desktop-uri" />
                <ProductScroller title="Tablete" />
                <ProductScroller title="Accesorii telefoane" />
                <ProductScroller title="Aparate foto" />
                <ProductScroller title="Televizoare" />
                <ProductScroller title="Cuptoare" />
                <ProductScroller title="Desktop-uri resigilate" />
                <ProductScroller title="Electrocasnice resigilate" />
            </main>

            <Footer />
        </>
    );
}

export default Homepage;
