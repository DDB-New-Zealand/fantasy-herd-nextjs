"use client";

import { WeatherApiResponse } from "@/app/(api)/api/weather/route";
import { useCurrentTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  WeatherLabel,
  WeatherValue,
  WeatherWidgetTitle,
} from "./ui/typography";
import Icon, { IconType } from "./ui/icon";
import Placeholder from "./ui/placeholder";

// TODO: get list of expected result and return icon type
const getIconByWeatherCondition = (text: string): IconType => {
  switch (text) {
    default:
      return "sunny";
  }
};

export const WeatherWidget: React.FC<{
  className?: string;
  country: string;
  city: string;
  region: string;
}> = ({ country, city, region, className }) => {
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
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] gap-5 border p-[13px] bg-background text-foreground",
        className,
      )}
    >
      <WeatherWidgetTitle>THE HERD</WeatherWidgetTitle>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Icon type="flag" className="w-[10px] h-[10px]" />
            <WeatherLabel>{city}</WeatherLabel>
          </div>
          <WeatherValue>{time.format("h:mma")}</WeatherValue>
        </div>
        <div className="flex gap-2">
          {!weather ? (
            <Placeholder />
          ) : (
            <div className="border flex items-center justify-center p-1.5">
              <Icon
                type={getIconByWeatherCondition(
                  weather?.current.condition.text,
                )}
                className="w-3 h-3"
              />

              <WeatherLabel className="ml-[2.5px]">
                {weather?.current.condition.text}
              </WeatherLabel>
              <WeatherValue className="ml-1.5">
                {weather?.current.dewpoint_c}°C
              </WeatherValue>
            </div>
          )}

          <div className="border flex items-center justify-center p-1.5">
            <Icon type={"grass"} className="w-3 h-3" />

            <WeatherLabel className="ml-[2.5px]">Cows</WeatherLabel>
            <WeatherValue className="ml-1.5">500</WeatherValue>
          </div>
        </div>
      </div>
    </div>
  );
};
