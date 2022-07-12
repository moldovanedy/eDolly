/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Obj3dExplorer() {
    var { id } = useParams();
    var canvasRef = useRef(null);

    var [data, setData] = useState();
    var [isDone, setIsDone] = useState(false);
    var [mediaNames, setMediaNames] = useState("");
    var [objectName, setObjectName] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/products/id=" + id)
            .then((response) => {
                setData(response.data);
                setIsDone(true);

                axios
                    .get(
                        "http://localhost:5000/products/getPhotoNames/name=" +
                            response.data[0].Name
                    )
                    .then((res) => {
                        setMediaNames(res.data);
                        if (res.data !== null && res.data !== undefined) {
                            res.data.map(
                                (
                                    media,
                                    index
                                ) => /* prettier-ignore */ {
                                var dotPosition = media.search(/[.]/g);
                                var ext = media.substring(dotPosition + 1);
                                switch (ext) {
                                    case "glb":
                                        setObjectName(media)
                                        viewObject(canvasRef.current, response.data[0].Name, media);
                                        break
                                    default:

                                }
                            }
                            );
                        }
                    });
            });
    }, []);

    return isDone ? (
        <main style={{ width: "100vw", height: "100vh" }}>
            <Helmet>
                <title>Vizualizare 3d produs</title>
            </Helmet>
            <canvas
                style={{ width: "100vw", height: "98vh" }}
                ref={canvasRef}
            ></canvas>
        </main>
    ) : (
        <p>Se încarcă...</p>
    );
}

function viewObject(canvasReference, productName, objectName) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const pointLight = new THREE.PointLight(0xffffff, 5, 40);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    const light = new THREE.AmbientLight(0x404040, 100);
    scene.add(light);

    const loader = new GLTFLoader();

    loader.load(
        `http://localhost:5000/assets/${productName}/${objectName}`,
        function (gltf) {
            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasReference });
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        camera.rotation.x -= 0.01;
        camera.position.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}

export default Obj3dExplorer;
