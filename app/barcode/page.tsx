"use client";

import { cn } from "@/lib/utils";
import Quagga from "@ericblade/quagga2";
import { useEffect, useRef, useState } from "react";

const CODES = ["9414090875157"];

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState("No result");

  useEffect(() => {
    if (!containerRef.current) return;

    let errorAccumulator = 0;

    Quagga.init(
      {
        inputStream: {
          target: containerRef.current,
          name: "Live",
          type: "LiveStream",
          constraints: {
            facingMode: "environment",
            width: 1920,
          },
        },
        decoder: {
          readers: ["ean_reader"],
        },
        locate: false,
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Init");
        Quagga.start();
        console.log("started");
      },
    );

    Quagga.onDetected((result) => {
      console.log(result);

      if (CODES.some((code) => code === result.codeResult.code)) {
        setResult("Detected");
      } else {
        errorAccumulator++;

        if (errorAccumulator > 40) {
          setResult("Sorry, we only accept Meadow Fresh products");
        }
      }
    });

    return () => {
      Quagga.stop();
      console.log("stop");
    };
  }, []);

  return (
    <div className="grid grid-cols-4 h-svh relative p-6">
      <div className="relative col-span-full overflow-hidden rounded-[24px]">
        <div
          className={cn(
            `absolute inset-0`,
            "[&_video]:absolute [&_video]:inset-0 [&_video]:w-full [&_video]:h-full [&_video]:object-cover",
          )}
          ref={containerRef}
        ></div>
        {/* Foreground */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[240px] h-[190px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white/32 rounded-[20px]"
            style={{
              //   width: "234px",
              //   height: "186px",
              //   left: "50%",
              //   top: "50%",
              //   transform: "translate(-50%, -50%)",
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.64)",
            }}
          >
            <svg
              width="235"
              height="186"
              viewBox="0 0 235 186"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.5 14H24.5C18.9772 14 14.5 18.4772 14.5 24V38"
                stroke="white"
              />
              <path
                d="M196.5 14H210.5C216.023 14 220.5 18.4772 220.5 24V38"
                stroke="white"
              />
              <path
                d="M38.5 172H24.5C18.9772 172 14.5 167.523 14.5 162V148"
                stroke="white"
              />
              <path
                d="M196.5 172H210.5C216.023 172 220.5 167.523 220.5 162V148"
                stroke="white"
              />
            </svg>
          </div>
        </div>
        {/* UI */}
        <div className="absolute inset-0">
          <div className="absolute left-0 right-0 bottom-4 text-center text-white">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
