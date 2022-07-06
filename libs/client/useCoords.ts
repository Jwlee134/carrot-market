import { useEffect, useState } from "react";

interface State {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<State>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ latitude, longitude });
      }
    );
  }, []);

  return coords;
}
