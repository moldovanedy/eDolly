import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import style from "./productImages.module.css";
import { show } from "./explorerOverlayManager.redux";
import videoPlaceholder from "./../../assets/images/Video.png";
import obj3dPlaceholder from "./../../assets/images/3dObject.png";

function MediaExplorerOverlay(props) {
    const dispatch = useDispatch();
    var [selectedMedia, setSelectedMedia] = useState("image"); //can be image, video, or 3d

    var mediaNames = props.componentData;

    useEffect(() => {
        document.getElementById("explorer").style.opacity = 1;
    });

    var { id } = useParams();

    async function changeMainMedia(index, mediaType) {
        var mediaElement = document.getElementById("theImageElement"); //default
        await setSelectedMedia(mediaType);
        switch (selectedMedia) {
            default:
            case "image":
                mediaElement = document.getElementById("theImageElement");
                break;
            case "video":
                mediaElement = document.getElementById("theVideoElement");
                break;
            case "3d":
                mediaElement = document.getElementById("the3dElement");
                break;
        }

        if (mediaElement === null || mediaElement === undefined) {
            return;
        }

        //for fading effect
        mediaElement.style.transition = "none";
        mediaElement.style.opacity = 0;
        mediaElement.attributes.getNamedItem(
            "src"
        ).value = `http://localhost:5000/assets/${props.productName}/${mediaNames[index]}`;

        console.log(
            `http://localhost:5000/assets/${props.productName}/${mediaNames[index]}`
        );
        console.log(selectedMedia);
        console.log(mediaElement);

        setTimeout(() => {
            mediaElement.style.transition = "all 0.5s ease-in-out";
            mediaElement.style.opacity = 1;
        }, 100);

        //for changing border to active element
        for (var i = 0; i < mediaNames.length; i++) {
            var el = document.getElementById(`buttonElement${i}`);
            if (el !== null) {
                el.style.border = "none";
            }
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
                                            return media === "thumbnail.png" ? null : 
                                            (<img
                                                width={80}
                                                id={`buttonElement${index}`}
                                                style={props.imageNumber === index ?
                                                {border: "6px solid #727272", margin: "10px", borderRadius: "5px"}
                                                : {margin: "10px", borderRadius: "5px", height: "fit-content"}}
                                                key={index + 1000}
                                                onClick={() => {changeMainMedia(index, "image")}}
                                                src={`http://localhost:5000/assets/${props.productName}/${media}`}
                                                alt={`Buton pentru imaginea ${index}`}
                                            />)
                                        case "mp4":
                                        case "avi":
                                        case "webm":
                                        case "mkv":
                                        case "mov":
                                            return (<img width={80} id={`buttonElement${index}`}
                                                style={props.imageNumber === index ?
                                                {border: "6px solid #727272", margin: "10px", borderRadius: "5px"}
                                                : {margin: "10px", borderRadius: "5px", height: "fit-content"}}
                                                key={index + 1000}
                                                onClick={() => {changeMainMedia(index, "video")}}
                                                src={videoPlaceholder}
                                                alt={`Buton pentru video ${index}`}/>)
                                        case "obj":
                                        case "fbx":
                                        case "dae":
                                        case "glb":
                                            return (<img width={80} id={`buttonElement${index}`}
                                                style={props.imageNumber === index ?
                                                {border: "6px solid #727272", margin: "10px", borderRadius: "5px"}
                                                : {margin: "10px", borderRadius: "5px", height: "auto"}}
                                                key={index + 1000}
                                                onClick={() => {document.location.pathname = `/vizualizator-3d/${id}`}}
                                                src={obj3dPlaceholder}
                                                alt={`Buton pentru obiectul 3D`}/>)
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "auto"
                    }}
                >
                    {selectedMedia === "image" ? (
                        <img
                            id="theImageElement"
                            className={style.mainImage}
                            style={{ maxHeight: window.innerHeight / 1.5 }}
                            src={`http://localhost:5000/assets/${
                                props.productName
                            }/${mediaNames[props.imageNumber]}`}
                            alt={`Imagine`}
                            onClick={() => {
                                window.open(
                                    `http://localhost:5000/assets/${
                                        props.productName
                                    }/${mediaNames[props.imageNumber]}`,
                                    "_blank"
                                );
                            }}
                        />
                    ) : (
                        <video
                            controls
                            id="theVideoElement"
                            className={style.mainImage}
                            style={{ maxHeight: window.innerHeight / 1.5 }}
                            src={`http://localhost:5000/assets/${
                                props.productName
                            }/${mediaNames[props.imageNumber]}`}
                        ></video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MediaExplorerOverlay;
