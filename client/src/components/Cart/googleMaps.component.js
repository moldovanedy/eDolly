import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: window.innerWidth > 500 ? "500px" : "300px",
    height: window.innerWidth > 500 ? "500px" : "300px"
};

const center = {
    lat: 45.745,
    lng: 25.523
};

function TheMap() {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBGd0MT_PXFDWbwhWdjoMAbN7YpanDWX8s">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
            >
                <>
                    <Marker position={center}></Marker>
                </>
            </GoogleMap>
        </LoadScript>
    );
}

export default React.memo(TheMap);
