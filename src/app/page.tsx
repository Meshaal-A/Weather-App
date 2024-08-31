"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import defaultStates from "./utils/DefaultStates";
import { useGlobalContextUpdate } from "./context/globalContext";

// Dynamically import components that might cause SSR issues
const AirPollution = dynamic(
  () => import("./Components/AirPollution/Airpollution"),
  { ssr: false }
);
const DailyForecast = dynamic(
  () => import("./Components/DailyForecast/DailyForecast"),
  { ssr: false }
);
const FeelsLike = dynamic(() => import("./Components/FeelsLike/FeelsLike"), {
  ssr: false,
});
const Humidity = dynamic(() => import("./Components/Humidity/Humidity"), {
  ssr: false,
});
const Mapbox = dynamic(() => import("./Components/Mapbox/Mapbox"), {
  ssr: false,
});
const Navbar = dynamic(() => import("./Components/Navbar"), { ssr: false });
const Population = dynamic(() => import("./Components/Population/Population"), {
  ssr: false,
});
const Pressure = dynamic(() => import("./Components/Pressure/Pressure"), {
  ssr: false,
});
const Sunset = dynamic(() => import("./Components/Sunset/Sunset"), {
  ssr: false,
});
const Temperature = dynamic(
  () => import("./Components/Temperature/Temperature"),
  { ssr: false }
);
const UvIndex = dynamic(() => import("./Components/UvIndex/UvIndex"), {
  ssr: false,
});
const Visibility = dynamic(() => import("./Components/Visibility/Visibility"), {
  ssr: false,
});
const Wind = dynamic(() => import("./Components/Wind/Wind"), { ssr: false });
const FiveDayForecast = dynamic(
  () => import("./Components/FiveDayForecast/FiveDayForecast"),
  { ssr: false }
);

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    // Ensure this code only runs on the client side
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DailyForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => (
                  <div
                    key={index}
                    className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                    onClick={() => getClickedCityCords(state.lat, state.lon)}
                  >
                    <p className="px-6 py-4">{state.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
