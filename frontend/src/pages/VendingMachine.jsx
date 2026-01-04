import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Recycle,
  ArrowDown,
  CheckCircle2,
  Loader2,
  ScanLine,
} from "lucide-react";

import { db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const VendingMachine = () => {
  const [processing, setProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const handleInsertBottle = async () => {
    setProcessing(true);
    setGeneratedCode(null);

    setTimeout(async () => {
      const code = generateRandomCode();

      try {
        await setDoc(doc(db, "couponCodes", code), {
          code,
          value: 15,
          status: "active",
          createdAt: serverTimestamp(),
        });

        setGeneratedCode(code);
      } catch (err) {
        alert("Machine Error. Try again.");
      } finally {
        setProcessing(false);
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-6">
      <Card className="w-full max-w-md rounded-3xl border border-eco-orange/30 shadow-[0_0_60px_rgba(255,140,0,0.15)] bg-zinc-950 relative overflow-hidden">

        {/* MACHINE HEADER */}
        <div className="bg-gradient-to-r from-eco-orange to-orange-600 p-4 text-center">
          <h1 className="text-white text-xl font-bold tracking-wide">
            ECO REVERSE VENDING MACHINE
          </h1>
          <p className="text-white/80 text-xs">
            Insert Plastic Bottle • Earn Rewards
          </p>
        </div>

        {/* GLASS PANEL */}
        <CardContent className="p-6 space-y-6">

          {/* STATUS SCREEN */}
          <div className="bg-black/70 rounded-xl border border-eco-orange/30 p-4 text-center shadow-inner">
            {processing ? (
              <div className="space-y-3 animate-pulse">
                <ScanLine className="w-8 h-8 text-eco-orange mx-auto animate-bounce" />
                <p className="text-eco-orange text-sm">
                  Scanning Bottle...
                </p>
              </div>
            ) : generatedCode ? (
              <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                <p className="text-green-400 text-xs">Reward Generated</p>
                <p className="text-3xl font-mono font-bold tracking-widest text-green-300 select-all">
                  {generatedCode}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Machine Ready
              </p>
            )}
          </div>

          {/* BOTTLE SLOT */}
          {!generatedCode && (
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-24 h-40 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-dashed border-eco-orange/40 flex items-center justify-center">
                <ArrowDown className="text-eco-orange animate-bounce" />
              </div>

              <Button
                size="lg"
                disabled={processing}
                onClick={handleInsertBottle}
                className="w-full bg-eco-orange hover:bg-eco-orange/90 text-white rounded-xl shadow-lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Insert Plastic Bottle
                    <Recycle className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* RESET */}
          {generatedCode && (
            <Button
              variant="outline"
              className="w-full border-eco-orange/40 text-eco-orange hover:bg-eco-orange/10"
              onClick={() => setGeneratedCode(null)}
            >
              Insert Another Bottle
            </Button>
          )}
        </CardContent>

        {/* GLOW EFFECT */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-eco-orange/20" />
      </Card>
    </div>
  );
};

export default VendingMachine;
