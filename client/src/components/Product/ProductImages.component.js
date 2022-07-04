/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowCircleRight,
    faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import style from "./productImages.module.css";
import { show } from "./explorerOverlayManager.redux";
import MediaExplorerOverlay from "./MediaExplorerOverlay.component";
import obj3dPlaceholder from "./../../assets/images/3dObject.png";

function ProductImages(props) {
    const [mediaNames, setMediaNames] = useState();
    var [xPositionProducts, setXPositionProducts] = useState(0);

    var [translateAmount, setTranslateAmount] = useState(
        window.innerWidth >= 425 ? 320 : 190
    );

    var [imageNumber, setImageNumber] = useState(0);

    const dispatch = useDispatch();
    var isExplorerOpen = useSelector((state) => state.explorer);

    isExplorerOpen.value
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto");

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

    window.addEventListener("resize", reportWindowSize);

    function reportWindowSize() {
        var width = window.innerWidth;
        if (width >= 425) {
            if (translateAmount !== 320) {
                setTranslateAmount(320);
            }
        } else {
            if (translateAmount !== 190) {
                setTranslateAmount(190);
            }
        }
    }

    return (
        <div className={style.mainMediaContainer}>
            <div className={style.imageContainer}>
                <button
                    className={style.imageSliderButton}
                    onClick={() => {
                        if (xPositionProducts < 0) {
                            setXPositionProducts(
                                xPositionProducts + translateAmount
                            );
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
                                                    className={style.images}
                                                    key={index}
                                                    onClick={() => {dispatch(show()); setImageNumber(index)}}
                                                    style={{cursor: "pointer"}}
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
                                                    videoclipuri sau a apărut o eroare neașteptată.
                                                    <br /> `Video ${index}`
                                                </video>
                                            );
                                        case "obj":
                                        case "fbx":
                                        case "dae":
                                        case "glb":
                                            return (<img
                                                    className={style.images}
                                                    key={index}
                                                    onClick={() => {dispatch(show()); setImageNumber(index)}}
                                                    style={{cursor: "pointer"}}
                                                    src={obj3dPlaceholder}
                                                    alt={`Obiect 3D`}
                                                />)
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
                            -(window.innerWidth >= 425 ? 320 : 190) *
                                (mediaNames.length - 2)
                        ) {
                            setXPositionProducts(
                                xPositionProducts - translateAmount
                            );
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />{" "}
                </button>
            </div>

            {isExplorerOpen.value ? (
                <MediaExplorerOverlay
                    componentData={mediaNames}
                    productName={props.productName}
                    imageNumber={imageNumber}
                />
            ) : null}
        </div>
    );
}

export default ProductImages;
