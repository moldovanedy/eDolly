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
    const [imageNames, setImageNames] = useState();
    useEffect(() => {
        axios
            .get(
                "http://localhost:5000/products/getPhotoNames/name=" +
                    props.productName
            )
            .then((response) => {
                setImageNames(response.data);
            });
    }, []);

    return (
        <div className={style.mainMediaContainer}>
            <div className={style.imageContainer}>
                <button className={style.imageSliderButton}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} />{" "}
                </button>
                <div className={style.imgCarousel}>
                    <div className={style.carouselSlider}>
                        {imageNames !== null && imageNames !== undefined
                            ? imageNames.map((img, index) => {
                                  return img === "thumbnail.png" ? null : (
                                      <img
                                          width={300}
                                          height={500}
                                          key={index}
                                          src={`http://localhost:5000/assets/${props.productName}/${img}`}
                                          alt={`Imaginea ${index}`}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
                <button className={style.imageSliderButton}>
                    <FontAwesomeIcon icon={faArrowCircleRight} />{" "}
                </button>
            </div>
            <br />
            <div className={style.imgCarousel}>
                <div className={style.carouselSlider}>
                    {imageNames !== null && imageNames !== undefined
                        ? imageNames.map((img, index) => {
                              return img === "thumbnail.png" ? null : (
                                  <img
                                      width={80}
                                      height={100}
                                      key={index + 1000}
                                      src={`http://localhost:5000/assets/${props.productName}/${img}`}
                                      alt={`Buton pentru imaginea ${
                                          index - 1000
                                      }`}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
}

export default ProductImages;
