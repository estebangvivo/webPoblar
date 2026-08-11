import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
}

export function Logo({
  className,
  size = 44,
  showWordmark = false,
  wordmarkClassName,
  priority = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-poblar.png"
        alt="Poblar Negocios Inmobiliarios"
        width={size}
        height={size}
        className="shrink-0 rounded-full"
        priority={priority}
      />
      {showWordmark ? (
        <span className={cn("leading-tight", wordmarkClassName)}>
          <span className="block text-sm font-bold tracking-[0.18em] text-white">
            POBLAR
          </span>
          <span className="block text-[10px] font-medium tracking-wide text-brand">
            Negocios Inmobiliarios
          </span>
        </span>
      ) : null}
    </span>
  );
}
