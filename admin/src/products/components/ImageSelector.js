import React from "react";

import styles from "./../addProduct.module.css";

function ImageSelector() {
    function validateImg(e) {
        e.target.style.backgroundColor = "#40da40";
        for (let i = 0; i < e.target.files.length; i++) {
            let size = e.target.files[i].size;
            let extension = e.target.files[i].name.split(".").pop();
            if (
                extension !== "jpg" &&
                extension !== "png" &&
                extension !== "jpeg" &&
                extension !== "gif" &&
                extension !== "bmp" &&
                extension !== "tif" &&
                extension !== "tiff"
            ) {
                e.target.style.backgroundColor = "red";
                console.log(extension);
                window.alert(
                    "Una sau mai multe poze are un format neacceptat!"
                );
                e.target.value = null;
            }
            if (size > 1000000) {
                e.target.style.backgroundColor = "red";
                window.alert(
                    "Una sau mai multe poze are dimensiune prea mare(> 1MB)!"
                );
                e.target.value = null;
            }
        }
    }
    return (
        <div>
            <p>
                <b>Imagini</b> (la imagini se acceptă următoarele extensii:
                .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff)
            </p>
            <input
                type={"file"}
                className={styles.assetBtn}
                name="photos"
                accept="image/*"
                multiple
                onChange={validateImg}
            />
            <br />
        </div>
    );
}

export default ImageSelector;
