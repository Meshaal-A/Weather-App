"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";

interface Coordinates {
  lat: number;
  lon: number;
}

interface FlyToActiveCityProps {
  activeCityCoords: Coordinates | null;
}

const FlyToActiveCity: React.FC<FlyToActiveCityProps> = ({ activeCityCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      if (map) {
        map.flyTo(
          [activeCityCoords.lat, activeCityCoords.lon],
          zoomLev,
          flyToOptions
        );
      }
    }
  }, [activeCityCoords, map]);

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
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FlyToActiveCity activeCityCoords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;
