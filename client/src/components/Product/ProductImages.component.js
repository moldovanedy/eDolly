/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleRight,
    faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";

import style from "./productImages.module.css";

function ProductImages(props) {
    const [mediaNames, setMediaNames] = useState();
    var [xPositionProducts, setXPositionProducts] = useState(0);
    var [xPositionSlider, setXPositionSlider] = useState(0);

    useEffect(() => {
        axios
            .get(
                "http://localhost:5000/products/getPhotoNames/name=" +
                    props.productName
            )
            .then((response) => {
                setMediaNames(response.data);
            });
    }, []);

    return (
        <div className={style.mainMediaContainer}>
            <div className={style.imageContainer}>
                <button
                    className={style.imageSliderButton}
                    onClick={() => {
                        if (xPositionProducts < 0) {
                            setXPositionProducts(xPositionProducts + 320);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />{" "}
                </button>
                <div className={style.imgCarousel}>
                    <div
                        className={style.carouselSlider}
                        style={{
                            transform:
                                "translate(" + xPositionProducts + "px, 0px)"
                        }}
                    >
                        {mediaNames !== null && mediaNames !== undefined
                            ? mediaNames.map(
                                  (
                                      media,
                                      index
                                  ) => /* prettier-ignore */ {
                                    var dotPosition = media.search(/[.]/g);
                                    var ext = media.substring(dotPosition + 1);
                                    switch (ext) {
                                        case "jpg":
                                        case "jpeg":
                                        case "png":
                                        case "gif":
                                        case "bmp":
                                        case "tif":
                                        case "tiff":
                                            return media ===
                                                "thumbnail.png" ? null : (
                                                <img
                                                    width={300}
                                                    height={500}
                                                    key={index}
                                                    src={`http://localhost:5000/assets/${props.productName}/${media}`}
                                                    alt={`Imaginea ${index}`}
                                                />
                                            );
                                        case "mp4":
                                        case "avi":
                                        case "webm":
                                        case "mkv":
                                        case "mov":
                                            return media ===
                                                "thumbnail.png" ? null : (
                                                <video
                                                    width={300}
                                                    key={index}
                                                    controls
                                                >
                                                    <source
                                                        src={`http://localhost:5000/assets/${props.productName}/${media}`}
                                                    />
                                                    Ne pare rău, se pare că
                                                    browser-ul dvs. nu suportă
                                                    videoclipuri.
                                                    <br /> `Video ${index}`
                                                </video>
                                            );
                                        case "obj":
                                        case "fbx":
                                        case "dae":
                                        case "glb":
                                            return <p>Va fi obiect 3D</p>;
                                        default:
                                            return (
                                                <object
                                                    width={300}
                                                    height={500}
                                                    data={`http://localhost:5000/assets/${props.productName}/${media}`}
                                                >
                                                    Oops! Se pare că nu am găsit
                                                    nimic aici.
                                                </object>
                                            );
                                    }
                                }
                              )
                            : null}
                    </div>
                </div>
                <button
                    className={style.imageSliderButton}
                    onClick={() => {
                        if (
                            xPositionProducts >
                            -320 * (mediaNames.length - 2)
                        ) {
                            setXPositionProducts(xPositionProducts - 320);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />{" "}
                </button>
            </div>
            <br />
            <div className={style.imageContainer}>
                <button
                    style={{ width: "20px", height: "30px" }}
                    className={style.imageSliderButton}
                    onClick={() => {
                        if (xPositionSlider < 0) {
                            setXPositionSlider(xPositionSlider + 330);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />{" "}
                </button>
                <div className={style.imgCarousel}>
                    <div
                        className={style.carouselSlider}
                        style={{
                            transform:
                                "translate(" + xPositionSlider + "px, 0px)"
                        }}
                    >
                        {mediaNames !== null && mediaNames !== undefined
                            ? mediaNames.map(
                                  (
                                      img,
                                      index
                                  ) => /* prettier-ignore */ {
                                    return img === "thumbnail.png" ? null : (
                                        <img
                                            width={80}
                                            height={100}
                                            key={index + 1000}
                                            src={`http://localhost:5000/assets/${props.productName}/${img}`}
                                            alt={`Buton pentru imaginea ${index}`}
                                        />
                                    );
                                }
                              )
                            : null}
                    </div>
                </div>
                <button
                    style={{ width: "20px", height: "30px" }}
                    className={style.imageSliderButton}
                    onClick={() => {
                        if (xPositionSlider > -330 * (mediaNames.length - 2)) {
                            setXPositionSlider(xPositionSlider - 330);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} size={"sm"} />{" "}
                </button>
            </div>
        </div>
    );
}

export default ProductImages;
