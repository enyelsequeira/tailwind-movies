import { useState, useEffect } from "react";

const useIsSsr = () => {

  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSsr(false);
    }
  }, [isSsr]);

  return isSsr;
}

export default useIsSsr;