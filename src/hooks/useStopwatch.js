import { useEffect, useState } from "react";

export const useStopwatch = () => {
  const [time, setTime] = useState(300); //set time to 5 minutes as 5 * 60 = 300 seconds

  useEffect(() => {
    let timeout;
    if (time > 0) {
      timeout = setTimeout(() => {
        setTime((state) => state - 1);
      }, 1000);
    } else {
      clearTimeout(timeout);
    }
  }, [time]);

  // calculate time left in minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return [minutes, seconds];
};
