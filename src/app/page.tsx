"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PowerGlitch } from "powerglitch";

interface ImageData {
  base64image: string;
  seed: string;
}

export default function Home(): JSX.Element {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [image1, setImage1] = useState<string | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const glitchScript = (): void => {
    const getRandomValue = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    PowerGlitch.glitch(".glitch", {
      playMode: "always",
      hideOverflow: true,
      timing: {
        duration: 1000,
        iterations: 1,
        easing: "ease-in-out",
      },
      glitchTimeSpan: {
        start: 0.4,
        end: 0.7,
      },
      shake: {
        velocity: getRandomValue(0, 1),
        amplitudeX: 0.4,
        amplitudeY: 0.4,
      },
      slice: {
        count: getRandomValue(0, 60),
        velocity: 10,
        minHeight: 0.02,
        maxHeight: 0.4,
        hueRotate: true,
      },
    });
  };

  const pullImage = (): void => {
    setImage1("/images/1.png"); // Update the path to "/images/1.png" if it is located in the "/public/images" directory
  };

  const calculateMaxWindowSize = (): number => {
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    return Math.min(windowWidth, windowHeight);
  };

  const makeApiCall = async (): Promise<void> => {
    setIsWaiting(true);
    const response = await fetch("/api/generate", {
      method: "GET",
    });
    const data: ImageData = await response.json();

    const img = `data:image/jpeg;base64,` + data.base64image;
    setImageData(data);
    setImage1(img);
    setSeed(data.seed);
    setIsWaiting(false);
  };

  useEffect(() => {
    // glitchScript();

    makeApiCall();
    // Trigger makeApiCall every 15 seconds
    const intervalId = setInterval(makeApiCall, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* <button onClick={makeApiCall}>Generate AI Image</button> */}
      {/* <button onClick={pullImage}>Generate and Transition</button> */}
      <div className='image'>
        {!isWaiting && image1 ? (
          <div>
            <img
              className='glitch'
              src={image1}
              width={calculateMaxWindowSize()}
              height={calculateMaxWindowSize()}
              alt='AI generated image'
            />
            <div>seed: {seed}</div>
            {/* <button onClick={glitchScript}>Glitch</button> */}
          </div>
        ) : isWaiting ? (
          <div className='image__placeholder'>Loading...</div>
        ) : null}
      </div>
    </div>
  );
}
