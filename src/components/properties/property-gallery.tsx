"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyImage } from "@/types/property";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: readonly PropertyImage[];
}

const controlClass =
  "absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm bg-surface/95 text-lg text-ink shadow-card transition hover:bg-surface";

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  if (!current) return null;
  const count = images.length;
  const step = (direction: 1 | -1) => setIndex((value) => (value + direction + count) % count);

  return (
    <section aria-label="Property gallery">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sunken sm:aspect-[16/10] lg:aspect-[2/1] lg:max-h-[30rem]">
        <Image key={current.src + index} src={current.src} alt={current.alt} fill priority={index === 0} sizes="(min-width: 1280px) 1216px, 100vw" className="fade-in object-cover" />
        {count > 1 ? (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={cn(controlClass, "left-3")}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className={cn(controlClass, "right-3")}>
              <span aria-hidden="true">→</span>
            </button>
            <p aria-live="polite" className="absolute bottom-3 left-3 rounded-sm bg-ink/80 px-2.5 py-1 text-xs font-semibold text-white">
              Image {index + 1} of {count}
            </p>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3 lg:flex">
          {images.map((image, imageIndex) => (
            <li key={image.src + imageIndex} className="lg:w-28">
              <button
                type="button"
                onClick={() => setIndex(imageIndex)}
                aria-label={`Show image ${imageIndex + 1} of ${count}: ${image.alt}`}
                aria-current={imageIndex === index ? "true" : undefined}
                className={cn("relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-sunken ring-offset-2", imageIndex === index ? "ring-2 ring-brand" : "opacity-75 hover:opacity-100")}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 15vw, 25vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
