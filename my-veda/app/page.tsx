"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image"; // Import Next.js Image component

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({});
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const timerRef = useRef(null);

  const calculateTimeLeft = () => {
    const launchDate = new Date("2024-11-07T19:00:00");
    const difference = +launchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.fromTo(logoRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" });
    gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 });
    
    gsap.to(logoRef.current, { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
  }, []);

  useEffect(() => {
    if (Object.keys(timeLeft).length > 0) {
      gsap.fromTo(
        timerRef.current.children[3], 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", repeat: -1, yoyo: true }
      );
    }
  }, [timeLeft]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className={`text-6xl font-extrabold ${interval === "seconds" ? "text-blue-600 animate-pulse" : "text-sky-200"}`}>
          {timeLeft[interval]}
        </span>
        <span className="text-xl text-gray-200 capitalize">{interval}</span>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4">
      <Image
        ref={logoRef}
        src="https://res.cloudinary.com/lokesb/image/upload/v1727026301/Logo_-_Prathibha_Connect_c9ekbf.jpg"
        alt="Logo"
        width={160}
        height={160}
        className="w-40 h-40 mb-8 drop-shadow-lg"
      />
      <h1 ref={headingRef} className="text-5xl md:text-6xl font-black mb-4 text-sky-700 tracking-wider text-center">
        NEX CONNECT
      </h1>
      <h2 className="text-2xl md:text-3xl mb-2 font-semibold text-gray-300 text-center">Our Product Launches On</h2>
      <h2 className="text-2xl md:text-3xl mb-8 font-semibold text-gray-300 text-center">7th November, 7:00 PM</h2>

      <div ref={timerRef} className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-8 mb-8">
        {timerComponents.length ? timerComponents : <span className="text-red-500">Time&apos;s up!</span>}
      </div>

      <footer className="absolute bottom-4 text-gray-400 text-sm text-center">
        © 2024 PRATHIBHA INNOVATIONS. All Rights Reserved.
      </footer>
    </div>
  );
}
