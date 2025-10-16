import { cn } from "@/lib/utils";
import Quagga from "@ericblade/quagga2";
import { useEffect, useRef, useState } from "react";
import {
  MEADOW_FRESH_EAN_BARCODES,
  MEADOW_FRESH_EAN_8_BARCODES,
} from "../constants/barcodes";

type Props = {
  className: string;
  onDetect: (isMeadowFresh: boolean) => void;
};

const BarcodeReader: React.FC<Props> = (props) => {
  const { className, onDetect } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState<"ready" | "detected" | "other">("ready");

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
          readers: ["ean_reader", "ean_8_reader"],
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

      if (
        result.codeResult.format === "ean_8" &&
        MEADOW_FRESH_EAN_8_BARCODES.some(
          (code) => code === result.codeResult.code,
        )
      ) {
        setResult("detected");
      } else if (
        MEADOW_FRESH_EAN_BARCODES.some(
          (code) => code === result.codeResult.code,
        )
      ) {
        setResult("detected");
      } else {
        errorAccumulator++;

        if (errorAccumulator > 40) {
          setResult("other");
        }
      }
    });

    return () => {
      Quagga.stop();
      console.log("stop");
    };
  }, []);

  useEffect(() => {
    if (result !== "ready") {
      onDetect(result === "detected");
    }
  }, [result, onDetect]);

  return (
    <div className={className}>
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
    </div>
  );
};

export default BarcodeReader;
