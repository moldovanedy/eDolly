import { Link } from "react-router-dom";

import "./App.css";
import Header from "./components/Header.component";

function Homepage() {
    return (
        <>
            <Header />
            <div>
                {/* <temporary> */}
                <Link to="/adaugare-produs">
                    <button style={{ marginTop: 70 }}>Adaugare</button>
                </Link>
                <Link to="/modificare-produs">
                    <button style={{ marginTop: 70 }}>Modificare</button>
                </Link>
                {/* </temporary> */}
            </div>
        </>
    );
}

export default Homepage;
