import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./productImages.module.css";
import { show } from "./explorerOverlayManager.redux";

function MediaExplorerOverlay(props) {
    const dispatch = useDispatch();

    var mediaNames = props.componentData;

    useEffect(() => {
        document.getElementById("explorer").style.opacity = 1;
    });

    function changeMainMedia(index) {
        var mediaElement = document.getElementById("theMediaElement");

        //for fading effect
        mediaElement.style.transition = "none";
        mediaElement.style.opacity = 0;
        mediaElement.attributes.getNamedItem(
            "src"
        ).value = `http://localhost:5000/assets/${props.productName}/${mediaNames[index]}`;
        setTimeout(() => {
            mediaElement.style.transition = "all 0.5s ease-in-out";
            mediaElement.style.opacity = 1;
        }, 100);

        //for changing border to active element
        for (var i = 0; i < mediaNames.length; i++) {
            document.getElementById(`buttonElement${i}`).style.border = "none";
        }

        var buttonElement = document.getElementById(`buttonElement${index}`);

        buttonElement.style.border = "6px solid #727272";
        buttonElement.style.margin = "10px";
        buttonElement.style.borderRadius = "5px";
    }

    return (
        <div id="explorer" className={style.explorer}>
            <button
                className={style.closeButton}
                onClick={() => {
                    document.getElementById("explorer").style.opacity = 0;
                    setTimeout(() => {
                        dispatch(show());
                    }, 500);
                }}
            >
                &times;
            </button>
            <div className={style.actualWindow}>
                <div
                    style={{
                        borderRight: "1px solid black",
                        overflowY: "auto"
                    }}
                >
                    {mediaNames !== null && mediaNames !== undefined
                        ? mediaNames.map(
                              (
                                  img,
                                  index
                              ) => /* prettier-ignore */ {
                                    var dotPosition = img.search(/[.]/g);
                                    var ext = img.substring(dotPosition + 1);
                                    switch (ext) {
                                        case "jpg":
                                        case "jpeg":
                                        case "png":
                                        case "gif":
                                        case "bmp":
                                        case "tif":
                                        case "tiff":
                                            return <img
                                            width={80}
                                            height={100}
                                            id={`buttonElement${index}`}
                                            style={props.imageNumber === index ?
                                            {border: "6px solid #727272", margin: "10px", borderRadius: "5px"}
                                            : {margin: "10px", borderRadius: "5px"}}
                                            key={index + 1000}
                                            onClick={() => {changeMainMedia(index)}}
                                            src={`http://localhost:5000/assets/${props.productName}/${img}`}
                                            alt={`Buton pentru imaginea ${index}`}
                                        />
                                        case "mp4":
                                        case "avi":
                                        case "webm":
                                        case "mkv":
                                        case "mov":
                                            return <p>VIDEO</p>
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
                                                    data={`http://localhost:5000/assets/${props.productName}/${img}`}
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "auto"
                    }}
                >
                    <img
                        id="theMediaElement"
                        className={style.mainImage}
                        style={{ maxHeight: window.innerHeight / 1.5 }}
                        src={`http://localhost:5000/assets/${
                            props.productName
                        }/${mediaNames[props.imageNumber]}`}
                        alt={`Imagine`}
                    />
                </div>
            </div>
        </div>
    );
}

export default MediaExplorerOverlay;
