"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Phone } from "lucide-react";
import { Container, Button, Section } from "@/components/ui";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client error
    console.error("[Application Error Boundary Caught]:", error);
  }, [error]);

  return (
    <Section className="py-24 md:py-36 bg-slate-950 text-slate-100 flex items-center justify-center min-h-[70vh]">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-800/60 flex items-center justify-center text-amber-400 mx-auto">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>

          <p className="text-xs uppercase tracking-widest font-semibold text-amber-400">
            System Notice
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Temporary Hydraulic Interruption
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-lg mx-auto">
            An unexpected error occurred while rendering this interface. Our technical systems have captured the diagnostic signature.
          </p>

          {error.digest && (
            <p className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg inline-block border border-slate-800">
              Diagnostic Digest: {error.digest}
            </p>
          )}

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => reset()}
              size="lg"
              className="gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Rendering</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-slate-700 text-slate-200 hover:text-white"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Return Home</span>
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-slate-700 text-slate-200 hover:text-white"
              >
                <Phone className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Contact Concierge</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
