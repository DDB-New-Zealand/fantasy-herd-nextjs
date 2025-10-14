"use client";

import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import BarcodeReader from "./components/barcode-reader";

const Page = () => {
  const [state, setState] = useState<"intro" | "scanning" | "result">("intro");
  const [scanHelpText, setScanHelpText] = useState(
    "Please hold the Meadow Fresh barcode in view",
  );

  return (
    <div className="grid grid-cols-4 h-svh relative p-6">
      <div className="relative col-span-full overflow-hidden rounded-[24px]">
        <AnimatePresence mode="popLayout">
          {state === "intro" && (
            <motion.div
              key={"intro"}
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/8 flex flex-col p-4 justify-between items-center"
            >
              <h3 className="text-center font-bold text-[48px]">
                Scan Your Products
              </h3>
              <Button
                onClick={() => {
                  setState("scanning");
                }}
              >
                Open Camera <CameraIcon />
              </Button>
            </motion.div>
          )}
          {state === "scanning" && (
            <motion.div
              key="scanning"
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <BarcodeReader
                className="absolute inset-0"
                onDetect={(isMeadowFresh) => {
                  console.log("Detected:", isMeadowFresh);

                  if (isMeadowFresh) {
                    setState("result");
                  } else {
                    setScanHelpText(
                      "Sorry, we only accept Meadow Fresh products",
                    );
                  }
                }}
              />
              <div className="absolute bottom-24 left-8 right-8 text-center text-white">
                {scanHelpText}
              </div>
            </motion.div>
          )}
          {state === "result" && (
            <motion.div
              key="result"
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/8 flex flex-col p-4 justify-between items-center"
            >
              <h3 className="text-center font-bold text-[48px]">Success!</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
