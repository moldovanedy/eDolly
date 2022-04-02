import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import AddProduct from "./products/addProduct";
import ModifyProduct from "./products/modifyProduct";
import Homepage from "./Homepage";
import Err404 from "./404";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Homepage />}></Route>
                    <Route
                        path="/adaugare-produs"
                        exact
                        element={<AddProduct />}
                    ></Route>
                    <Route
                        path="/modificare-produs"
                        exact
                        element={<ModifyProduct />}
                    ></Route>
                    <Route element={<Err404 />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
