"use client";

import { useCurrentTime } from "@/lib/time";
import { useEffect, useState } from "react";
import { WeatherApiResponse } from "../../(api)/api/weather/route";

type Props = {
  country: string;
  city: string;
  region: string;
};

const GeolocationPage: React.FC<Props> = (props) => {
  const { country, city, region } = props;

  const [geolocation, setGeolocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation(position.coords);
        },
        (err) => {
          setGeolocationError(err.message);
          console.error(err.message);
        },
      );
    } else {
      setGeolocationError;
      ("Geolocation is not supported by your browser.");
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  const time = useCurrentTime();

  useEffect(() => {
    fetch(`/api/weather?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(time.format("HH:mm:ss"), data);

        setWeather(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [time, city]);

  return (
    <div className="grid grid-cols-12 h-svh relative">
      <div className="relative col-start-1 col-end-10 p-6 pointer-events-none flex items-center justify-center">
        <div className="grid grid-cols-[auto_1fr] grid-rows-1 bg-moss-green text-white p-[13px] gap-5">
          <div className="text-2xl">THE HERD</div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between ">
              <div>{city}</div>
              <div>{time.format("h:mm A")}</div>
            </div>
            <div className="flex gap-[8px]">
              <div className="flex gap-[6px] p-[6px] border border-white/50">
                <div>{weather?.current.condition.text}</div>
                <div>{weather?.current.temp_c}°C</div>
              </div>
              <div className="flex gap-[6px] p-[6px] border border-white/50">
                <div>Cows</div>
                <div>500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-l border-black bg-white col-start-10 col-end-13 p-6 flex flex-col overflow-y-auto gap-3">
        <div>
          Middleware:
          <div>Country: {country}</div>
          <div>City: {city}</div>
          <div>Region: {region}</div>
        </div>
        <div>
          Geolocation WebAPI:
          {geolocation && (
            <>
              <div>Latitude: {geolocation.latitude}</div>
              <div>Longitude: {geolocation.longitude}</div>
            </>
          )}
          {geolocationError && (
            <div className="text-red-500">Error: {geolocationError}</div>
          )}
        </div>
        <div>
          Weather API result:
          <div>
            {weather && (
              <div>
                <div>
                  Location: {weather.location.name}, {weather.location.region},{" "}
                  {weather.location.country}
                </div>
                <div>Temperature: {weather.current.temp_c}°C</div>
                <div>Condition: {weather.current.condition.text}</div>
                <div>Humidity: {weather.current.humidity}%</div>
                <div>Wind: {weather.current.wind_kph} kph</div>
                <div>Cloud: {weather.current.cloud}</div>
                <div>UV: {weather.current.uv}</div>
                <div>Gust: {weather.current.gust_kph} kph</div>
                <div>Precipitation: {weather.current.precip_mm} mm</div>
                <div>Last updated: {weather.current.last_updated}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPage;
