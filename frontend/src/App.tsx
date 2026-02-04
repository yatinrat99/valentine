import { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const buttonAreaRef = useRef<HTMLDivElement>(null);

  // Center NO button initially
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

    const MOVE_RANGE = window.innerWidth < 768 ? 240 : 320; // Increased move range

    setNoButtonPosition((prev) => {
      let newX = prev.x + (Math.random() * MOVE_RANGE * 2 - MOVE_RANGE);
      let newY = prev.y + (Math.random() * MOVE_RANGE * 2 - MOVE_RANGE);

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      return { x: newX, y: newY };
    });
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-white to-pink-50 p-4">
        <div className="text-center animate-fade-in">
          <div className="mb-8 animate-bounce">
            <img
              src="https://plus.unsplash.com/premium_photo-1664299631876-f143dc691c4d?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Valentine"
              className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-3xl shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-pink-600 flex items-center justify-center gap-3">
            Good Girl
            <Heart className="w-12 h-12 md:w-16 md:h-16 fill-pink-500 text-pink-500 animate-pulse" />
            <i data-lucide="heart"></i>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Heading */}
      {/* <Heart className="w-10 h-50 md:w-24 md:h-24 text-pink-500 fill-pink-400 animate-pulse" /> */}
      <div className="text-center mb-12">
        <div className="mb-6 flex justify-center">
          <Heart className="w-20 h-20 md:w-24 md:h-24 text-pink-500 fill-pink-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4 px-4">
          Will you be my Valentine?
        </h1>
        <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full" />
      </div>

      {/* <Heart className="w-10 h-50 md:w-24 md:h-24 text-pink-500 fill-pink-400 animate-pulse" /> */}
      <div
        ref={buttonAreaRef}
        className="relative w-full max-w-2xl h-100 md:h-80"
      >
        <button
          onClick={handleYesClick}
          className="absolute left-1/2 top-1/2 translate-x-1/2 -translate-y-1/2
                     bg-linear-to-r from-pink-500 to-pink-600
                     text-white font-bold text-lg md:text-2xl
                     px-8 md:px-16 py-3 md:py-6 rounded-full
                     shadow-lg hover:scale-110 transition-all duration-300 z-10"
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
                     text-xl md:text-2xl px-12 md:px-16 py-4 md:py-6
                     rounded-full border-2 border-pink-300
                     shadow-lg transition-transform duration-200 ease-out"
        >
          YES
        </button>
        <Heart className="w-10 h-50 md:w-10 md:h-9 text-pink-500 fill-pink-400 animate-pulse" />
        {/* <Heart className="w-10 h-20 reletive  text-pink-500 fill-pink-400 animate-pulse" /> */}
      </div>
    </div>
  );
}
