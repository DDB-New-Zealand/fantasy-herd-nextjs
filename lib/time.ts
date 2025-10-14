import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function useCurrentTime(): dayjs.Dayjs {
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 30000); // every 30 seconds

    // Set immediately on mount
    setCurrentTime(dayjs());

    return () => clearInterval(interval);
  }, []);

  return currentTime;
}
