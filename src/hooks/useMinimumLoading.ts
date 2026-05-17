import { useEffect, useState } from "react";

export function useMinimumLoading(
  loading: boolean,
  minimumTime = 300
) {
  const [visibleLoading, setVisibleLoading] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (loading) {
      setVisibleLoading(true);
    } else {
      timeout = setTimeout(() => {
        setVisibleLoading(false);
      }, minimumTime);
    }

    return () => clearTimeout(timeout);
  }, [loading, minimumTime]);

  return visibleLoading;
}