import React from "react";

import styles from "./../addProduct.module.css";

function Obj3DSelector() {
    function validateObj(e) {
        let size = e.target.files[0].size;
        e.target.style.backgroundColor = "#40da40";
        let extension = e.target.files[0].name.split(".").pop();
        if (
            extension !== "obj" &&
            extension !== "glb" &&
            extension !== "fbx" &&
            extension !== "dae"
        ) {
            e.target.style.backgroundColor = "red";
            window.alert("Obiectul 3D are un format neacceptat!");
            e.target.value = null;
        }
        if (size > 5000000) {
            e.target.style.backgroundColor = "red";
            window.alert("Obiectul 3D are dimensiune prea mare(> 5MB)!");
            e.target.value = null;
        }
    }
    return (
        <div>
            <p>
                <b>Obiecte 3D</b> (la obiecte 3D se acceptă următoarele
                extensii: .obj, .glb, .fbx, .dae)
            </p>
            <input
                type={"file"}
                className={styles.assetBtn}
                name="obj"
                accept=".obj,.fbx,.dae,.glb"
                onChange={validateObj}
            />
            <br />
        </div>
    );
}

export default Obj3DSelector;
