"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  title: string;
  images: string[];
  tag?: ReactNode;
}

export function PropertyGallery({ title, images, tag }: PropertyGalleryProps) {
  const gallery = images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const hasMultiple = gallery.length > 1;

  function goTo(index: number) {
    if (!gallery.length) return;
    const next = ((index % gallery.length) + gallery.length) % gallery.length;
    setActiveIndex(next);
  }

  if (!activeImage) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy shadow-lg">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} — foto ${activeIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {tag}

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition hover:bg-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition hover:bg-navy"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute right-3 bottom-3 rounded-md bg-navy/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {activeIndex + 1} / {gallery.length}
            </span>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-24",
                index === activeIndex
                  ? "ring-brand"
                  : "ring-transparent opacity-80 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
