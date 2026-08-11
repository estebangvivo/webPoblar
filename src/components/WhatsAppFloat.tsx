"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { WhatsAppChooser } from "@/components/WhatsAppChooser";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Contactar por WhatsApp"
        className="whatsapp-float fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white sm:right-6 sm:bottom-6"
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={1.5} />
      </button>

      <WhatsAppChooser open={open} onClose={() => setOpen(false)} />
    </>
  );
}
