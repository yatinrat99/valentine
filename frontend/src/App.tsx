import React, { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";

interface IpInfo {
  ip?: string;
  country_name?: string;
  city?: string;
}

interface DeviceInfo {
  userAgent?: string;
  platform?: string;
  language?: string;
  isMobile?: boolean;
}

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({});
  const [ipInfo, setIpInfo] = useState<IpInfo>({});

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);

  // ✅ Device & Browser info
  useEffect(() => {
    setDeviceInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      isMobile: /Mobi|Android/i.test(navigator.userAgent),
    });
  }, []);

  // ✅ IP + Location info
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setIpInfo(data);
      });
  }, []);

  // Center YES button initially
  useEffect(() => {
    if (!buttonAreaRef.current || !noButtonRef.current) return;

    const container = buttonAreaRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    setNoButtonPosition({
      x: (container.width - button.width) / 2,
      y: (container.height - button.height) / 2,
    });
  }, []);

  const handleNoHover = () => {
    if (!buttonAreaRef.current || !noButtonRef.current) return;

    const container = buttonAreaRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    const maxX = container.width - button.width;
    const maxY = container.height - button.height;

    const MOVE_RANGE = window.innerWidth < 768 ? 240 : 320;

    setNoButtonPosition((prev) => {
      let newX = prev.x + (Math.random() * MOVE_RANGE * 2 - MOVE_RANGE);
      let newY = prev.y + (Math.random() * MOVE_RANGE * 2 - MOVE_RANGE);

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      return { x: newX, y: newY };
    });
  };

  // ✅ YES click = show success + log info
  const handleYesClick = () => {
    console.log("DEVICE INFO 👉", deviceInfo);
    console.log("IP INFO 👉", ipInfo);

    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-pink-100 via-white to-pink-50 p-4">
        <div className="text-center animate-fade-in">
          <img
            src="https://plus.unsplash.com/premium_photo-1664299631876-f143dc691c4d"
            alt="Valentine"
            className="w-64 h-64 mx-auto rounded-3xl shadow-2xl mb-6 animate-bounce"
          />

          <h1 className="text-5xl font-bold text-pink-600 flex items-center justify-center gap-3">
            Good Girl
            <Heart className="w-12 h-12 fill-pink-500 animate-pulse" />
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-12">
        <Heart className="w-20 h-20 text-pink-500 fill-pink-400 animate-pulse mx-auto mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600">
          Will you be my Valentine?
        </h1>
      </div>

      <div ref={buttonAreaRef} className="relative w-full max-w-2xl h-80">
        <button
          onClick={handleYesClick}
          className="absolute left-1/2 top-1/2 translate-x-1/2 -translate-y-1/2
          bg-pink-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg"
        >
          NO
        </button>

        <button
          ref={noButtonRef}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          }}
          className="absolute top-0 left-0 bg-white text-pink-600 font-bold
          text-xl px-12 py-4 rounded-full border-2 border-pink-300 shadow-lg"
        >
          YES
        </button>
      </div>
    </div>
  );
}
