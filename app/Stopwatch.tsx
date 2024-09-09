"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Stopwatch = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Controls visibility of the div
  
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileDevice = /Mobi|Android/i.test(userAgent); // Mobile device detection
    setIsDesktop(!isMobileDevice); // If it's not mobile, it's desktop
  }, []);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = () => {
      setTimeout(() => {
        setIsVisible(true);
      }, 250);

      // Clear any existing timeout and reset the inactivity timer
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      // Hide the div after 3 seconds of inactivity
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Adjust time here for inactivity duration
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener and timeout on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, []);

  // This will handle the stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increases the time by 10ms
      }, 10); // 10 ms interval for more precision
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isRunning, time]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="text-center">
      <div className={`flex gap-4 justify-center items-center flex-row text-4xl ${isVisible && isDesktop?'text-5xl':'text-7xl translate-y-10 '} transition-all duration-250 ease-in-out mb-6`}>
        <div className="hour  md:w-24">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
        </div>
        <span className="text-gray-500">:</span>
        <div className="min  md:w-24">
          {" "}
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </div>
        <span className="text-gray-500">:</span>
        <div className="sec  md:w-24"> {("0" + ((time / 10) % 100)).slice(-2)}</div>
      </div>
      <div
        className={` ${isVisible && isDesktop ? "" : "scale-0 "} transition-all duration-250 ease-in-out flex gap-4 justify-center items-center flex-row`}
      >
        {isRunning ? (
          <button
            onClick={stopStopwatch}
            className="gap-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src="/icons/stop.svg"
              alt="Vercel logomark"
              width={24}
              height={24}
            />
            Stop
          </button>
        ) : (
          <button
            onClick={startStopwatch}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src="/icons/play.svg"
              alt="Vercel logomark"
              width={24}
              height={24}
            />
            Start
          </button>
        )}

        {!isRunning && time > 0 && (
          <button
            onClick={resetStopwatch}
            className="gap-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src="/icons/restart.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
