import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

import { store } from "./reduxState";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

// ReactDOM.render(
//     <Provider store={store}>
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     </Provider>,
//     document.getElementById("root")
// );
