import React from "react";

import styles from "./../addProduct.module.css";

function VideoSelector() {
    function validateVideo(e) {
        let size = e.target.files[0].size;
        e.target.style.backgroundColor = "#40da40";
        let extension = e.target.files[0].name.split(".").pop();
        if (
            extension !== "mp4" &&
            extension !== "avi" &&
            extension !== "mkv" &&
            extension !== "webm" &&
            extension !== "mov"
        ) {
            e.target.style.backgroundColor = "red";
            window.alert("Videoclipul are un format neacceptat!");
            e.target.value = null;
        }
        if (size > 30000000) {
            e.target.style.backgroundColor = "red";
            window.alert("Videoclipul are dimensiune prea mare(> 30MB)!");
            e.target.value = null;
        }
    }
    return (
        <div>
            <p>
                <b>Video</b> (la videoclipuri se acceptă următoarele extensii:
                .mp4, .avi, .webm, .mov, .mkv)
            </p>
            <input
                type={"file"}
                className={styles.assetBtn}
                name="video"
                accept="video/*, .mkv"
                onChange={validateVideo}
            />
            <br />
        </div>
    );
}

export default VideoSelector;
