"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

interface Coordinates {
  lat: number;
  lon: number;
}

interface MapViewProps {
  center: Coordinates;
  zoom: number;
}

const MapView: React.FC<MapViewProps> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lon], zoom);
  }, [center, zoom, map]);

  return null;
};

function Mapbox() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast.coord) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const activeCityCords = forecast.coord;

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapView center={activeCityCords} zoom={13} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
