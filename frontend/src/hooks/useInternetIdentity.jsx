import React, { useEffect, useState } from "react";

// ...existing code...
export function useInternetIdentity() {
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return online;
}

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function InternetIdentityProvider({ children }) {
  // run the hook at a top level; extend to provide context if needed
  useInternetIdentity();
  return <>{children}</>;
}
// ...existing code...
